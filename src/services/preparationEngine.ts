import {
  APP_NAME,
  CULTURA_CONTEXT,
  DEFAULT_PRIORITY,
  FABRICANTE_REFERENCIAS,
  PRIORITY_BY_TAG,
  TAG_PATTERNS
} from '../data/knowledgeBase';
import { AGRO_CHALLENGE_SIGNALS, type AgroChallengeSignal } from '../data/agroChallenges';
import { PRODUCT_INTELLIGENCE_DB, type ProductIntelligence } from '../data/productIntelligence';
import { PLAYER_VALUE_PLAYBOOKS, type PlayerValuePlaybook } from '../data/playerValuePlaybooks';
import {
  VALUE_SELLING_GLOBAL_RULES,
  CROP_BENCHMARKS,
  ROI_SCENARIO_MULTIPLIERS,
  YARA_INSTITUTIONAL_FOUNDATION,
  YARA_CROP_FOCUS,
  YARA_LINE_GAIN_PERCENT,
  YARA_LINE_ROLE_MAP,
  YARA_OBJECTIVE_TO_LINES,
  YARA_PROBLEM_TO_LINES,
  YARA_STAGE_TO_LINES
} from '../data/valueSellingKnowledge';
import {
  SALES_MISTAKE_BANK,
  classifyByBank,
  detectProblemType,
  FIELD_SCENARIO_BANK,
  FARMER_PROFILE_BANK,
  getAgronomicArgumentsByTheme,
  getEpaProvocationsByProblem,
  getObjectionStrategies,
  getSpinBankByProblem,
  getValueNarratives,
  inferSeasonMomentFromText,
} from '../data/knowledgeDecisionBank';
import {
  buildMemoryContextSummary,
  buildMemoryLearningGuidance,
  buildNextStepEngine,
  buildScenarioMemory
} from '../data/memoryDecisionBank';
import { buildStrategyDecisionContext } from '../data/strategyDecisionBank';
import { buildCortevaValueHooks, inferCortevaSolutionsByScenario } from '../data/cortevaSolutions';
import { inferAgroScenarioName, inferSpinScenarioTemplate } from '../data/spinScenarioLibrary';
import { getEpaScenarioTemplateById } from '../data/epaScenarioLibrary';
import { getAgroScenarioPlaybook } from '../data/agroScenarioPlaybooks';
import { getAgroScenarioOpcPlaybook } from '../data/agroScenarioOpcPlaybook';
import { getAgroScenarioEpaPlaybook } from '../data/agroScenarioEpaPlaybook';
import type { PreparationResult, ProductReference, ScenarioAnalysis, SpinBlock, ValueSineMap } from '../types';
import { normalizeText, pick, unique } from '../utils/text';

type Theme = ScenarioAnalysis['primaryTheme'];
type StrategicHooks = PlayerValuePlaybook['hooks'];

const THEME_PATTERNS: Array<{ theme: Exclude<Theme, 'geral'>; regex: RegExp }> = [
  { theme: 'adubo', regex: /adubo|adubacao|fertilizante|npk|ureia|map|kcl|fosfato|potassio|nitrogenio/ },
  {
    theme: 'defensivo',
    regex: /defensivo|fungicida|herbicida|inseticida|manejo de pragas|pragas|daninhas|doencas|cigarrinha|percevejo|lagarta|tripes|acaro|bicudo/
  },
  { theme: 'semente', regex: /semente|hibrido|cultivar|variedade|germinacao|vigor/ },
  { theme: 'biologico', regex: /biologico|bioinsumo|inoculante|trichoderma|bacillus/ },
  { theme: 'irrigacao', regex: /irrigacao|lamina|pivo|gotejo|turno de rega/ },
  { theme: 'maquinario', regex: /maquina|maquinario|pulverizador|plantadeira|colheitadeira|calibracao/ },
  { theme: 'servicos', regex: /servico|assistencia|consultoria|suporte tecnico|pos venda/ }
];

const SPECIFIC_TERM_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: 'NPK', regex: /\bnpk\b/ },
  { label: 'Ureia', regex: /\bureia\b/ },
  { label: 'MAP', regex: /\bmap\b/ },
  { label: 'KCl', regex: /\bkcl\b|cloreto de potassio/ },
  { label: 'Foliar', regex: /foliar/ },
  { label: 'Bioinsumo', regex: /bioinsumo|biologico|inoculante/ },
  { label: 'Fungicida', regex: /fungicida/ },
  { label: 'Herbicida', regex: /herbicida/ },
  { label: 'Inseticida', regex: /inseticida/ },
  { label: 'Cigarrinha', regex: /cigarrinha/ },
  { label: 'Percevejo', regex: /percevejo/ },
  { label: 'Lagarta', regex: /lagarta/ },
  { label: 'Híbrido', regex: /hibrido|cultivar|variedade/ },
  { label: 'Taxa variável', regex: /taxa variavel|vra/ },
  { label: 'Piloto automático', regex: /piloto automatico|autosteer/ },
  { label: 'Telemetria', regex: /telemetria/ },
  { label: 'ISOBUS', regex: /isobus/ },
  { label: 'Corte de seção', regex: /corte de secao|section control/ },
  { label: 'Mapa de aplicação', regex: /mapa de aplicacao|mapa de prescricao/ },
  { label: 'RTK', regex: /\brtk\b/ },
  { label: 'Monitor de bordo', regex: /monitor de bordo|display/ },
  { label: 'Plantadeira', regex: /plantadeira/ },
  { label: 'Pulverizador', regex: /pulverizador/ },
  { label: 'Colheitadeira', regex: /colheitadeira/ }
];

const MACHINE_TECH_LABELS = new Set([
  'Taxa variável',
  'Piloto automático',
  'Telemetria',
  'ISOBUS',
  'Corte de seção',
  'Mapa de aplicação',
  'RTK',
  'Monitor de bordo'
]);

const determineCulture = (tags: string[]): ScenarioAnalysis['cultura'] => {
  if (tags.includes('soja')) return 'soja';
  if (tags.includes('milho')) return 'milho';
  if (tags.includes('algodao')) return 'algodao';
  if (tags.includes('cana')) return 'cana';
  if (tags.includes('cafe')) return 'cafe';
  if (tags.includes('trigo')) return 'trigo';
  if (tags.includes('feijao')) return 'feijao';
  if (tags.includes('pastagem')) return 'pastagem';
  if (tags.includes('frutas')) return 'frutas';
  if (tags.includes('vegetais')) return 'vegetais';
  if (tags.includes('pecuaria')) return 'pecuaria';
  return 'geral';
};

const determineStage = (tags: string[]): ScenarioAnalysis['etapa'] => {
  if (tags.includes('primeira_visita')) return 'primeiro_contato';
  if (tags.includes('upsell') || tags.includes('cross_sell')) return 'expansao';
  if (tags.includes('orientado_preco') || tags.includes('cenario_competitivo')) return 'negociacao';
  if (tags.includes('revisao_relacionamento')) return 'relacionamento';
  if (tags.includes('pos_venda')) return 'pos_venda';
  return 'negociacao';
};

const detectThemes = (normalized: string): Theme[] => {
  const found = unique(THEME_PATTERNS.filter((item) => item.regex.test(normalized)).map((item) => item.theme));
  return found.length ? [...found] : ['geral'];
};

const inferPrimaryTheme = (normalized: string, themes: Theme[]): Theme => {
  if (/inseticida|cigarrinha|percevejo|lagarta|tripes|acaro|bicudo|controle de pragas/.test(normalized)) {
    return 'defensivo';
  }

  if (/taxa variavel|telemetria|piloto automatico|isobus|pulverizador|plantadeira|colheitadeira/.test(normalized)) {
    return 'maquinario';
  }

  if (/adubo|fertilizante|npk|ureia|map|kcl/.test(normalized)) {
    return 'adubo';
  }

  if (/semente|hibrido|cultivar|variedade/.test(normalized)) {
    return 'semente';
  }

  if (/biologico|bioinsumo|inoculante|trichoderma|bacillus/.test(normalized)) {
    return 'biologico';
  }

  if (/irrigacao|lamina|pivo|gotejo/.test(normalized)) {
    return 'irrigacao';
  }

  return themes[0] ?? 'geral';
};

const detectSpecificTerms = (normalized: string): string[] =>
  unique(SPECIFIC_TERM_PATTERNS.filter((item) => item.regex.test(normalized)).map((item) => item.label));

const describeThemeFocus = (theme: Theme): string => {
  const map: Record<Theme, string> = {
    adubo: 'adubação e eficiência nutricional',
    defensivo: 'manejo fitossanitário e controle de risco',
    semente: 'escolha de genética, vigor e estabelecimento',
    biologico: 'uso de biológicos e consistência de manejo',
    irrigacao: 'estratégia de irrigação e estabilidade produtiva',
    maquinario: 'execução operacional e qualidade de aplicação',
    servicos: 'serviço técnico e suporte em campo',
    geral: 'decisão técnico-econômica da operação'
  };
  return map[theme];
};

const resolveConversationTheme = (analysis: ScenarioAnalysis, productFocus?: ProductIntelligence): Theme =>
  (productFocus?.temas.find((tema) => tema !== 'geral') as Theme | undefined) ?? analysis.primaryTheme;

const hasWholeTokenMatch = (normalized: string, alias: RegExp): boolean => {
  const flags = alias.flags.includes('g') ? alias.flags : `${alias.flags}g`;
  const matcher = new RegExp(alias.source, flags);
  let match = matcher.exec(normalized);

  while (match) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const before = start === 0 ? ' ' : normalized[start - 1];
    const after = end >= normalized.length ? ' ' : normalized[end];
    const beforeOk = !/[a-z0-9]/.test(before);
    const afterOk = !/[a-z0-9]/.test(after);

    if (beforeOk && afterOk) {
      return true;
    }

    match = matcher.exec(normalized);
  }

  return false;
};

const describeCompetitiveDifferentiation = (analysis: ScenarioAnalysis): string => {
  if (analysis.primaryTheme === 'maquinario') {
    return analysis.machineTechTerms.length
      ? `Diferenciar por captura de valor da tecnologia embarcada (${analysis.machineTechTerms.slice(0, 4).join(', ')}) em vez de comparar só potência ou preço.`
      : 'Diferenciar por eficiência operacional e uso de tecnologia embarcada, em vez de comparar apenas preço de máquina/implemento.';
  }

  if (analysis.primaryTheme === 'adubo') {
    return 'Diferenciar por retorno por hectare, eficiência nutricional e previsibilidade de safra, não por preço por tonelada.';
  }

  if (analysis.primaryTheme === 'defensivo') {
    return 'Diferenciar por redução de risco, estabilidade de controle e custo total do manejo, não por preço do litro/quilo.';
  }

  if (analysis.specificTerms.length) {
    return `Diferenciar conectando os termos citados (${analysis.specificTerms.slice(0, 4).join(', ')}) ao impacto econômico no resultado final.`;
  }

  return 'Diferenciar por impacto em margem, produtividade e previsibilidade, evitando guerra de preços.';
};

const describeProductDifferentiation = (product?: ProductIntelligence): string | null => {
  if (!product) return null;
  return `${product.produto} (${product.fabricante}): defender por resultado no talhão, risco evitado e impacto econômico no ciclo, não por preço isolado.`;
};

const selectAgroChallenges = (analysis: ScenarioAnalysis): AgroChallengeSignal[] => {
  const scored = AGRO_CHALLENGE_SIGNALS.map((item) => {
    let score = 0;

    if (item.temas.includes('geral')) score += 1;
    if (item.temas.includes(analysis.primaryTheme)) score += 3;
    if (analysis.primaryTheme === 'maquinario' && item.id === 'tecnologia-embarcada') score += 4;
    if ((analysis.foco === 'preco' || analysis.prioridade === 'competicao') && item.id === 'credito-capital') score += 2;
    if (analysis.tags.includes('cenario_competitivo') && item.id === 'produtividade-margem') score += 1;

    return { item, score };
  })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return unique(scored.map((item) => item.id))
    .map((id) => scored.find((item) => item.id === id))
    .filter((item): item is AgroChallengeSignal => Boolean(item))
    .slice(0, 3);
};

const buildMissingScenarioDetails = (analysis: ScenarioAnalysis, productMentioned = false): string[] => {
  const hints: string[] = [];
  const text = analysis.normalized;

  if (analysis.specificTerms.length === 0 && !productMentioned) {
    hints.push('Cite o produto/solução em discussão e o resultado esperado com ele (ex.: proteger margem, ganhar produtividade, reduzir risco).');
  }

  if (productMentioned) {
    hints.push('Você já citou o produto. Para melhorar a qualidade da preparação, acrescente cultura, área (ha), fase da safra e objetivo esperado com essa decisão.');
  }

  if (!/margem|roi|retorno|produtividade|custo|eficiencia|risco|previsibilidade/.test(text)) {
    hints.push('Inclua 1 indicador de negócio prioritário (margem, produtividade, custo/ha, risco operacional ou previsibilidade).');
  }

  if (!/prazo|janela|safra|plantio|colheita|dias|semana|mes/.test(text)) {
    hints.push('Inclua momento da safra e prazo crítico de decisão (ex.: definir em 7 dias antes da janela de plantio).');
  }

  if (!/stakeholder|compras|financeiro|agronomo|socio|familia|gerente|diretor/.test(text)) {
    hints.push('Inclua quem decide (produtor, agrônomo, financeiro, compras) e quem pode travar o avanço.');
  }

  if (analysis.primaryTheme === 'maquinario' && analysis.machineTechTerms.length === 0) {
    hints.push('Em máquinas/implementos, inclua tecnologias embarcadas já usadas ou negligenciadas (telemetria, taxa variável, piloto, ISOBUS).');
  }

  return hints.slice(0, 4);
};

const buildThemeSpinInjections = (theme: Theme): {
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidadeSolucao: string[];
} => {
  if (theme === 'adubo') {
    return {
      situacao: ['Hoje, quais adubos/fertilizantes vocês mais utilizam e qual lógica técnica/econômica sustenta essa escolha?'],
      problema: ['Em quais talhões a estratégia atual de adubação tem mostrado menor resposta produtiva ou maior pressão de custo por hectare?'],
      implicacao: ['Quando a adubação é definida só por preço de produto, quanto isso pode custar em produtividade, eficiência e margem no fim da safra?'],
      necessidadeSolucao: ['Que evidência técnica e econômica você precisa ver para ajustar a adubação com foco em retorno por hectare e não em preço por tonelada?']
    };
  }

  if (theme === 'defensivo') {
    return {
      situacao: ['Quais defensivos e estratégias de rotação vocês utilizam hoje e em quais momentos do ciclo a decisão é mais crítica?'],
      problema: ['Onde o manejo atual tem gerado maior pressão de resistência, retrabalho ou perda de controle?'],
      implicacao: ['Se esse padrão continuar, qual impacto esperado em custo total de controle e perda de produtividade?'],
      necessidadeSolucao: ['Qual combinação de evidência de campo e impacto econômico te dá segurança para evoluir o manejo?']
    };
  }

  if (theme === 'semente') {
    return {
      situacao: ['Quais cultivares/híbridos vocês adotam hoje e quais critérios pesam mais na escolha?'],
      problema: ['Em que áreas o material atual tem limitado teto produtivo, estabilidade ou qualidade do stand?'],
      implicacao: ['Qual custo de oportunidade existe ao manter genética que não acompanha a meta de resultado da operação?'],
      necessidadeSolucao: ['Que validação técnica e econômica você precisa para avançar na escolha de material com maior retorno?']
    };
  }

  if (theme === 'biologico') {
    return {
      situacao: ['Quais biológicos vocês já usam hoje e com qual protocolo de aplicação e acompanhamento?'],
      problema: ['Onde a adoção atual de biológicos ainda gera insegurança de consistência de resultado?'],
      implicacao: ['Qual impacto para a operação quando o biológico é usado sem critério claro de posicionamento e validação?'],
      necessidadeSolucao: ['Que desenho de validação em campo te daria confiança para ampliar adoção com segurança econômica?']
    };
  }

  if (theme === 'irrigacao') {
    return {
      situacao: ['Como vocês definem hoje lâmina, frequência e prioridade de área na irrigação?'],
      problema: ['Onde o manejo atual de irrigação tem gerado maior variabilidade de produtividade ou custo de energia?'],
      implicacao: ['Se esse padrão seguir, qual risco de perda de eficiência hídrica, energia e resultado final?'],
      necessidadeSolucao: ['Que indicadores de eficiência e retorno precisam melhorar para justificar a mudança de estratégia?']
    };
  }

  if (theme === 'maquinario') {
    return {
      situacao: ['Quais equipamentos são críticos hoje e como vocês controlam calibração e qualidade de execução?'],
      problema: ['Onde a operação tem mais retrabalho, variação de aplicação ou perda por execução?'],
      implicacao: ['Qual impacto de execução abaixo do padrão em custo operacional e resultado da safra?'],
      necessidadeSolucao: ['Que melhoria operacional precisa ser comprovada para justificar o investimento em ajuste/tecnologia?']
    };
  }

  if (theme === 'servicos') {
    return {
      situacao: ['Quais serviços técnicos vocês usam hoje e quais critérios definem qualidade de atendimento em campo?'],
      problema: ['Onde o suporte atual ainda não consegue transformar orientação técnica em resultado econômico?'],
      implicacao: ['Qual custo de decisão tardia ou execução sem acompanhamento adequado para a operação?'],
      necessidadeSolucao: ['Que modelo de serviço te daria mais previsibilidade e confiança para avançar?']
    };
  }

  return {
    situacao: [],
    problema: [],
    implicacao: [],
    necessidadeSolucao: []
  };
};

const buildSpecificTermInjections = (analysis: ScenarioAnalysis, theme: Theme): {
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidadeSolucao: string[];
} => {
  const terms = analysis.specificTerms.slice(0, 4).join(', ');
  if (!terms) {
    return { situacao: [], problema: [], implicacao: [], necessidadeSolucao: [] };
  }

  const base = {
    situacao: [`Hoje, como vocês estão decidindo tecnicamente o uso de ${terms} e como medem retorno econômico dessas escolhas?`],
    problema: [`Em quais situações o uso atual de ${terms} não tem convertido em resultado na proporção esperada?`],
    implicacao: [`Quando ${terms} são escolhidos sem critério de retorno total, qual impacto isso gera em margem e previsibilidade?`],
    necessidadeSolucao: [`Que evidência vocês precisam para ajustar o uso de ${terms} com foco em resultado por hectare e segurança operacional?`]
  };

  if (theme === 'maquinario') {
    const machineAsset = analysis.specificTerms.find((term) =>
      ['Plantadeira', 'Pulverizador', 'Colheitadeira'].includes(term)
    );
    const assetText = machineAsset ? `na ${machineAsset.toLowerCase()}` : 'nos equipamentos';
    const techText = analysis.machineTechTerms.length
      ? analysis.machineTechTerms.join(', ')
      : 'piloto automático, taxa variável, telemetria e corte de seção';

    return {
      situacao: [
        `Quais tecnologias embarcadas vocês usam hoje ${assetText} (${techText}) e quais estão subutilizadas na operação?`
      ],
      problema: [
        `Onde a baixa utilização de tecnologia embarcada ${assetText} tem gerado desperdício, sobreposição ou falha de execução?`
      ],
      implicacao: [
        `Qual custo operacional e de produtividade aparece quando recursos de ${techText} não entram no padrão de trabalho da fazenda?`
      ],
      necessidadeSolucao: [
        `Que plano de adoção e treinamento faria vocês capturarem valor real da tecnologia embarcada ${assetText} já nesta safra?`
      ]
    };
  }

  return base;
};

const analyzeScenario = (scenario: string): ScenarioAnalysis => {
  const normalized = normalizeText(scenario);
  const tags = unique(
    TAG_PATTERNS.filter((pattern) => pattern.regex.test(normalized)).map((pattern) => pattern.tag)
  );

  const cultura = determineCulture(tags);
  const etapa = determineStage(tags);
  const themes = detectThemes(normalized);
  const primaryTheme = inferPrimaryTheme(normalized, themes);
  const specificTerms = detectSpecificTerms(normalized);
  const machineTechTerms = specificTerms.filter((term) => MACHINE_TECH_LABELS.has(term));
  const foco: ScenarioAnalysis['foco'] = tags.includes('orientado_preco') ? 'preco' : tags.length ? 'misto' : 'valor';
  const stakeholders: ScenarioAnalysis['stakeholders'] = tags.includes('stakeholders_multiplos') ? 'multiplos' : 'simples';
  const fabricantes = FABRICANTE_REFERENCIAS.filter((item) => item.regex.test(normalized)).map((item) => item.fabricante);

  const priorityRule = PRIORITY_BY_TAG.find((rule) =>
    rule.when({
      normalized,
      tags,
      themes,
      primaryTheme,
      specificTerms,
      machineTechTerms,
      cultura,
      etapa,
      foco,
      stakeholders,
      fabricantes,
      prioridade: DEFAULT_PRIORITY
    })
  );

  return {
    normalized,
    tags,
    themes,
    primaryTheme,
    specificTerms,
    machineTechTerms,
    cultura,
    etapa,
    foco,
    stakeholders,
    fabricantes,
    prioridade: priorityRule?.value ?? DEFAULT_PRIORITY
  };
};

const detectProductIntelligence = (
  normalized: string,
  mentionedManufacturers: string[] = []
): ProductIntelligence[] => {
  const scored = PRODUCT_INTELLIGENCE_DB.map((item) => {
    const aliasMatches = item.aliases.filter((alias) => hasWholeTokenMatch(normalized, alias)).length;
    if (!aliasMatches) {
      return { item, score: -1 };
    }

    const productName = normalizeText(item.produto);
    const productNamePattern = new RegExp(`\\b${productName.replace(/\s+/g, '\\s+')}\\b`);
    const exactProductName = productNamePattern.test(normalized);
    const manufacturerBoost = mentionedManufacturers.includes(item.fabricante) ? 2 : 0;
    const score = aliasMatches + (exactProductName ? 6 : 0) + manufacturerBoost + Math.min(productName.length / 12, 2);

    return { item, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return unique(scored.map((item) => `${item.fabricante}::${normalizeText(item.produto)}`))
    .map((id) => scored.find((item) => `${item.fabricante}::${normalizeText(item.produto)}` === id))
    .filter((item): item is ProductIntelligence => Boolean(item));
};

const detectPotentialProductTerms = (normalized: string): string[] => {
  const stopWords =
    /reuniao|interacao|produtor|cliente|safra|preco|valor|negocio|agro|venda|vendas|campo|cenario|preparacao|estrategica|comercial|tecnologia|tecnologias|produto|produtos|solucao|solucoes|manejo|operacao|plantio|colheita|talhao|area|custo|margem|risco|previsibilidade|resultado|decisao|avanco|objetivo|processo|compromisso|spin|epa|challenger|opc|premium|agregado|caro|caros|linha|linhas|portfolio|portifolio/;
  const tokens = unique(
    normalized
      .split(/\s+/)
      .filter((token) => token.length >= 5 && /^[a-z0-9-]+$/.test(token))
      .filter((token) => !stopWords.test(token))
  );

  return tokens.slice(0, 6);
};

const extractExplicitTechByManufacturer = (
  normalizedScenario: string,
  fabricantes: string[]
): Array<{ fabricante: string; tecnologia: string }> => {
  const invalidAsProduct = new Set([
    'produto',
    'produtos',
    'solucao',
    'solucoes',
    'tecnologia',
    'tecnologias',
    'premium',
    'agregado',
    'valor',
    'caro',
    'caros',
    'linha',
    'linhas',
    'portfolio',
    'portifolio',
    'manejo',
    'sistema',
    'praga',
    'pragas',
    'doenca',
    'doencas',
    'daninha',
    'daninhas',
    'inseto',
    'insetos',
    'cigarrinha',
    'percevejo',
    'lagarta',
    'tripes',
    'acaro',
    'bicudo',
    'ferrugem',
    'cercospora',
    'soja',
    'milho',
    'cana',
    'cafe',
    'algodao',
    'citrus',
    'hortifruti',
    'vegetais',
    'plantio',
    'colheita',
    'safra',
    'talhao',
    'area',
    'deficiencia',
    'deficiencias',
    'insuficiencia',
    'carencia',
    'carencias',
    'estresse',
    'hidrico',
    'seca',
    'calor',
    'lixiviacao',
    'volatilizacao',
    'fixacao',
    'compactacao',
    'desuniformidade',
    'variabilidade',
    'instabilidade',
    'uniformidade',
    'vigor',
    'arranque',
    'enraizamento',
    'raiz',
    'raizes',
    'stand',
    'florada',
    'floracao',
    'pegamento',
    'enchimento',
    'metabolismo',
    'fisiologia',
    'qualidade',
    'sanidade',
    'produtividade',
    'eficiencia',
    'estabilidade',
    'resiliencia',
    'resposta',
    'respostas',
    'retorno',
    'rentabilidade',
    'margem',
    'nutricao',
    'nutricional',
    'nutricionais',
    'fertilidade',
    'solo',
    'solos',
    'adubacao',
    'fertilizante',
    'fertilizantes',
    'adubo',
    'adubos',
    'npk',
    'nitrogenio',
    'fosforo',
    'potassio',
    'nitrato',
    'nitratos',
    'micronutriente',
    'micronutrientes',
    'macronutriente',
    'macronutrientes',
    'foliar',
    'barter'
    ,
    'semente',
    'sementes',
    'hibrido',
    'hibridos',
    'cultivar',
    'cultivares',
    'variedade',
    'variedades',
    'genetica',
    'biotecnologia',
    'stand',
    'germinacao',
    'tratores',
    'trator',
    'maquina',
    'maquinas',
    'maquinario',
    'implemento',
    'implementos',
    'pulverizador',
    'pulverizadores',
    'plantadeira',
    'plantadeiras',
    'colheitadeira',
    'colheitadeiras',
    'tecnologia-embarcada',
    'telemetria',
    'piloto',
    'automatico',
    'autosteer',
    'isobus',
    'rtk',
    'taxa-variavel',
    'calibracao'
    ,
    'calcario',
    'calagem',
    'gesso',
    'gessagem',
    'gesso-agricola',
    'fosfatagem',
    'potassagem',
    'dap',
    'map',
    'ureia',
    'superfosfato',
    'cloreto',
    'cloreto-de-potassio',
    'organico',
    'organicos',
    'esterco',
    'composto',
    'compostos',
    'compostagem',
    'micronutriente',
    'micronutrientes',
    'macronutriente',
    'macronutrientes',
    'boro',
    'zinco',
    'cobre',
    'manganes',
    'ferro',
    'molibdenio',
    'enxofre',
    'calcio',
    'magnesio',
    'herbicida',
    'herbicidas',
    'inseticida',
    'inseticidas',
    'fungicida',
    'fungicidas',
    'acaricida',
    'acaricidas',
    'fitossanitario',
    'fitossanitarios',
    'bioinsumo',
    'bioinsumos',
    'biologico',
    'biologicos',
    'glifosato',
    'atrazina',
    'acefato',
    'clorpirifos',
    'mancozebe',
    'clorotalonil',
    'semente-certificada',
    'certificada',
    'certificadas',
    'muda',
    'mudas',
    'germinativo',
    'germinacao',
    'combustivel',
    'combustiveis',
    'lubrificante',
    'lubrificantes',
    'semeadora',
    'semeadoras',
    'colhedora',
    'colhedoras',
    'equipamento',
    'equipamentos',
    'pivo',
    'pivos',
    'tubulacao',
    'tubulacoes',
    'irrigacao',
    'agua',
    'adjuvante',
    'adjuvantes',
    'surfactante',
    'espalhante',
    'adesivo',
    'oleo-mineral',
    'oleo-vegetal',
    'coadjuvante',
    'coadjuvantes'
  ]);
  const genericDescriptors = new Set([
    'produto',
    'produtos',
    'solucao',
    'solucoes',
    'tecnologia',
    'tecnologias',
    'premium',
    'agregado',
    'valor',
    'caro',
    'caros',
    'linha',
    'linhas',
    'portfolio',
    'portifolio',
    'manejo',
    'sistema'
  ]);
  const found: Array<{ fabricante: string; tecnologia: string }> = [];

  fabricantes.forEach((fabricante) => {
    const key = normalizeText(fabricante).split(' ')[0];
    const regex = new RegExp(`\\b([a-z0-9-]{4,})\\s+(?:da|do)\\s+${key}\\b`, 'g');
    let match = regex.exec(normalizedScenario);
    while (match) {
      const token = match[1];
      if (!genericDescriptors.has(token) && !invalidAsProduct.has(token)) {
        found.push({ fabricante, tecnologia: token });
      }
      match = regex.exec(normalizedScenario);
    }
  });

  return found;
};

const buildDynamicProductProfiles = (
  analysis: ScenarioAnalysis,
  normalizedScenario: string,
  staticProducts: ProductIntelligence[]
): ProductIntelligence[] => {
  if (!analysis.fabricantes.length) {
    return [];
  }

  const knownNames = new Set(staticProducts.map((item) => normalizeText(item.produto)));
  const explicit = extractExplicitTechByManufacturer(normalizedScenario, analysis.fabricantes);
  const dynamicRaw = explicit;

  const uniqueDynamic = dynamicRaw.filter((item, idx, arr) => {
    const key = `${item.fabricante}::${item.tecnologia}`;
    return arr.findIndex((x) => `${x.fabricante}::${x.tecnologia}` === key) === idx;
  }).slice(0, 4);

  return uniqueDynamic
    .filter((item) => !knownNames.has(normalizeText(item.tecnologia)))
    .map((item) => {
      const ref = FABRICANTE_REFERENCIAS.find((x) => x.fabricante === item.fabricante);
      const tech = item.tecnologia.toUpperCase();
      const themeFocus = describeThemeFocus(analysis.primaryTheme);
      const inferredFromContext = inferPrimaryTheme(normalizedScenario, [analysis.primaryTheme]);
      const primaryTheme = inferredFromContext === 'geral' ? 'servicos' : inferredFromContext;

      return {
        produto: tech,
        fabricante: item.fabricante,
        aliases: [new RegExp(`\\b${normalizeText(tech)}\\b`)],
        temas: [primaryTheme, 'geral'],
        propostaValorCurta:
          `${tech} com foco em resultado de negócio no campo, conectando ${themeFocus} com margem, produtividade e previsibilidade.`,
        fortalezasCompetitivas: [
          `${tech} deve ser defendido pelo impacto no resultado final da safra, e não por comparação isolada de preço.`,
          'A proposta ganha força quando conecta execução em campo, risco evitado e retorno econômico por área.',
          `Use fontes oficiais da ${item.fabricante} para sustentar posicionamento técnico e comercial com credibilidade.`
        ],
        cuidadosDePosicionamento: [
          'Sempre alinhar recomendação ao contexto da fazenda: cultura, fase da safra, equipe e capacidade de execução.',
          'Definir critério simples de validação em área piloto para sustentar decisão de escala com segurança.',
          'Evitar promessa genérica: traduzir benefício técnico em número de negócio que o produtor reconhece.'
        ],
        ganchosSpin: {
          situacao: [
            `Como vocês têm usado ${tech} até aqui e quais critérios definem quando essa tecnologia entra no manejo?`
          ],
          problema: [
            `Onde o uso atual de ${tech} ainda não está entregando o resultado esperado no campo?`
          ],
          implicacao: [
            `Se esse padrão seguir, qual impacto isso traz em margem, risco operacional e previsibilidade da safra?`
          ],
          necessidadeSolucao: [
            `Que condição de resultado precisa ficar clara para você concordar em avançar com ${tech} no próximo passo?`
          ]
        },
        fontes: ref?.fontes?.slice(0, 2) ?? [],
        atualizadoEm: new Date().toISOString().slice(0, 10)
      };
    });
};

const canonical = (line: string): string =>
  normalizeText(line)
    .replace(/[.,;:!?()]/g, '')
    .split(' ')
    .filter((word) => word.length > 3)
    .slice(0, 8)
    .join(' ');

const composeUnique = (lines: string[], amount: number): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) {
      continue;
    }

    const key = canonical(cleanLine);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(cleanLine);
    }

    if (result.length >= amount) {
      break;
    }
  }

  return result;
};

const relevanceTerms = (...values: Array<string | null | undefined>): string[] =>
  unique(
    values
      .flatMap((value) =>
        normalizeText(value ?? '')
          .split(' ')
          .map((item) => item.trim())
          .filter((item) => item.length >= 4)
      )
      .filter(Boolean)
  );

const selectRelevantUnique = (
  lines: string[],
  amount: number,
  ...signals: Array<string | null | undefined>
): string[] => {
  const base = composeUnique(lines, Math.max(amount + 8, lines.length));
  const terms = relevanceTerms(...signals);

  if (!terms.length) {
    return pick(base, amount);
  }

  const scored = base
    .map((line, index) => {
      const normalizedLine = normalizeText(line);
      const score = terms.reduce((acc, term) => acc + (normalizedLine.includes(term) ? 1 : 0), 0);
      return { line, index, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.index - b.index;
    })
    .map((item) => item.line);

  return pick(scored, amount);
};

const metricByCulture = (culture: ScenarioAnalysis['cultura']): string => {
  if (culture === 'soja' || culture === 'milho') return 'R$/ha, estabilidade de produtividade e eficiência de janela operacional';
  if (culture === 'algodao') return 'arrobas por hectare, qualidade de fibra, previsibilidade e margem por área';
  if (culture === 'cana') return 'TCH/ATR, custo por tonelada e impacto de longevidade do canavial';
  if (culture === 'cafe') return 'produtividade, padrão de qualidade e previsibilidade de receita';
  if (culture === 'trigo') return 'sacas por hectare, qualidade, peso hectolitro e rentabilidade';
  if (culture === 'feijao') return 'produtividade, padrão comercial, estabilidade e resultado por hectare';
  if (culture === 'pastagem') return 'produção por área, arroba por hectare e eficiência do sistema';
  if (culture === 'frutas' || culture === 'vegetais') return 'qualidade comercial, padronização, produtividade e valor de venda';
  if (culture === 'pecuaria') return 'arroba por área, giro, custo de nutrição e eficiência operacional';
  return 'margem, previsibilidade e custo total da operação';
};

const buildManufacturerNotes = (analysis: ScenarioAnalysis): string[] => {
  if (!analysis.fabricantes.length) {
    return [];
  }

  return analysis.fabricantes
    .map((fabricante) => FABRICANTE_REFERENCIAS.find((item) => item.fabricante === fabricante))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map(
      (item) =>
        `Se ${item.fabricante} aparecer como referência do cliente, conduza comparação por critério de negócio: ${item.focoConversa}`
    );
};

const buildManufacturerReferences = (analysis: ScenarioAnalysis): Array<{ fabricante: string; fonte: string }> => {
  return analysis.fabricantes.flatMap((fabricante) => {
    const item = FABRICANTE_REFERENCIAS.find((ref) => ref.fabricante === fabricante);
    if (!item) return [];
    return item.fontes.map((fonte) => ({ fabricante: item.fabricante, fonte }));
  });
};

const buildSectorReferences = (
  analysis: ScenarioAnalysis
): Array<{ fabricante: string; focoConversa: string; fonte: string }> => {
  const byTheme = FABRICANTE_REFERENCIAS.filter(
    (item) => item.temas?.includes(analysis.primaryTheme) || item.temas?.includes('geral')
  );

  const prioritized = [
    ...byTheme.filter((item) => analysis.fabricantes.includes(item.fabricante)),
    ...byTheme.filter((item) => !analysis.fabricantes.includes(item.fabricante))
  ];

  const seen = new Set<string>();
  const selected = prioritized.filter((item) => {
    if (seen.has(item.fabricante)) return false;
    seen.add(item.fabricante);
    return true;
  }).slice(0, 8);

  return selected.flatMap((item) =>
    item.fontes.slice(0, 1).map((fonte) => ({
      fabricante: item.fabricante,
      focoConversa: item.focoConversa,
      fonte
    }))
  );
};

const emptyStrategicHooks = (): StrategicHooks => ({
  opcProcess: [],
  spinNeed: [],
  epaEducar: [],
  tips: [],
  roiHooks: []
});

const inferYaraLinesByScenario = (analysis: ScenarioAnalysis, normalizedScenario: string): string[] => {
  const base = YARA_CROP_FOCUS[analysis.cultura] ?? YARA_CROP_FOCUS.geral;
  const matchedProblems = YARA_PROBLEM_TO_LINES.filter((item) => item.regex.test(normalizedScenario)).flatMap((item) => item.lines);
  const matchedStages = YARA_STAGE_TO_LINES.filter((item) => item.regex.test(normalizedScenario)).flatMap((item) => item.lines);
  const matchedObjectives = YARA_OBJECTIVE_TO_LINES.filter((item) => item.regex.test(normalizedScenario)).flatMap((item) => item.lines);

  return unique([...base, ...matchedProblems, ...matchedStages, ...matchedObjectives]).slice(0, 5);
};

const buildStrategicHooksByPlayer = (
  analysis: ScenarioAnalysis,
  normalizedScenario: string,
  productFocus?: ProductIntelligence
): StrategicHooks => {
  const primaryPlayer = productFocus?.fabricante ?? analysis.fabricantes[0] ?? 'Yara';
  if (!primaryPlayer) {
    return emptyStrategicHooks();
  }

  const playbook = PLAYER_VALUE_PLAYBOOKS.find((item) => item.fabricante === primaryPlayer);
  if (!playbook) {
    return emptyStrategicHooks();
  }

  const productName = productFocus?.fabricante === primaryPlayer ? productFocus.produto : `portfólio ${primaryPlayer}`;
  const linhaResumo = playbook.linhas.map((item) => `${item.linha} (${item.papel})`).slice(0, 3).join(' | ');
  const globalRuleText = `Diretriz de valor: priorize ${VALUE_SELLING_GLOBAL_RULES.priority.slice(0, 3).join(', ')} e evite ${VALUE_SELLING_GLOBAL_RULES.avoid.slice(0, 2).join(', ')}.`;
  const yaraSuggestedLines =
    primaryPlayer === 'Yara' ? inferYaraLinesByScenario(analysis, normalizedScenario) : [];
  const cortevaHooks =
    primaryPlayer === 'Corteva' ? buildCortevaValueHooks(normalizedScenario, analysis.cultura) : null;
  const yaraLineDetail =
    primaryPlayer === 'Yara' && yaraSuggestedLines.length
      ? `Linhas recomendadas para este cenário: ${yaraSuggestedLines
          .map((line) => `${line} (${YARA_LINE_ROLE_MAP[line as keyof typeof YARA_LINE_ROLE_MAP]?.role ?? 'valor'})`)
          .join(' | ')}.`
      : '';

  return {
    opcProcess: composeUnique(
      [
        `No contexto ${primaryPlayer}, conduza a conversa por valor de sistema e resultado econômico no talhão.`,
        `Linha estratégica para apoiar o raciocínio: ${linhaResumo}.`,
        ...(cortevaHooks ? [cortevaHooks.systemRecommended, ...cortevaHooks.opcProcess] : []),
        yaraLineDetail,
        globalRuleText,
        ...playbook.hooks.opcProcess
      ],
      4
    ),
    spinNeed: composeUnique(
      [
        `No caso de ${productName}, qual condição de resultado você precisa ver para defender internamente esta decisão?`,
        ...(cortevaHooks?.spinNeed ?? []),
        ...(primaryPlayer === 'Yara' && yaraSuggestedLines.length
          ? [`Considerando ${yaraSuggestedLines.slice(0, 3).join(', ')}, qual critério de decisão vamos acordar hoje para avançar com segurança?`]
          : []),
        ...playbook.hooks.spinNeed
      ],
      4
    ),
    epaEducar: composeUnique(
      [
        ...(cortevaHooks?.educar ?? []),
        yaraLineDetail,
        ...playbook.hooks.epaEducar
      ],
      4
    ),
    tips: composeUnique(
      [
        `Use a trilha ${primaryPlayer} como roteiro de valor: problema de campo -> decisão técnica -> impacto econômico.`,
        ...(cortevaHooks ? [cortevaHooks.systemRecommended] : []),
        ...playbook.hooks.tips
      ],
      3
    ),
    roiHooks: composeUnique(
      [
        `Na defesa de ROI com ${primaryPlayer}, conecte ganho técnico a resultado econômico por hectare.`,
        ...(cortevaHooks?.roiHooks ?? []),
        ...playbook.hooks.roiHooks
      ],
      3
    )
  };
};

type ProducerProfile = 'conservador' | 'moderado' | 'inovador';
type TechLevel = 'baixo' | 'medio' | 'alto';
type PriceSensitivity = 'alta' | 'media' | 'baixa';
type PremiumResistance = 'alta' | 'media' | 'baixa';

const inferCultureStage = (normalizedScenario: string): 'plantio' | 'vegetativo' | 'reprodutivo' | 'enchimento' | 'fertirrigacao' => {
  if (/fertirrigacao|pivo|irrigad|gotejo/.test(normalizedScenario)) return 'fertirrigacao';
  if (/enchimento|grao|classificacao|qualidade final/.test(normalizedScenario)) return 'enchimento';
  if (/florada|reprodutiv|pegamento/.test(normalizedScenario)) return 'reprodutivo';
  if (/vegetativ|cobertura|nitrogenio/.test(normalizedScenario)) return 'vegetativo';
  return 'plantio';
};

const inferFarmerProfiles = (analysis: ScenarioAnalysis, normalizedScenario: string): string[] => {
  const profiles: string[] = [];

  if (analysis.foco === 'preco' || /preco|desconto|comparativo|barato|cotacao/.test(normalizedScenario)) {
    profiles.push('price driven');
  }
  if (/tecnologia|digital|mapa|telemetria|taxa variavel|fertirrigacao|precisao/.test(normalizedScenario)) {
    profiles.push('technology adopter');
  }
  if (/desconfi|cetic|nao acredita|resistent|traumatizado/.test(normalizedScenario)) {
    profiles.push('skeptical');
  }
  if (/concorrente|cooperativa|distribuidor|amizade com vendedor|fiel/.test(normalizedScenario)) {
    profiles.push('loyal to competitor');
  }
  if (/\b(1[0-9]{3}|[2-9][0-9]{3,})\s*ha\b|grande produtor|operacao grande|fazenda grande/.test(normalizedScenario)) {
    profiles.push('large farm');
  }
  if (/\b([1-9][0-9]{0,2})\s*ha\b|produtor pequeno|area pequena|pequena propriedade/.test(normalizedScenario)) {
    profiles.push('small farm');
  }
  if (/clima|seca|veranico|chuva|janela apertada|alto risco/.test(normalizedScenario)) {
    profiles.push('high risk season');
  }
  if (/caixa|credito|endivid|prazo|baixo fluxo|sem limite/.test(normalizedScenario)) {
    profiles.push('low cash flow');
  }
  if (/problema no passado|experiencia ruim|nao gostou|prejuizo anterior/.test(normalizedScenario)) {
    profiles.push('previous bad experience');
  }
  if (/atrasado|em cima da hora|tarde|ultima hora|late planting|janela/.test(normalizedScenario)) {
    profiles.push('late buyer');
  }
  if (/dados|roi|analise|talhao|validacao|protocolo/.test(normalizedScenario)) {
    profiles.push('highly technical');
  }
  if (/sempre fez assim|tradicional|vizinho|habito|sempre usou/.test(normalizedScenario)) {
    profiles.push('traditional farmer');
  }

  if (!profiles.length) {
    profiles.push(analysis.foco === 'preco' ? 'price driven' : 'traditional farmer');
  }

  return unique(profiles).slice(0, 4);
};

const inferFieldSituations = (analysis: ScenarioAnalysis, normalizedScenario: string): string[] => {
  const situations: string[] = [];

  if (/cooperativa|co-op/.test(normalizedScenario)) situations.push('competitor cooperative present');
  if (/distribuidor|revenda/.test(normalizedScenario)) situations.push('distributor pressure');
  if (/preco|cotacao|comparativo|desconto/.test(normalizedScenario)) situations.push('price comparison');
  if (/plantio atrasado|janela|tarde|atraso/.test(normalizedScenario)) situations.push('late planting');
  if (/seca|veranico|chuva|clima|risco climatico/.test(normalizedScenario)) situations.push('climate risk');
  if (/credito|endivid|limite|banco|caixa/.test(normalizedScenario)) situations.push('credit limitation');
  if (/preco do grao|commodity|mercado ruim|baixa da soja|baixa da commodity/.test(normalizedScenario)) {
    situations.push('low commodity price');
  }
  if (/margem|rentabilidade|lucro apertado/.test(normalizedScenario)) situations.push('margin pressure');
  if (/quebra|perda|historico ruim|prejuizo/.test(normalizedScenario)) situations.push('yield loss history');
  if (/solo|compactacao|fertilidade|textura|arenoso|argiloso/.test(normalizedScenario)) situations.push('soil limitation');
  if (/deficiencia|carencia|micronutriente|nitrogenio|potassio|fosforo/.test(normalizedScenario)) {
    situations.push('nutrient deficiency');
  }
  if (/baixa eficiencia|fertilizacao ruim|adubacao mal posicionada|perda de nitrogenio|volatilizacao/.test(normalizedScenario)) {
    situations.push('low efficiency fertilization');
  }

  if (!situations.length) {
    situations.push(
      analysis.foco === 'preco' ? 'price comparison' : 'margin pressure',
      analysis.prioridade === 'competicao' ? 'competitor cooperative present' : 'climate risk'
    );
  }

  return unique(situations).slice(0, 5);
};

const buildKnowledgeDecisionContext = (analysis: ScenarioAnalysis, normalizedScenario: string) => {
  const farmerProfiles = unique([
    ...classifyByBank(normalizedScenario, FARMER_PROFILE_BANK).map((item) =>
      FARMER_PROFILE_BANK.find((profile) => profile.key === item)?.label ?? item
    ),
    ...inferFarmerProfiles(analysis, normalizedScenario)
  ]).slice(0, 5);

  const objections = getObjectionStrategies(normalizedScenario);
  const fieldScenarioKeys = unique([
    ...classifyByBank(normalizedScenario, FIELD_SCENARIO_BANK),
    ...inferFieldSituations(analysis, normalizedScenario)
  ]).slice(0, 6);
  const problemType = detectProblemType(normalizedScenario);
  const seasonMoment = inferSeasonMomentFromText(normalizedScenario);
  const spinBank = getSpinBankByProblem(problemType);
  const provocations = getEpaProvocationsByProblem(problemType);
  const valueNarratives = getValueNarratives(
    problemType,
    classifyByBank(normalizedScenario, FARMER_PROFILE_BANK)
  );
  const agronomicArguments = getAgronomicArgumentsByTheme(analysis.primaryTheme);

  return {
    farmerProfiles,
    objections,
    fieldScenarioKeys,
    problemType,
    seasonMoment,
    spinBank,
    provocations,
    valueNarratives,
    agronomicArguments
  };
};

const inferProducerProfile = (analysis: ScenarioAnalysis, normalizedScenario: string): ProducerProfile => {
  if (/inovad|tecnologia|alto desempenho|diferencial/.test(normalizedScenario)) return 'inovador';
  if (analysis.foco === 'preco' || /resistent|tradicional|conservador/.test(normalizedScenario)) return 'conservador';
  return 'moderado';
};

const inferTechLevel = (analysis: ScenarioAnalysis, normalizedScenario: string): TechLevel => {
  if (analysis.machineTechTerms.length >= 2 || /isobus|rtk|telemetria|taxa variavel|fertirrigacao/.test(normalizedScenario)) {
    return 'alto';
  }
  if (/plantadeira|pulverizador|monitor|mapa|protocolo/.test(normalizedScenario)) return 'medio';
  return 'baixo';
};

const inferPriceSensitivity = (analysis: ScenarioAnalysis, normalizedScenario: string): PriceSensitivity => {
  if (analysis.foco === 'preco' || /preco|desconto|barato|custo/.test(normalizedScenario)) return 'alta';
  if (/orcamento|caixa|investimento/.test(normalizedScenario)) return 'media';
  return 'baixa';
};

const inferPremiumResistance = (analysis: ScenarioAnalysis, normalizedScenario: string): PremiumResistance => {
  if (/resistente|nao quer premium|nao confia|cetic/.test(normalizedScenario)) return 'alta';
  if (analysis.prioridade === 'competicao' || inferPriceSensitivity(analysis, normalizedScenario) === 'alta') return 'media';
  return 'baixa';
};

const inferClimate = (normalizedScenario: string): 'seco' | 'chuvoso' | 'irrigado' | 'alta_amplitude' | 'normal' => {
  if (/irrigad|pivo|gotejo/.test(normalizedScenario)) return 'irrigado';
  if (/seca|veranico|estiagem|deficit hidrico/.test(normalizedScenario)) return 'seco';
  if (/chuva|chuvoso|excesso hidrico/.test(normalizedScenario)) return 'chuvoso';
  if (/amplitude|oscilacao termica/.test(normalizedScenario)) return 'alta_amplitude';
  return 'normal';
};

const inferSoil = (normalizedScenario: string): 'arenoso' | 'argiloso' | 'media_textura' | 'normal' => {
  if (/arenoso|areia/.test(normalizedScenario)) return 'arenoso';
  if (/argiloso|argila/.test(normalizedScenario)) return 'argiloso';
  if (/media textura|textura media/.test(normalizedScenario)) return 'media_textura';
  return 'normal';
};

const inferPrimaryObjective = (normalizedScenario: string): 'increase_yield' | 'reduce_risk' | 'improve_quality' | 'precision' | 'efficiency' => {
  if (/qualidade|classificacao|padrao comercial|valor de venda/.test(normalizedScenario)) return 'improve_quality';
  if (/risco|estabilidade|previsibilidade|seguranca/.test(normalizedScenario)) return 'reduce_risk';
  if (/precisao|controle fino|fertirrigacao/.test(normalizedScenario)) return 'precision';
  if (/eficiencia|retorno por hectare|roi/.test(normalizedScenario)) return 'efficiency';
  return 'increase_yield';
};

const suggestYaraLinesByDecisionPriority = (
  analysis: ScenarioAnalysis,
  normalizedScenario: string
): string[] => {
  const score = new Map<string, number>();
  const addScore = (lines: string[], weight: number) => {
    lines.forEach((line) => score.set(line, (score.get(line) ?? 0) + weight));
  };

  addScore(YARA_CROP_FOCUS[analysis.cultura] ?? YARA_CROP_FOCUS.geral, 4);

  YARA_STAGE_TO_LINES.forEach((rule) => {
    if (rule.regex.test(normalizedScenario)) addScore(rule.lines, 3);
  });
  YARA_PROBLEM_TO_LINES.forEach((rule) => {
    if (rule.regex.test(normalizedScenario)) addScore(rule.lines, 4);
  });
  YARA_OBJECTIVE_TO_LINES.forEach((rule) => {
    if (rule.regex.test(normalizedScenario)) addScore(rule.lines, 3);
  });

  const climate = inferClimate(normalizedScenario);
  if (climate === 'seco') addScore(['YaraAmplix', 'YaraVita'], 2);
  if (climate === 'chuvoso') addScore(['YaraMila', 'YaraBela', 'YaraVita'], 2);
  if (climate === 'irrigado') addScore(['YaraTera', 'YaraLiva', 'YaraVita'], 3);
  if (climate === 'alta_amplitude') addScore(['YaraAmplix', 'YaraVita'], 2);

  const soil = inferSoil(normalizedScenario);
  if (soil === 'arenoso') addScore(['YaraAmplix', 'YaraTera', 'YaraVita'], 2);
  if (soil === 'argiloso') addScore(['YaraMila', 'YaraAmplix', 'YaraVita'], 2);
  if (soil === 'media_textura') addScore(['YaraMila', 'YaraVita', 'YaraAmplix'], 1);

  const objective = inferPrimaryObjective(normalizedScenario);
  if (objective === 'increase_yield') addScore(['YaraMila', 'YaraVita', 'YaraAmplix'], 2);
  if (objective === 'reduce_risk') addScore(['YaraAmplix', 'YaraTera'], 2);
  if (objective === 'improve_quality') addScore(['YaraLiva', 'YaraVita'], 2);
  if (objective === 'precision') addScore(['YaraTera', 'YaraRega'], 2);
  if (objective === 'efficiency') addScore(['YaraMila', 'YaraBela', 'YaraVera'], 2);

  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([line]) => line)
    .slice(0, 5);
};

const buildEngineInsights = (
  analysis: ScenarioAnalysis,
  scenario: string,
  playerHooks: StrategicHooks,
  productFocus: ProductIntelligence | undefined,
  storyline: ScenarioStoryline,
  decisionContext?: ReturnType<typeof buildKnowledgeDecisionContext>,
  strategyContext?: ReturnType<typeof buildStrategyDecisionContext>,
  memoryContext?: ReturnType<typeof buildScenarioMemory>
): PreparationResult['engineInsights'] => {
  const player = productFocus?.fabricante ?? analysis.fabricantes[0] ?? 'Yara';
  const normalizedScenario = normalizeText(scenario);
  const cultureBenchmark = CROP_BENCHMARKS[analysis.cultura] ?? CROP_BENCHMARKS.geral;
  const cultureStage = inferCultureStage(normalizedScenario);
  const producerProfile = inferProducerProfile(analysis, normalizedScenario);
  const techLevel = inferTechLevel(analysis, normalizedScenario);
  const priceSensitivity = inferPriceSensitivity(analysis, normalizedScenario);
  const premiumResistance = inferPremiumResistance(analysis, normalizedScenario);
  const farmerProfiles = decisionContext?.farmerProfiles ?? inferFarmerProfiles(analysis, normalizedScenario);
  const fieldSituations = decisionContext?.fieldScenarioKeys ?? inferFieldSituations(analysis, normalizedScenario);
  const objectionsDetected = decisionContext?.objections.map((item) => item.label) ?? [];
  const objectionStrategies = decisionContext?.objections.map((item) => item.responseStrategy) ?? [];
  const seasonMoment = decisionContext?.seasonMoment ?? inferSeasonMomentFromText(normalizedScenario);
  const problemType = decisionContext?.problemType ?? detectProblemType(normalizedScenario);
  const cortevaByScenario = player === 'Corteva' ? inferCortevaSolutionsByScenario(normalizedScenario, analysis.cultura) : [];

  const recommendedLines =
    player === 'Yara'
      ? suggestYaraLinesByDecisionPriority(analysis, normalizedScenario)
      : player === 'Corteva'
        ? cortevaByScenario.map((item) => item.label)
      : (PLAYER_VALUE_PLAYBOOKS.find((item) => item.fabricante === player)?.linhas.map((item) => item.linha) ?? []);

  const gains = recommendedLines
    .map((line) => YARA_LINE_GAIN_PERCENT[line])
    .filter((item): item is { min: number; max: number } => Boolean(item));

  const avgGainPercent = gains.length
    ? {
        min: gains.reduce((acc, g) => acc + g.min, 0) / gains.length,
        max: gains.reduce((acc, g) => acc + g.max, 0) / gains.length
      }
    : { min: 3, max: 7 };

  const baseGainMin = (cultureBenchmark.avgYield * avgGainPercent.min) / 100;
  const baseGainMax = (cultureBenchmark.avgYield * avgGainPercent.max) / 100;

  const roiText = (multiplier: number, label: string): string => {
    const gainMin = baseGainMin * multiplier;
    const gainMax = baseGainMax * multiplier;
    const revenueMin = gainMin * cultureBenchmark.pricePerBag;
    const revenueMax = gainMax * cultureBenchmark.pricePerBag;

    return `${label}: potencial de +${gainMin.toFixed(1)} a +${gainMax.toFixed(1)} ${cultureBenchmark.unit}, com receita incremental estimada entre R$ ${revenueMin.toFixed(0)} e R$ ${revenueMax.toFixed(0)} por hectare.`;
  };

  const profileText: Record<ProducerProfile, string> = {
    conservador:
      'Perfil conservador: prioriza segurança e tende a evitar soluções de maior valor agregado sem prova prática; conduza com linguagem simples, validação em área menor e foco em risco evitado.',
    moderado:
      'Perfil moderado: aberto a evolução de manejo quando enxerga lógica de retorno; combine argumento técnico e econômico com passos de implantação claros.',
    inovador:
      'Perfil inovador: busca diferencial e alta performance; conduza por teto produtivo, eficiência fina e captura de valor por hectare.'
  };

  const abordagemPorPreco: Record<PriceSensitivity, string> = {
    alta:
      'Abordagem comercial: começar pelo custo da ineficiência e traduzir em sacas/ha e margem, antes de discutir produto.',
    media:
      'Abordagem comercial: equilibrar investimento e retorno, mostrando alavancas práticas de ganho.',
    baixa:
      'Abordagem comercial: enfatizar performance máxima, previsibilidade e diferenciação competitiva.'
  };

  const abordagemPorResistencia: Record<PremiumResistance, string> = {
    alta:
      'Sequência recomendada: cenário -> problema -> impacto -> custo oculto -> risco de manter o modelo atual -> nova perspectiva -> solução.',
    media:
      'Sequência recomendada: cenário -> lacuna -> oportunidade -> solução -> ROI.',
    baixa:
      'Sequência recomendada: oportunidade -> ganho -> otimização -> solução -> escala.'
  };

  const yaraCultureAnchor =
    `Âncora Yara: comunicar com ${YARA_INSTITUTIONAL_FOUNDATION.cropNutritionExpertise[0]}, ${YARA_INSTITUTIONAL_FOUNDATION.sustainability[0]}, posicionamento premium orientado a valor e apoio à adoção de tecnologia com resultado econômico claro.`;
  const scenarioUnderstanding = `Entendimento do cenário: operação em ${CULTURA_CONTEXT[analysis.cultura].nome}, tema central em ${describeThemeFocus(analysis.primaryTheme)}, momento ${seasonMoment}, perfis dominantes ${farmerProfiles.join(', ')} e situações de campo ${fieldSituations.join(', ')}.`;
  const memorySummary = buildMemoryContextSummary(memoryContext ?? buildScenarioMemory(scenario, analysis));
  const memoryLearning = buildMemoryLearningGuidance(memoryContext ?? buildScenarioMemory(scenario, analysis));
  const valueNarrative = composeUnique([
    ...(decisionContext?.valueNarratives ?? []),
    'Construa valor antes de falar em produto: dor agronômica, impacto econômico, critério de decisão e só depois solução.',
    `Reposicione preço para valor total: produtividade, eficiência nutricional, margem por hectare e previsibilidade em ${CULTURA_CONTEXT[analysis.cultura].nome}.`,
    `Use Yara como lógica de solução técnica, não como propaganda: ciência agronômica + execução + ROI por hectare.`
  ], 4);
  const agronomicArgument = composeUnique([
    ...(decisionContext?.agronomicArguments ?? []),
    `No tema ${describeThemeFocus(analysis.primaryTheme)}, conecte recomendação a eficiência nutricional, estabilidade e resposta econômica do sistema.`
  ], 4);
  const riskNarrative = [
    `Se a decisão continuar orientada por custo inicial, o risco é ampliar variabilidade, perda de eficiência e instabilidade em ${CULTURA_CONTEXT[analysis.cultura].nome}.`,
    'Conecte risco a janela, clima, solo, execução e crédito, sempre traduzindo para custo da inação.',
    'Traga segurança pela validação em área, com métrica simples e compromisso claro de leitura.'
  ];
  const productivityNarrative = [
    'Conduza a conversa para resposta produtiva real no talhão, não para promessa genérica de produto.',
    `Mostre qual fase da cultura precisa capturar mais resultado agora: ${cultureStage}.`,
    'Fale em estabilidade de produtividade, eficiência de uso de nutrientes e menor perda por decisão tardia.'
  ];
  const profitabilityNarrative = [
    'Leve a decisão para margem por hectare e rentabilidade do sistema, não para custo unitário do insumo.',
    'Conecte ganho agronômico a receita incremental, custo evitado e prazo de retorno.',
    'Se houver pressão financeira, priorize risco evitado, previsibilidade e investimento mais eficiente.'
  ];
  const roiNarrative = [
    `Faça o ROI conversar com o problema dominante (${problemType}): ganho potencial, custo evitado e prazo de retorno.`,
    'Evite ROI abstrato; use conta simples por hectare, com cenário atual versus cenário corrigido.',
    ...(playerHooks.roiHooks ?? [])
  ].slice(0, 4);
  const conversationGuidance = composeUnique([
    'Não fale preço cedo demais.',
    'Não apresente produto antes de aprofundar diagnóstico, implicação e critério de decisão.',
    'Use perguntas abertas para mover a conversa e só depois feche com decisão.',
    'Reenquadre objeção antes de responder condição comercial.',
    'Mostre valor, crie impacto e guie o próximo passo com dono, prazo e métrica.',
    ...SALES_MISTAKE_BANK.map((item) => `Evite ${item.replace(/_/g, ' ')}.`)
  ], 6);

  return {
    scenarioUnderstanding,
    memoryContext: memorySummary,
    relationshipLevel: memoryContext?.relationshipLevel ?? 'prospect',
    meetingContinuity: memoryContext?.meetingType ?? 'follow-up meeting',
    memoryLearning,
    meetingStrategy: strategyContext?.meetingStrategy ?? [],
    riskAlert: strategyContext?.riskAlert ?? [],
    opportunityAlert: strategyContext?.opportunityAlert ?? [],
    recommendedApproach: translateApproachLabel(strategyContext?.recommendedApproach) ?? 'abordagem consultiva',
    conversationPath: (strategyContext?.conversationPath ?? ['Path A — collaborative dialogue']).map(translateConversationPath),
    communicationLevel: strategyContext?.communicationLevel ?? 'educational',
    difficultyLevel: strategyContext?.difficultyLevel ?? 'normal',
    farmerProfile: farmerProfiles,
    fieldSituations,
    objectionsDetected,
    objectionStrategies,
    seasonMoment,
    problemType,
    analiseCenario:
      `Cenário com foco em ${describeThemeFocus(analysis.primaryTheme)} na fase ${cultureStage}, com prioridade comercial em ${analysis.prioridade}. A recomendação é conduzir por diagnóstico, valor total gerado e decisão técnico-econômica por hectare. ${yaraCultureAnchor}`,
    hipotesePrincipal:
      `Hipótese principal: a operação está deixando resultado na mesa por critério de decisão incompleto (foco excessivo em custo inicial), e pode recuperar valor ao alinhar técnica + ROI por hectare.`,
    problemasOcultos: [
      'Critério de compra orientado por preço de entrada, sem leitura do custo total do ciclo.',
      'Baixa conexão entre decisão técnica e impacto em margem, risco e previsibilidade.',
      'Potencial subutilização de tecnologia/manejo por falta de narrativa econômica clara.'
    ],
    impactoAgronomico: [
      `Maior consistência do manejo em ${describeThemeFocus(analysis.primaryTheme)} e menor variabilidade entre talhões.`,
      `Melhor resposta técnica na fase ${cultureStage}, protegendo o potencial produtivo.`,
      'Redução de perdas por decisão tardia e execução desalinhada.'
    ],
    impactoEconomico: [
      'Proteção de margem por redução de ineficiência e risco operacional.',
      'Maior previsibilidade de resultado por hectare para tomada de decisão.',
      'Evolução de retorno por área sem depender de guerra de preços.',
      'Melhor captura de valor com nutrição premium, eficiência de uso de nutrientes e estabilidade do sistema produtivo.'
    ],
    leituraPerfilProdutor:
      `${profileText[producerProfile]} Nível tecnológico inferido: ${techLevel}. Sensibilidade a preço: ${priceSensitivity}. Resistência a soluções de maior valor agregado: ${premiumResistance}.`,
    estrategiaAbordagem:
      `${abordagemPorPreco[priceSensitivity]} ${abordagemPorResistencia[premiumResistance]} ${playerHooks.opcProcess[0] ?? ''}`.trim(),
    valueNarrative,
    agronomicArgument,
    riskNarrative,
    productivityNarrative,
    profitabilityNarrative,
    roiNarrative,
    conversationGuidance,
    decisionPlans: strategyContext?.decisionPlans ?? [],
    nextStepEngine: buildNextStepEngine(memoryContext ?? buildScenarioMemory(scenario, analysis)),
    senoideVendaValor: {
      cenario: `Abrir pela realidade da conta: ${storyline.openingMove}.`,
      problema: `Trabalhar o problema central deste caso: ${storyline.centralChallenge}.`,
      reframe:
        `Trazer uma nova perspectiva: ${storyline.decisionTrap}.`,
      impacto:
        `Traduzir isso em impacto técnico e econômico: ${storyline.agronomicImpact}; ${storyline.economicImpact}.`,
      solucao:
        `Conectar a solução de maior valor agregado da ${player} a esta direção de conversa: ${storyline.valueAnchor}.`,
      compromisso:
        `Fechar próximo passo assim: ${storyline.commitmentAnchor}.`
    },
    reframeChallenger:
      `Nova perspectiva para a conversa: ${storyline.decisionTrap}. O ponto é decidir de um jeito que proteja resultado, margem e previsibilidade. ${playerHooks.epaEducar[0] ?? ''}`.trim(),
    solucoesPremiumRecomendadas:
      recommendedLines.length > 0
        ? recommendedLines.map((line) => {
            if (player === 'Yara') {
              return `${line}: ${YARA_LINE_ROLE_MAP[line as keyof typeof YARA_LINE_ROLE_MAP]?.role ?? 'linha estratégica'} (${YARA_LINE_ROLE_MAP[line as keyof typeof YARA_LINE_ROLE_MAP]?.use ?? 'uso recomendado conforme cenário'})`;
            }

            if (player === 'Corteva') {
              const match = cortevaByScenario.find((item) => item.label === line);
              return `${line}: ${match?.value.slice(0, 2).join(' | ') ?? 'solução de sistema orientada a proteção de potencial e margem'}`;
            }

            return `${line}: linha estratégica para este cenário`;
          })
        : [`Solução de maior valor agregado ${player}: combinar recomendação técnica com critério econômico para sustentação da decisão.`],
    logicaRoi: {
      cenarioConservador: roiText(ROI_SCENARIO_MULTIPLIERS.conservador, 'Cenário conservador'),
      cenarioModerado: roiText(ROI_SCENARIO_MULTIPLIERS.moderado, 'Cenário moderado'),
      cenarioAgressivo: roiText(ROI_SCENARIO_MULTIPLIERS.agressivo, 'Cenário agressivo')
    },
    proximosPassos: [
      'Validar em área menor com indicador de produtividade, risco e custo por hectare.',
      'Definir em reunião o critério de decisão final (técnico + econômico + execução).',
      'Agendar retorno com data e responsável para decisão de escala.',
      'Reforçar na próxima visita os pilares Yara na conversa: ciência agronômica, sustentabilidade prática, produtividade, margem por hectare e previsibilidade.'
    ]
  };
};

const buildExecutiveFocus = (analysis: ScenarioAnalysis): string[] => {
  const context = CULTURA_CONTEXT[analysis.cultura];
  const base = `Conduzir a conversa com foco em margem, risco e previsibilidade na ${context.nome}.`;

  if (analysis.prioridade === 'competicao') {
    return pick(
      composeUnique(
        [
          `Tirar a conversa da comparação simples de preço e levar para valor total na ${context.nome}.`,
          'Combinar um critério de decisão com resultado, impacto econômico e segurança de execução.',
          'Sair com um avanço concreto, com prazo e responsável.'
        ],
        3
      ),
      3
    );
  }

  if (analysis.prioridade === 'expansao') {
    return pick(
      composeUnique(
        [
          `Usar a confiança já construída para ampliar espaço na ${context.nome}.`,
          'Definir uma etapa de expansão com indicador de valor combinado com o produtor.',
          'Ampliar só onde fizer sentido para o resultado da fazenda.'
        ],
        3
      ),
      3
    );
  }

  if (analysis.prioridade === 'retencao') {
    return pick(
      composeUnique(
        [
          'Usar o resultado já entregue para proteger a conta e abrir o próximo passo.',
          'Mapear o próximo ganho de valor para não deixar a renovação cair em preço.',
          'Sair com um plano de continuidade que preserve resultado.'
        ],
        3
      ),
      3
    );
  }

  if (analysis.prioridade === 'diagnostico') {
    return pick(
      composeUnique(
        [
          'Fazer um diagnóstico claro do que está travando resultado.',
          'Gerar confiança com leitura prática da área e impacto econômico simples.',
          'Fechar o próximo encontro com os dados mínimos já combinados.'
        ],
        3
      ),
      3
    );
  }

  return pick(
    composeUnique(
      [
        base,
        'Levar a conversa do preço para custo total e resultado da safra.',
        'Garantir um próximo passo concreto, com data e responsável.'
      ],
      3
    ),
    3
  );
};

const sentenceLower = (text: string): string => {
  const clean = text.trim().replace(/[?!.]+$/g, '');
  if (!clean) return '';
  return clean.charAt(0).toLowerCase() + clean.slice(1);
};

type ScenarioIntent = {
  desiredShift: string | null;
  desiredCommitment: string | null;
  painSignal: string | null;
  contextSignal: string | null;
};

type ScenarioStoryline = {
  centralChallenge: string;
  decisionTrap: string;
  desiredShift: string;
  agronomicImpact: string;
  economicImpact: string;
  openingMove: string;
  processAnchor: string;
  proofAnchor: string;
  commitmentAnchor: string;
  valueAnchor: string;
};

const cleanIntentChunk = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const cleaned = value
    .replace(/\s+/g, ' ')
    .replace(/^[,;:\-\s]+/, '')
    .replace(/[.?!]+$/g, '')
    .trim();
  return cleaned || null;
};

const extractScenarioIntent = (scenario: string): ScenarioIntent => {
  const compact = scenario.replace(/\s+/g, ' ').trim();
  const contextSignal = cleanIntentChunk(compact.split(/[.?!]/)[0]?.slice(0, 180) ?? null);
  const shiftMatch = compact.match(/\b(?:quero|preciso)\s+(?:conduzir|levar)\s+para\s+([^.;]+)/i);
  const closeMatch = compact.match(/\bfechar\s+(?:um|uma|o|a)?\s*([^.;]+)/i);
  const weakPainPattern = /^(de forma pontual|pontual|como esta|manter como esta|isso|o mesmo)$/i;
  const painCandidates = [...compact.matchAll(/\b(?:mas|por[eé]m)\s+([^.;]+)/gi)]
    .map((match) => cleanIntentChunk(match[1]))
    .filter((value): value is string => Boolean(value))
    .filter((value) => value.length >= 18 && !weakPainPattern.test(value));

  return {
    desiredShift: cleanIntentChunk(shiftMatch?.[1] ?? null),
    desiredCommitment: cleanIntentChunk(closeMatch?.[1] ?? null),
    painSignal: painCandidates[0] ?? null,
    contextSignal
  };
};

const openSpinQuestion = (question: string): string => {
  const trimmed = question.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  const withoutMark = trimmed.replace(/[?]+$/g, '');
  const normalizedStart = normalizeText(withoutMark);
  const yesNoStart = /^(voce|voces|tem|ha|existe|ja|foi|esta|estao|consegue|conseguem|pode|podem|deve|devem)\b/i;

  // Preserve naturally open time-framed questions.
  if (/^ha quanto tempo\b/i.test(normalizedStart)) {
    return `${withoutMark}?`;
  }

  if (/^(voce|voces)\b/i.test(normalizedStart)) {
    const converted = withoutMark.replace(/^(Você|Voce|Vocês|Voces)\b/i, (match) =>
      /s$/i.test(match) ? 'Como vocês' : 'Como você'
    );
    return `${converted}?`;
  }

  if (yesNoStart.test(normalizedStart)) {
    return `Como ${sentenceLower(withoutMark)}?`;
  }

  return trimmed.endsWith('?') ? trimmed : `${trimmed}?`;
};

const finalizeSpinQuestions = (questions: string[]): string[] =>
  questions
    .map((q) => openSpinQuestion(q))
    .map((q) => q.trim())
    .filter((q) => q.length > 3);

const detectScenarioChallengeFocus = (normalizedScenario: string, theme: Theme): string => {
  if (
    /fungicida|inseticida|fitossanitari|controle de pragas/.test(normalizedScenario) &&
    /desconto|preco|barato|nao pode subir investimento/.test(normalizedScenario)
  ) {
    return 'tirar a conversa do desconto e levar para controle, risco e custo total';
  }

  if (/dessec|pre[-\s]?plantio|pre[-\s]?colheita/.test(normalizedScenario)) {
    return 'melhorar a dessecação e proteger a janela operacional';
  }
  if (/clima|instavel|veranico|seca|chuva/.test(normalizedScenario)) {
    return 'reduzir o risco da área diante do clima';
  }
  if (/atraso|janela|tarde|urgente|prazo/.test(normalizedScenario)) {
    return 'evitar atraso e proteger a execução na janela certa';
  }
  if (/preco|desconto|barato|cotacao/.test(normalizedScenario)) {
    return 'tirar a decisão do preço e levar para custo total e resultado';
  }
  if (/resisten|cetic|nao acredita|duvida/.test(normalizedScenario)) {
    return 'reduzir a resistência com validação prática';
  }

  const byTheme: Record<Theme, string> = {
    adubo: 'melhorar a eficiência da adubação e o retorno por hectare',
    defensivo: 'ganhar controle com menos risco para a operação',
    semente: 'acertar melhor a escolha do material',
    biologico: 'usar o biológico com mais segurança e consistência',
    irrigacao: 'usar água e nutriente com mais precisão',
    maquinario: 'melhorar a execução da operação',
    servicos: 'usar melhor o suporte técnico na tomada de decisão',
    geral: 'melhorar o resultado técnico e econômico da operação'
  };

  return byTheme[theme];
};

const detectProductSalesChallenge = (
  analysis: ScenarioAnalysis,
  normalizedScenario: string,
  theme: Theme,
  productFocus?: ProductIntelligence
): string => {
  const productLabel =
    productFocus?.produto ??
    (theme === 'adubo'
      ? 'adubação'
      : theme === 'defensivo'
        ? 'defensivos'
        : theme === 'semente'
          ? 'sementes'
          : theme === 'biologico'
            ? 'biológicos'
            : theme === 'maquinario'
              ? 'máquinas e tecnologia'
              : theme === 'servicos'
                ? 'serviço técnico'
                : 'solução proposta');

  const priceBarrier = /desconto|preco|barato|nao pode subir investimento|cotacao/.test(normalizedScenario);
  const trustBarrier = /desconfi|nao acredita|resisten|sempre fez assim/.test(normalizedScenario);
  const executionBarrier = /atras|timing|falha|retrabalho|execucao|aplicacao/.test(normalizedScenario);

  if (priceBarrier && executionBarrier) {
    return `defender ${productLabel} sem deixar a conversa virar só preço`;
  }
  if (priceBarrier) {
    return `mostrar por que ${productLabel} deve ser comparado por resultado, e não só por preço`;
  }
  if (trustBarrier) {
    return `reduzir a resistência à proposta de ${productLabel} com teste e leitura prática`;
  }
  if (executionBarrier) {
    return `ligar ${productLabel} à execução correta no campo`;
  }
  if (analysis.foco === 'preco') {
    return `tirar ${productLabel} da comparação por preço e levar para retorno por hectare`;
  }

  return `ajudar o produtor a ver valor em ${productLabel} com argumento técnico e econômico claro`;
};

const buildScenarioExecutionContext = (
  analysis: ScenarioAnalysis,
  scenario: string,
  productFocus?: ProductIntelligence
): {
  scenarioContext: string;
  challengeFocus: string;
  productSalesChallenge: string;
  stageText: string;
  areaText: string | null;
  prazoText: string | null;
} => {
  const normalizedScenario = normalizeText(scenario);
  const conversationTheme = resolveConversationTheme(analysis, productFocus);
  const themeFocus = describeThemeFocus(conversationTheme);
  const areaText = scenario.match(/\b\d{1,5}(?:[.,]\d+)?\s*ha\b/i)?.[0] ?? null;
  const prazoText = scenario.match(/\b\d{1,3}\s*(dias?|semanas?|mes(?:es)?)\b/i)?.[0] ?? null;
  const stageMap: Record<string, string> = {
    plantio: 'janela de plantio',
    vegetativo: 'fase vegetativa',
    reprodutivo: 'fase reprodutiva',
    enchimento: 'enchimento de grãos',
    fertirrigacao: 'operação irrigada/fertirrigada'
  };
  const stageText = stageMap[inferCultureStage(normalizedScenario)] ?? 'momento crítico do ciclo';
  const challengeFocus = detectScenarioChallengeFocus(normalizedScenario, conversationTheme);
  const productSalesChallenge = detectProductSalesChallenge(analysis, normalizedScenario, conversationTheme, productFocus);
  const contextParts = [
    `foco em ${themeFocus}`,
    `cultura ${analysis.cultura}`,
    stageText,
    areaText ? `área ${areaText}` : null,
    prazoText ? `prazo ${prazoText}` : null
  ].filter(Boolean);

  return {
    scenarioContext: contextParts.join(', '),
    challengeFocus,
    productSalesChallenge,
    stageText,
    areaText,
    prazoText
  };
};

const parseAreaHectares = (areaText: string | null): number | null => {
  if (!areaText) return null;
  const match = areaText.match(/(\d{1,5}(?:[.,]\d+)?)/);
  if (!match) return null;
  const value = Number(match[1].replace('.', '').replace(',', '.'));
  return Number.isFinite(value) ? value : null;
};

const buildScenarioStoryline = (
  analysis: ScenarioAnalysis,
  scenario: string,
  productFocus?: ProductIntelligence,
  decisionContext?: ReturnType<typeof buildKnowledgeDecisionContext>,
  strategyContext?: ReturnType<typeof buildStrategyDecisionContext>,
  memoryContext?: ReturnType<typeof buildScenarioMemory>
): ScenarioStoryline => {
  const metricFocus = metricByCulture(analysis.cultura);
  const normalizedScenario = normalizeText(scenario);
  const scenarioIntent = extractScenarioIntent(scenario);
  const executionContext = buildScenarioExecutionContext(analysis, scenario, productFocus);
  const areaText = executionContext.areaText;
  const areaScope = recommendPilotAreaText(areaText);
  const problemType = decisionContext?.problemType ?? detectProblemType(normalizedScenario);
  const mainObjection = decisionContext?.objections[0]?.label ?? memoryContext?.previousObjection ?? null;
  const conversationTheme = describeThemeFocus(resolveConversationTheme(analysis, productFocus));
  const centralChallenge =
    cleanIntentChunk(scenarioIntent.painSignal) ??
    (problemType === 'price_discussion'
      ? 'a conversa está muito presa ao preço de entrada'
      : problemType === 'low_efficiency'
        ? `a conta ainda perde eficiência em ${conversationTheme}`
        : problemType === 'risk_exposure'
          ? 'o produtor está exposto a risco demais para o retorno esperado'
          : executionContext.challengeFocus);

  const decisionTrap =
    mainObjection === 'price too high' || /preco|desconto|barato|cotacao/.test(normalizedScenario)
      ? 'comparar só o preço de entrada e deixar de lado custo total e resultado final'
      : /cooperativa|concorrente|distribuidor/.test(normalizedScenario)
        ? 'manter a decisão no hábito ou na relação atual sem medir o que isso custa no campo'
        : /tarde|atras|janela|urgente/.test(normalizedScenario)
          ? 'deixar a decisão para depois e perder qualidade de execução'
          : 'discutir solução antes de alinhar qual problema precisa ser resolvido';

  const desiredShift =
    cleanIntentChunk(scenarioIntent.desiredShift) ??
    (analysis.foco === 'preco'
      ? `resultado por hectare, risco e ${metricFocus}`
      : `critério técnico e econômico para decidir melhor`);

  const agronomicImpact =
    problemType === 'wrong_fertilization' || problemType === 'low_efficiency'
      ? `isso pode tirar resposta do manejo, aumentar variação entre áreas e reduzir eficiência em ${conversationTheme}`
      : problemType === 'risk_exposure'
        ? 'isso aumenta a chance de erro de manejo, atraso e perda de estabilidade na lavoura'
        : `isso pode travar produtividade, consistência e execução em ${conversationTheme}`;

  const economicImpact =
    analysis.foco === 'preco'
      ? `isso pressiona ${metricFocus}, margem e previsibilidade porque a compra parece barata, mas o ciclo pode sair caro`
      : `isso afeta ${metricFocus}, margem e segurança da decisão ao longo da safra`;

  const openingMove =
    memoryContext?.meetingType === 'recovery meeting'
      ? 'abrir reconhecendo o que não funcionou antes e mostrar que a conversa agora vai ser mais objetiva'
      : strategyContext?.difficultyLevel === 'price pressure meeting'
        ? 'abrir ouvindo o que está pesando na decisão para não cair cedo demais em discussão de preço'
        : 'abrir pela realidade da área e pelo que mais está travando resultado hoje';

  const processAnchor =
    `começar por ${centralChallenge}, mostrar como ${decisionTrap} pesa no campo e levar a conversa para ${desiredShift}`;

  const proofAnchor = productFocus
    ? `provar isso com uma entrada controlada de ${productFocus.produto}, comparando área atual versus área ajustada e medindo resposta em ${metricFocus}`
    : `provar isso com uma área inicial bem definida, comparando manejo atual versus manejo ajustado e medindo resposta em ${metricFocus}`;

  const commitmentAnchor =
    cleanIntentChunk(scenarioIntent.desiredCommitment) ??
    `fechar uma validação ${areaScope}, com indicador simples, data de leitura e regra clara para ampliar ou ajustar`;

  const valueAnchor = productFocus
    ? `${productFocus.produto} só deve entrar na conversa como resposta prática para ${centralChallenge}, nunca como ponto de partida`
    : `a solução deve aparecer só depois que o produtor enxergar com clareza o custo de manter ${decisionTrap}`;

  return {
    centralChallenge,
    decisionTrap,
    desiredShift,
    agronomicImpact,
    economicImpact,
    openingMove,
    processAnchor,
    proofAnchor,
    commitmentAnchor,
    valueAnchor
  };
};

const recommendPilotAreaText = (areaText: string | null): string => {
  const hectares = parseAreaHectares(areaText);

  if (!hectares) {
    return 'em uma área piloto definida com o produtor';
  }

  if (hectares <= 20) {
    return `em ${areaText}`;
  }

  const minPilot = Math.max(5, Math.round(hectares * 0.3));
  const maxPilot = Math.max(minPilot + 1, Math.round(hectares * 0.5));

  return `em uma área inicial de ${minPilot} a ${maxPilot} ha`;
};

const translateApproachLabel = (approach?: string): string | null => {
  if (!approach) return null;

  const map: Record<string, string> = {
    'SPIN mode': 'abordagem consultiva com perguntas',
    'Challenger mode': 'abordagem de reframe com provocação respeitosa',
    'Consultative mode': 'abordagem consultiva',
    'Technical mode': 'abordagem técnica',
    'Relationship mode': 'abordagem de relacionamento',
    'Recovery mode': 'abordagem de recuperação de confiança',
    'Closing mode': 'abordagem de fechamento'
  };

  return map[approach] ?? approach;
};

const translateConversationPath = (path?: string): string => {
  const map: Record<string, string> = {
    'Path A — collaborative dialogue': 'começar ouvindo e entendendo o cenário',
    'Path B — reframe and provoke': 'mudar o critério da conversa com provocação respeitosa',
    'Path C — technical proof': 'provar com argumento técnico e caso de campo',
    'Path D — value comparison': 'comparar valor e não só preço',
    'Path E — risk discussion': 'mostrar risco de manter o modelo atual',
    'Path F — ROI discussion': 'levar a conversa para retorno por hectare',
    'Path G — decision guidance': 'conduzir para decisão com próximo passo claro'
  };

  return map[path ?? ''] ?? 'conduzir com clareza para o próximo passo';
};

const buildFirstCommitmentByScenario = (
  analysis: ScenarioAnalysis,
  productFocus: ProductIntelligence | undefined,
  areaText: string | null
): string => {
  const areaScope = recommendPilotAreaText(areaText);

  if (productFocus) {
    return `Fechar um primeiro teste com ${productFocus.produto} ${areaScope}, com critério simples de leitura antes de ampliar.`;
  }

  if (analysis.primaryTheme === 'semente') {
    return `Fechar uma primeira área de sementes ${areaScope}, com meta de estande, vigor e resultado por hectare.`;
  }

  if (analysis.primaryTheme === 'defensivo') {
    return `Fechar um ajuste de manejo ${areaScope}, com leitura de controle e impacto no risco da área.`;
  }

  if (analysis.primaryTheme === 'adubo') {
    return `Fechar uma recomendação de adubação ${areaScope}, com leitura de resposta e retorno por hectare.`;
  }

  if (analysis.primaryTheme === 'maquinario') {
    return `Fechar uma ação prática ${areaScope}, como calibração ou ajuste de operação, com ganho fácil de medir.`;
  }

  if (analysis.primaryTheme === 'servicos') {
    return `Fechar um acompanhamento inicial ${areaScope}, com plano simples e indicador de resultado.`;
  }

  return `Fechar uma primeira ação ${areaScope}, para provar valor sem aumentar demais o risco da decisão.`;
};

const isCooperativeLoyaltyScenario = (analysis: ScenarioAnalysis, normalizedScenario: string): boolean => {
  if (!analysis.tags.includes('cooperativa')) return false;

  return /fiel|so compra|somente compra|sempre compra|outra cooperativa|cooperativa concorrente|nao quer mudar|resistente/.test(
    normalizedScenario
  );
};

const buildOpc = (
  analysis: ScenarioAnalysis,
  playerHooks: StrategicHooks,
  productFocus: ProductIntelligence | undefined,
  scenario: string,
  storyline: ScenarioStoryline,
  strategyContext?: ReturnType<typeof buildStrategyDecisionContext>,
  memoryContext?: ReturnType<typeof buildScenarioMemory>
) => {
  const metricFocus = metricByCulture(analysis.cultura);
  const scenarioName = inferAgroScenarioName(scenario);
  const scenarioPlaybook = getAgroScenarioPlaybook(scenarioName);
  const scenarioOpcPlaybook = getAgroScenarioOpcPlaybook(scenarioName);
  const normalizedScenario = normalizeText(scenario);
  const coopLoyaltyScenario = isCooperativeLoyaltyScenario(analysis, normalizedScenario);
  const { scenarioContext, challengeFocus, areaText, prazoText } = buildScenarioExecutionContext(
    analysis,
    scenario,
    productFocus
  );
  const scenarioIntent = extractScenarioIntent(scenario);

  const processChallengeResumo = sentenceLower(storyline.centralChallenge);
  const implicationResumo = sentenceLower(storyline.economicImpact);
  const commitmentResumo = sentenceLower(storyline.commitmentAnchor);

  if (coopLoyaltyScenario) {
    const objetivo = pick(
      composeUnique(
        [
          'Entender por que ele segue comprando na cooperativa hoje.',
          'Entender de onde vem a percepção de que a Yara está cara neste momento.',
          'Abrir espaço para um primeiro teste pequeno e de baixo risco.'
        ],
        3
      ),
      3
    );

    const processo = pick(
      composeUnique(
        [
          'Comece ouvindo o histórico e o que ele valoriza na cooperativa atual.',
          `Valide o problema sem confronto: ${processChallengeResumo || 'hoje ele ainda não vê motivo claro para mudar'}.`,
          'Pergunte o que ele manteria, o que gostaria de melhorar e onde toparia testar algo novo.',
          'Mostre como a Yara pode entrar junto com a cooperativa, sem ruptura, começando por um ponto específico e de menor risco.',
          productFocus
            ? `Use ${productFocus.produto} como porta de entrada para provar valor no campo.`
            : 'Use uma recomendação de adubação ou fertilizante com leitura simples e critério claro de sucesso.',
          'Conduza a conversa com segurança, simplicidade e foco no resultado da área.'
        ],
        6
      ),
      6
    );

    const compromisso = pick(
      composeUnique(
        [
          `Fechar um primeiro teste ${recommendPilotAreaText(areaText)} com indicador de validação bem definido.`,
          'Agendar o retorno para ler o resultado junto com o produtor e decidir se faz sentido ampliar.',
          'Deixar combinado qual resultado precisa aparecer para seguir para a próxima etapa.'
        ],
        3
      ),
      3
    );

    return { objetivo, processo, compromisso };
  }

  const objectivePool = selectRelevantUnique(
    [
      `Avançar em um ponto real desta conversa: ${storyline.centralChallenge}.`,
      `Levar a conversa para ${storyline.desiredShift}.`,
      ...(scenarioIntent.desiredShift ? [`Levar a conversa para ${scenarioIntent.desiredShift}.`] : []),
      `Ajudar o produtor a enxergar o que está pesando no resultado da área hoje.`,
      `Avançar na solução de ${challengeFocus}, olhando a realidade desta conta: ${scenarioContext}.`,
      ...(memoryContext?.previousResult ? [`Considerar o que aconteceu antes nesta conta: ${memoryContext.previousResult}.`] : []),
      ...(scenarioOpcPlaybook?.objetivo ? [scenarioOpcPlaybook.objetivo] : []),
      ...buildExecutiveFocus(analysis)
    ],
    4,
    scenario,
    storyline.centralChallenge,
    storyline.desiredShift,
    memoryContext?.previousResult
  );

  const processPool = selectRelevantUnique(
    [
      `Começar assim: ${storyline.openingMove}.`,
      `Conduzir a conversa para ${storyline.processAnchor}.`,
      ...(strategyContext
        ? [`Conduzir por ${translateApproachLabel(strategyContext.recommendedApproach)}.`]
        : []),
      ...(strategyContext?.conversationPath?.length
        ? [`Caminho sugerido: ${strategyContext.conversationPath.slice(0, 2).map(translateConversationPath).join(' e ')}.`]
        : []),
      ...(scenarioIntent.painSignal ? [`Começar pela dor principal: ${scenarioIntent.painSignal}.`] : []),
      'Abrir ouvindo e confirmando o que mais pesa hoje para o produtor.',
      `Aprofundar a situação atual a partir deste ponto: ${processChallengeResumo}.`,
      'Explorar onde o problema realmente começa e onde ele pesa mais no resultado.',
      implicationResumo ? `Quantificar o impacto: ${implicationResumo}.` : `Traduzir o problema em impacto sobre ${metricFocus}.`,
      `Mostrar o impacto de forma simples: ${storyline.agronomicImpact}.`,
      `Levar a conversa para resultado e não só para condição comercial: ${storyline.economicImpact}.`,
      'Só depois disso, levar para a recomendação e para a forma de executar no campo.',
      'Confirmar quem decide, quem participa e o que pode travar o avanço.',
      ...(memoryContext?.previousObjection ? [`Antecipar a objeção que já apareceu antes: ${memoryContext.previousObjection}.`] : []),
      ...(scenarioPlaybook?.opcProcesso ? [scenarioPlaybook.opcProcesso] : []),
      ...(scenarioOpcPlaybook?.processo ? [scenarioOpcPlaybook.processo] : []),
      ...playerHooks.opcProcess
    ],
    6,
    scenario,
    storyline.centralChallenge,
    storyline.agronomicImpact,
    storyline.economicImpact,
    memoryContext?.previousObjection
  );

  const firstCommitment = buildFirstCommitmentByScenario(analysis, productFocus, areaText);
  const commitmentsPool = selectRelevantUnique(
    [
      `Fechar um próximo passo coerente com a conversa: ${storyline.commitmentAnchor}.`,
      ...(scenarioIntent.desiredCommitment ? [`Fechar ${scenarioIntent.desiredCommitment}.`] : []),
      firstCommitment,
      `Combinar a validação desta forma: ${storyline.proofAnchor}.`,
      areaText
        ? `Definir uma área menor para validação, com indicador e data de leitura já combinados.`
        : 'Definir área piloto, indicador e data de leitura já nesta reunião.',
      prazoText
        ? `Sair com responsável e prazo claro, respeitando a janela já citada (${prazoText}).`
        : 'Sair com responsável, prazo e regra simples para o próximo passo.',
      commitmentResumo
        ? `Deixar claro o critério de decisão: ${commitmentResumo}.`
        : 'Deixar claro qual número vai definir se avança ou não.',
      analysis.foco === 'preco' || analysis.prioridade === 'competicao'
        ? 'Se o preço voltar para a mesa, comparar por custo total e risco antes de falar em condição comercial.'
        : 'Fechar o próximo passo com compromisso simples de execução e leitura de resultado.',
      ...(scenarioOpcPlaybook?.compromisso ? [scenarioOpcPlaybook.compromisso] : [])
    ],
    4,
    scenario,
    storyline.commitmentAnchor,
    storyline.proofAnchor,
    areaText,
    prazoText
  );

  return {
    objetivo: pick(objectivePool, 3),
    processo: pick(processPool, 6),
    compromisso: pick(commitmentsPool, 3)
  };
};

const buildScenarioSpinAnchors = (
  analysis: ScenarioAnalysis,
  scenario: string,
  productFocus?: ProductIntelligence
): { situacao: string; problema: string; implicacao: string; necessidadeSolucao: string } => {
  const normalized = normalizeText(scenario);
  const activeTheme = resolveConversationTheme(analysis, productFocus);

  const isDessecacaoContext =
    /dessec|pre[-\s]?colheita|pre[-\s]?plantio/.test(normalized) || productFocus?.produto.toLowerCase() === 'gapper';

  if (isDessecacaoContext) {
    return {
      situacao:
        'Como vocês têm feito a dessecação até aqui e quais critérios definem o momento e a forma de aplicação?',
      problema:
        'Onde a estratégia atual de dessecação ainda traz variação de resultado, atraso de janela ou retrabalho?',
      implicacao:
        'Quando a dessecação não acontece no momento certo, qual impacto aparece na produtividade, no risco operacional e na margem?',
      necessidadeSolucao:
        'Que condição de resultado você precisa ver para concordar em avançar com um ajuste de manejo na dessecação?'
    };
  }

  if (activeTheme === 'adubo') {
    return {
      situacao:
        'Como vocês têm feito hoje a adubação (produto, dose e momento) e o que pesa mais nessa decisão no dia a dia?',
      problema:
        'Em quais áreas a estratégia atual de adubação ainda não está entregando o retorno esperado por hectare?',
      implicacao:
        'Quando a adubação não converte em resultado no talhão, qual impacto aparece em margem, produtividade e previsibilidade?',
      necessidadeSolucao:
        'Qual condição de resultado precisa ficar clara para você concordar em ajustar o manejo de adubação?'
    };
  }

  if (activeTheme === 'defensivo') {
    const isFungicideInsecticideDiscountCase =
      /fungicida|inseticida|fitossanitari|controle de pragas/.test(normalized) &&
      /desconto|preco|barato|nao pode subir investimento/.test(normalized);

    if (isFungicideInsecticideDiscountCase) {
      return {
        situacao:
          'Como vocês definem hoje o momento da aplicação de fungicida e inseticida, e o que mais pesa na escolha: preço, eficácia ou risco de falha?',
        problema:
          'Onde a pressão por desconto em fungicida/inseticida já trouxe retrabalho, falha de controle ou insegurança no timing?',
        implicacao:
          'Quando a decisão atrasa ou entra produto pelo menor preço, qual impacto aparece em custo total, risco operacional e produtividade final?',
        necessidadeSolucao:
          'Que critério técnico-econômico precisa ficar acordado hoje para fechar um ajuste de programa com segurança?'
      };
    }

    return {
      situacao:
        'Como vocês têm conduzido hoje o manejo de defensivos (programa, momento e critério de escolha)?',
      problema:
        'Onde o manejo atual ainda gera falha de controle, retrabalho ou custo acima do esperado?',
      implicacao:
        'Se esse padrão continuar no ciclo, qual impacto direto você projeta em risco operacional e margem da fazenda?',
      necessidadeSolucao:
        'Que evidência de campo você precisa ver para concordar com um ajuste de programa e avançar com segurança?'
    };
  }

  if (analysis.primaryTheme === 'semente') {
    return {
      situacao:
        'Como vocês têm escolhido hoje sementes/híbridos por ambiente de produção e qual critério mais pesa na decisão final?',
      problema:
        'Em quais áreas o material atual ainda limita estabilidade, teto produtivo ou qualidade de estabelecimento?',
      implicacao:
        'Quando a genética fica desalinhada com o ambiente, qual impacto aparece em produtividade e retorno por hectare?',
      necessidadeSolucao:
        'Que validação prática você precisa para concordar com um ajuste de material na próxima janela?'
    };
  }

  if (activeTheme === 'maquinario') {
    return {
      situacao:
        'Como vocês têm usado hoje máquinas e implementos no campo e quais tecnologias embarcadas realmente entram na rotina?',
      problema:
        'Onde a operação ainda perde eficiência por calibração, baixa adoção tecnológica ou falha de execução?',
      implicacao:
        'Se isso continuar, qual impacto aparece em custo operacional, produtividade e previsibilidade da safra?',
      necessidadeSolucao:
        'Qual melhoria operacional precisa ficar comprovada para você concordar com a decisão de investimento?'
    };
  }

  if (analysis.primaryTheme === 'irrigacao') {
    return {
      situacao:
        'Como vocês têm feito hoje o manejo de irrigação e quais critérios definem prioridade de área e momento?',
      problema:
        'Onde o manejo atual ainda gera variação de resultado, desperdício de recurso ou risco de estresse da cultura?',
      implicacao:
        'Se esse padrão continuar, qual impacto econômico aparece em custo, produtividade e estabilidade da operação?',
      necessidadeSolucao:
        'Que resultado objetivo você precisa ver para concordar com a mudança de estratégia de irrigação?'
    };
  }

  if (activeTheme === 'biologico') {
    return {
      situacao:
        'Como vocês têm usado hoje biológicos na operação e como validam consistência de resultado em campo?',
      problema:
        'Onde a adoção atual ainda gera dúvida de posicionamento, execução ou retorno econômico?',
      implicacao:
        'Se essa incerteza continuar, qual impacto aparece em eficiência de manejo e margem do sistema?',
      necessidadeSolucao:
        'Que critério de validação você precisa acordar para avançar com mais segurança no uso de biológicos?'
    };
  }

  if (activeTheme === 'servicos') {
    return {
      situacao:
        'Como vocês têm estruturado hoje o suporte técnico e o acompanhamento de campo ao longo do ciclo?',
      problema:
        'Onde esse suporte ainda não está virando decisão mais rápida e resultado econômico na fazenda?',
      implicacao:
        'Se isso continuar, qual custo aparece em decisão tardia, retrabalho e perda de oportunidade?',
      necessidadeSolucao:
        'Que modelo de atendimento faria você concordar com um avanço de escopo nesta parceria?'
    };
  }

  const themeLabel =
    analysis.specificTerms.length ? analysis.specificTerms.slice(0, 2).join(' e ') : describeThemeFocus(analysis.primaryTheme);

  return {
    situacao:
      `Como vocês têm conduzido hoje as decisões ligadas a ${themeLabel} e quais critérios mais pesam na prática?`,
    problema:
      'Onde o modelo atual ainda trava resultado: execução de campo, consistência técnica ou critério de decisão?',
    implicacao:
      'Se esse padrão continuar nas próximas semanas, qual impacto direto aparece em margem, produtividade e previsibilidade?',
    necessidadeSolucao:
      'Qual condição mínima de resultado precisa ficar clara para você concordar em avançar com a proposta?'
  };
};

const buildScenarioSpinFlow = (
  analysis: ScenarioAnalysis,
  scenario: string,
  storyline: ScenarioStoryline,
  opc: PreparationResult['opc'],
  memoryContext?: ReturnType<typeof buildScenarioMemory>
): SpinBlock => {
  const normalized = normalizeText(scenario);
  const cultureName = CULTURA_CONTEXT[analysis.cultura].nome;
  const areaText = scenario.match(/\b\d{1,5}(?:[.,]\d+)?\s*ha\b/i)?.[0] ?? 'a área';
  const hasCooperative = /cooperativa/.test(normalized);
  const hasFertilizerContext = analysis.primaryTheme === 'adubo' || /adubo|fertiliz|nutricao|nutriente/.test(normalized);
  const hasPricePerHectare = /preco por hectare|custo por hectare/.test(normalized);
  const hasMarginPressure = /margem apert|margem pression|rentabilidade apert/.test(normalized);
  const hasYieldLoss = /perda de produtividade|queda de produtividade|produtividade menor|perdeu produtividade/.test(normalized);
  const hasSandyPlots = /arenos/.test(normalized);
  const previousObjection = memoryContext?.previousObjection;
  const objectiveText = opc.objetivo[0] ?? storyline.desiredShift;
  const commitmentText = opc.compromisso[0] ?? storyline.commitmentAnchor;

  const situacao: string[] = [];
  const problema: string[] = [];
  const implicacao: string[] = [];
  const necessidadeSolucao: string[] = [];

  situacao.push(`Como o senhor está vendo hoje o resultado da ${cultureName} nessa área de ${areaText}?`);

  if (hasMarginPressure) {
    situacao.push('Como o senhor está vendo hoje o aperto de margem na fazenda?');
  }

  if (hasCooperative) {
    situacao.push('O que o senhor mais valoriza hoje no trabalho da cooperativa com a fazenda?');
  }

  if (hasFertilizerContext) {
    situacao.push('Como o senhor costuma comparar hoje as opções de adubo ou fertilizante para fechar a recomendação da safra?');
  }

  if (hasSandyPlots) {
    situacao.push('O que aconteceu nos talhões mais arenosos nesta última safra e como o senhor está lendo isso hoje?');
  }

  if (previousObjection || hasPricePerHectare) {
    situacao.push('Quando a conversa vai para preço por hectare, como o senhor costuma fazer essa conta para decidir?');
  }

  if (hasPricePerHectare) {
    problema.push('Onde a comparação só por preço por hectare mais atrapalha a qualidade dessa decisão hoje?');
  } else {
    problema.push('Onde esse problema aparece com mais força hoje na fazenda?');
  }

  if (hasSandyPlots && hasYieldLoss) {
    problema.push('Nos talhões mais arenosos, o problema maior hoje está na resposta do manejo, na perda de produtividade ou na dificuldade de comparar alternativas do jeito certo?');
  }

  if (hasPricePerHectare) {
    problema.push('Quando a decisão fica muito presa ao preço por hectare, o que acaba ficando sem ser medido no resultado final da área?');
  }

  if (hasCooperative) {
    problema.push('O modelo atual com a cooperativa está resolvendo bem todas as áreas ou já existe algum ponto onde ele não entrega a mesma segurança?');
  }

  implicacao.push(`Se esse quadro continuar, como isso pesa em produtividade, margem e previsibilidade em ${cultureName}?`);

  if (hasYieldLoss) {
    implicacao.push('Se a perda de produtividade se repetir nos próximos ciclos, o que isso representa no resultado médio da fazenda?');
  }

  if (hasPricePerHectare) {
    implicacao.push('Se a comparação continuar sendo feita só por preço por hectare, qual o risco de economizar na compra e perder mais na colheita?');
    implicacao.push('Na conta final, quanto essa decisão só por preço pode tirar de margem e estabilidade da área?');
  }

  if (hasSandyPlots) {
    implicacao.push('Se os talhões mais arenosos continuarem respondendo abaixo do esperado, quanto isso contamina a média e a margem da área toda?');
  }

  necessidadeSolucao.push('Se nós trouxermos uma proposta com mais segurança de resultado e retorno por hectare, o que o senhor precisa ver para considerar esse avanço?');
  necessidadeSolucao.push('Se mostrarmos uma alternativa com mais segurança de resultado, o que precisa ficar claro para o senhor seguir adiante?');

  if (hasSandyPlots) {
    necessidadeSolucao.push('Se montarmos uma validação focada nos talhões mais arenosos, com critério simples de leitura, o que precisaria acontecer para o senhor aceitar esse próximo passo?');
  }

  if (hasPricePerHectare) {
    necessidadeSolucao.push('Se nós mostrarmos uma comparação por retorno e não só por preço por hectare, o que falta para o senhor se sentir seguro para avançar?');
  }

  necessidadeSolucao.push(`Se fizermos isso de forma prudente, com ${commitmentText.toLowerCase()}, o que mais precisa ficar combinado hoje?`);

  return {
    situacao: selectRelevantUnique(situacao, 4, scenario, storyline.centralChallenge, previousObjection),
    problema: selectRelevantUnique(problema, 4, scenario, storyline.centralChallenge, storyline.decisionTrap),
    implicacao: selectRelevantUnique(implicacao, 4, scenario, storyline.agronomicImpact, storyline.economicImpact),
    necessidadeSolucao: selectRelevantUnique(
      necessidadeSolucao,
      4,
      scenario,
      storyline.desiredShift,
      objectiveText,
      commitmentText
    )
  };
};

const buildSpin = (
  analysis: ScenarioAnalysis,
  desafiosAgro: AgroChallengeSignal[],
  scenario: string,
  playerHooks: StrategicHooks,
  productFocus: ProductIntelligence | undefined,
  storyline: ScenarioStoryline,
  opc: PreparationResult['opc'],
  decisionContext?: ReturnType<typeof buildKnowledgeDecisionContext>,
  memoryContext?: ReturnType<typeof buildScenarioMemory>
) => {
  const spinTemplate = inferSpinScenarioTemplate(scenario);
  const conversationTheme = resolveConversationTheme(analysis, productFocus);
  const byTheme = buildThemeSpinInjections(conversationTheme);
  const byTerms = buildSpecificTermInjections(analysis, conversationTheme);
  const anchors = buildScenarioSpinAnchors(analysis, scenario, productFocus);
  const scenarioIntent = extractScenarioIntent(scenario);
  const { productSalesChallenge } = buildScenarioExecutionContext(analysis, scenario, productFocus);
  const scenarioName = inferAgroScenarioName(scenario);
  const scenarioPlaybook = getAgroScenarioPlaybook(scenarioName);
  const scenarioFlow = buildScenarioSpinFlow(analysis, scenario, storyline, opc, memoryContext);
  const rawScenarioTerms = analysis.specificTerms.slice(0, 3).join(', ');
  const sanitizeSpinLines = (lines?: string[]): string[] =>
    (lines ?? []).filter((line) => !/no cenario apresentado|no cenário apresentado/i.test(normalizeText(line)));
  const contextDrivenSituacao = scenarioIntent.contextSignal
    ? `Olhando o momento atual da fazenda, o que mais está pesando na decisão hoje?`
    : '';
  const challengeDrivenSituacao = rawScenarioTerms
    ? `Quando entram temas como ${rawScenarioTerms}, como o senhor costuma organizar essa decisão na prática?`
    : '';
  const bankSpin = decisionContext?.spinBank;

  const situacao = selectRelevantUnique(
    [
      ...scenarioFlow.situacao,
      ...(memoryContext?.previousObjection
        ? [`Na última conversa ficou a percepção de "${memoryContext.previousObjection}". Como o senhor está vendo isso hoje?`]
        : []),
      anchors.situacao,
      ...(contextDrivenSituacao ? [contextDrivenSituacao] : []),
      ...(challengeDrivenSituacao ? [challengeDrivenSituacao] : []),
      ...(bankSpin?.situacao ?? []).filter((line) => !/no contexto atual da operacao|como essa conta vem lidando|qual criterio realmente pesa|quando voce precisa defender/i.test(normalizeText(line))),
      ...(sanitizeSpinLines(scenarioPlaybook?.situacao)),
      ...(sanitizeSpinLines(spinTemplate?.situacao)),
      ...byTheme.situacao.filter((line) => !/quando voce precisa defender|qual criterio realmente pesa/i.test(normalizeText(line))),
      ...byTerms.situacao,
      'Como o senhor está acompanhando hoje o resultado das áreas mais sensíveis da fazenda?',
      'Quais contas o senhor costuma olhar primeiro para decidir se uma proposta faz sentido ou não?'
    ],
    4,
    scenario,
    storyline.centralChallenge,
    storyline.decisionTrap,
    scenarioIntent.contextSignal
  );

  const problema = selectRelevantUnique(
    [
      ...scenarioFlow.problema,
      'Em que parte da decisão o resultado começa a escapar do esperado?',
      ...(memoryContext?.seasonMemory.previousProblem
        ? [`No ciclo anterior houve ${memoryContext.seasonMemory.previousProblem}. Onde esse mesmo padrão ainda ameaça o resultado atual?`]
        : []),
      ...(bankSpin?.problema ?? []),
      ...(scenarioIntent.painSignal
        ? [`Quando esse problema aparece na operação, onde normalmente ele começa: ${scenarioIntent.painSignal}?`]
        : []),
      `Na prática, em que momento ${productSalesChallenge} começa a travar a decisão?`,
      ...(sanitizeSpinLines(scenarioPlaybook?.problema)),
      ...(sanitizeSpinLines(spinTemplate?.problema)),
      anchors.problema,
      ...byTheme.problema,
      ...byTerms.problema,
      'Onde o foco em preço tem gerado custo que não aparece na planilha de compra?',
      'Qual gargalo hoje impede transformar esforço operacional em margem real no fechamento da safra?',
      'Que parte da operação tem maior variabilidade e mais impacto negativo quando a decisão é postergada?',
      'O que já foi tentado para resolver esse ponto e por que ainda não gerou estabilidade?',
      'Em que momento vocês percebem que “economizaram na compra, mas perderam no resultado”?' 
    ],
    4,
    scenario,
    storyline.centralChallenge,
    storyline.decisionTrap,
    memoryContext?.seasonMemory.previousProblem
  );

  const implicacao = selectRelevantUnique(
    [
      ...scenarioFlow.implicacao,
      `Se isso continuar, como ${storyline.agronomicImpact}?`,
      ...(memoryContext?.previousResult
        ? [`O histórico recente foi "${memoryContext.previousResult}". Se nada mudar na condução desta safra, qual impacto tende a se repetir?`]
        : []),
      ...(bankSpin?.implicacao ?? []),
      ...(scenarioIntent.desiredShift
        ? [`Se a operação não avançar para ${scenarioIntent.desiredShift}, qual impacto prático aparece em margem, risco e previsibilidade?`]
        : []),
      `Se ${productSalesChallenge} continuar, qual impacto aparece no custo total da safra e na segurança da decisão?`,
      ...(sanitizeSpinLines(scenarioPlaybook?.implicacao)),
      ...(sanitizeSpinLines(spinTemplate?.implicacao)),
      anchors.implicacao,
      ...byTheme.implicacao,
      ...byTerms.implicacao,
      'Se esse padrão continuar por mais um ciclo, qual impacto provável em margem líquida e previsibilidade de caixa?',
      'Qual risco operacional aumenta quando a decisão é tomada tarde ou por critério incompleto?',
      'Quanto custa para o negócio manter um critério de compra desalinhado com o objetivo econômico?',
      'Qual oportunidade de resultado deixa de ser capturada quando essa dor não é tratada agora?',
      'Se nada mudar, qual meta estratégica fica mais vulnerável neste ano?' 
    ],
    4,
    scenario,
    storyline.agronomicImpact,
    storyline.economicImpact,
    memoryContext?.previousResult
  );

  const needPayoffPool = [
    ...scenarioFlow.necessidadeSolucao,
    `Que formato de prova faz mais sentido neste caso para sustentar a decisão?`,
    ...(memoryContext?.previousSolutionProposed
      ? [`Da outra vez foi proposta "${memoryContext.previousSolutionProposed}". O que precisa ficar diferente agora para essa decisão ganhar tração?`]
      : []),
    ...(bankSpin?.necessidadeSolucao ?? []),
    ...(scenarioIntent.desiredCommitment
      ? [`Para viabilizar ${scenarioIntent.desiredCommitment}, qual condição de resultado precisa ficar explícita para você decidir agora?`]
      : []),
    ...(sanitizeSpinLines(scenarioPlaybook?.necessidade)),
    ...(sanitizeSpinLines(spinTemplate?.necessidadeSolucao)),
    anchors.necessidadeSolucao,
    ...(productFocus?.ganchosSpin.necessidadeSolucao ?? []),
    ...playerHooks.spinNeed,
    ...byTheme.necessidadeSolucao,
    ...byTerms.necessidadeSolucao,
    'Quais evidências e números você precisa ter em mãos para defender internamente esta recomendação e avançarmos hoje?',
    'Que condição mínima de resultado você considera justa para aprovar o próximo passo desta proposta?',
    'Qual formato de validação te deixa confortável para seguir: talhão piloto com data de leitura ou implantação por etapas?',
    'Qual regra de decisão vamos formalizar agora para evitar retorno à comparação apenas por preço?',
    'Quem precisa validar junto com você para sairmos desta reunião com encaminhamento definido?'
  ];

  if (analysis.stakeholders === 'multiplos') {
    needPayoffPool.unshift(
      'Como estruturamos uma proposta que compras consiga defender por custo total e o técnico consiga defender por resultado de campo?'
    );
  }

  if (desafiosAgro[0]) {
    needPayoffPool.unshift(
      `Considerando ${desafiosAgro[0].titulo.toLowerCase()}, qual avanço concreto podemos formalizar hoje para proteger resultado e margem?`
    );
  }

  const necessidadeSolucao = finalizeSpinQuestions(
    selectRelevantUnique(
      needPayoffPool,
      4,
      scenario,
      storyline.desiredShift,
      storyline.proofAnchor,
      storyline.commitmentAnchor
    )
  );

  return {
    situacao: finalizeSpinQuestions(situacao),
    problema: finalizeSpinQuestions(problema),
    implicacao: finalizeSpinQuestions(implicacao),
    necessidadeSolucao
  };
};

const buildEpa = (
  analysis: ScenarioAnalysis,
  desafiosAgro: AgroChallengeSignal[],
  playerHooks: StrategicHooks,
  productFocus: ProductIntelligence | undefined,
  scenario: string,
  spin: SpinBlock,
  opc: PreparationResult['opc'],
  storyline: ScenarioStoryline,
  decisionContext?: ReturnType<typeof buildKnowledgeDecisionContext>,
  memoryContext?: ReturnType<typeof buildScenarioMemory>
) => {
  void spin;
  void desafiosAgro;
  const context = CULTURA_CONTEXT[analysis.cultura];
  const conversationTheme = resolveConversationTheme(analysis, productFocus);
  const themeFocus = describeThemeFocus(conversationTheme);
  const scenarioName = inferAgroScenarioName(scenario);
  const scenarioPlaybook = getAgroScenarioPlaybook(scenarioName);
  const scenarioEpaPlaybook = getAgroScenarioEpaPlaybook(scenarioName);
  const spinTemplate = inferSpinScenarioTemplate(scenario);
  const epaTemplate = getEpaScenarioTemplateById(spinTemplate?.id ?? null);
  const normalizedScenario = normalizeText(scenario);
  const coopLoyaltyScenario = isCooperativeLoyaltyScenario(analysis, normalizedScenario);
  const produtoContexto = productFocus ? `${productFocus.produto} (${productFocus.fabricante})` : null;
  const { scenarioContext, challengeFocus, productSalesChallenge } = buildScenarioExecutionContext(
    analysis,
    scenario,
    productFocus
  );
  const scenarioIntent = extractScenarioIntent(scenario);
  const opcObjetivo = opc.objetivo[0] ?? 'avançar a conversa com critério de valor';
  const opcProcesso = opc.processo[0] ?? 'conduzir diagnóstico com perguntas abertas';
  const opcCompromisso = opc.compromisso[0] ?? 'formalizar próximo passo objetivo';
  const spinDiagnosisResumo = 'o ponto que mais trava resultado na operação';
  const spinImplicationResumo = `impacto em ${metricByCulture(analysis.cultura)} e risco operacional`;
  const spinNeedResumo =
    scenarioIntent.desiredCommitment ?? 'próximo passo com critério claro de decisão';
  const genericEpaPattern = /no cenario de decisao tecnico[-\s]?economica da operacao|janela da safra mais apertada/i;
  const toActionList = (items: string[], limit: number): string[] =>
    pick(composeUnique(items, Math.max(limit + 1, 6)), limit).map((item) => {
      const trimmed = item.trim();
      const withoutActionLabel = trimmed
        .replace(/^fa[çc]a isso(?: no [^:]+)?:\s*/i, '')
        .replace(/^mostre ao produtor:\s*/i, '')
        .trim();
      if (!withoutActionLabel) return trimmed;
      const base = withoutActionLabel.replace(/[.!?]+$/g, '');
      return `${base.charAt(0).toUpperCase()}${base.slice(1)}.`;
    });
  const produtoEducarHint = produtoContexto
    ? `${produtoContexto}: destaque como essa recomendação protege resultado, reduz risco e sustenta margem no ciclo.`
    : `Destaque como o ajuste em ${themeFocus} pode proteger resultado, reduzir risco e sustentar margem no ciclo.`;
  const knowledgeProvocations = decisionContext?.provocations ?? [];
  const objectionStrategies = decisionContext?.objections.map((item) => item.responseStrategy) ?? [];

  const educarScenarioInsights = [
    `Mostre por que ${productSalesChallenge} precisa ser tratado olhando o problema real da conta.`,
    `Puxe a conversa para o efeito de ${challengeFocus} no resultado final da safra: ${storyline.agronomicImpact}.`,
    `Traga a conta para o que realmente importa no negócio: ${metricByCulture(analysis.cultura)}.`,
    'Use um ponto novo para mudar o critério da decisão, sem parecer repetição do que já foi perguntado.',
    'Retome o que fez sentido para o produtor e use isso para abrir o próximo passo.'
  ];

  if (coopLoyaltyScenario) {
    return {
      educar: toActionList(
        composeUnique(
          [
            'Mostre, com respeito, que o ponto aqui não é discutir se a Yara está cara ou barata, e sim quanto valor ela pode entregar no resultado final da área.',
            'Traga o insight de que produto caro e custo alto não são a mesma coisa; o que decide é o retorno por hectare no fim da safra.',
            `Use o que apareceu no diagnóstico para abrir reflexão: ${spinDiagnosisResumo}.`,
            'Leve a conversa para valor: produtividade, margem, estabilidade e retorno por hectare.',
            'Mostre que uma validação bem feita junto com a cooperativa parceira reduz risco e melhora a qualidade da decisão.'
          ],
          5
        ),
        5
      ),
      personalizar: toActionList(
        composeUnique(
          [
            'Reconheça o valor da cooperativa na relação atual e construa a conversa mostrando como Yara pode somar mais resultado dentro dessa parceria.',
            'Personalize em cima da dor principal do caso: margem apertada, perda de produtividade e comparação por preço por hectare.',
            `Personalize com base nas implicações já reconhecidas: ${spinImplicationResumo}.`,
            `Ajuste a forma de conduzir para combinar com este caminho: ${opcProcesso}.`
          ],
          4
        ),
        4
      ),
      assumirControle: toActionList(
        composeUnique(
          [
            'Defina uma agenda simples de decisão: o que será validado, em qual área, com qual indicador e quando será feita a leitura.',
            'Se a conversa voltar para preço, traga de volta para produtividade, margem e retorno por hectare.',
            'Feche com um próximo passo simples, combinado e fácil de medir no campo.',
            `Feche com um próximo passo bem claro: ${opcCompromisso}.`
          ],
          4
        ),
        4
      )
    };
  }

  const educarCoreByTheme: Record<Theme, string[]> = {
    adubo: [
      'Eduque o produtor com duas leituras da mesma decisão: custo de compra versus custo total do ciclo por hectare.',
      'Mostre como eficiência nutricional bem posicionada reduz perda invisível e protege produtividade.',
      'Evangelize por critério: adubo bom é o que converte em margem e previsibilidade, não o de menor preço por tonelada.'
    ],
    defensivo: [
      'Eduque o produtor mostrando que defensivo deve ser decidido por risco evitado e estabilidade de controle, não por preço por litro.',
      'Explique que janela, posicionamento e qualidade de aplicação pesam tanto quanto o produto para proteger resultado.',
      'Evangelize com lógica simples: manejo correto hoje evita retrabalho, perda de produtividade e pressão maior amanhã.'
    ],
    semente: [
      'Eduque com o conceito de genética por ambiente: a semente certa reduz risco e protege potencial da área.',
      'Mostre que decisão por preço da semente pode custar caro em stand, uniformidade e teto produtivo.',
      'Evangelize por resultado: escolha de material deve nascer da meta de produtividade e margem.'
    ],
    biologico: [
      'Eduque com protocolo: biológico sem posicionamento claro vira custo; com método vira consistência.',
      'Mostre como o biológico bem aplicado protege estabilidade fisiológica e reduz risco de oscilação.',
      'Evangelize por validação prática: área piloto, métrica simples e decisão baseada em evidência.'
    ],
    irrigacao: [
      'Eduque por eficiência hídrica e energética: irrigação boa é a que entrega resultado com previsibilidade.',
      'Mostre que precisão de manejo reduz desperdício e protege teto produtivo em fase crítica.',
      'Evangelize com rotina de decisão: quando irrigar, quanto irrigar e qual impacto esperado no negócio.'
    ],
    maquinario: [
      'Eduque mostrando que máquina de maior valor agregado se paga na execução: menos falha, menos sobreposição, mais eficiência.',
      'Mostre que tecnologia embarcada só gera valor quando vira rotina de campo e disciplina de operação.',
      'Evangelize por produtividade operacional: qualidade de execução também é decisão de margem.'
    ],
    servicos: [
      'Eduque que serviço técnico de valor acelera decisão certa e reduz erro caro no campo.',
      'Mostre como acompanhamento de execução converte recomendação em resultado real no talhão.',
      'Evangelize por governança simples: indicador, responsável e prazo para cada avanço.'
    ],
    geral: [
      'Eduque por negócio: decisão agrícola boa é a que combina técnica, execução e retorno por hectare.',
      'Mostre o custo da inércia em fases críticas da safra e o impacto na margem final.',
      'Evangelize com linguagem de campo e número de negócio, sem complicar.'
    ]
  };

  const educar = selectRelevantUnique(
    [
      `Traga uma nova perspectiva sobre o problema central: ${storyline.centralChallenge}.`,
      'Mostre onde a forma atual de decidir pode estar custando mais do que parece.',
      ...(memoryContext?.previousResult
        ? [`Use o histórico como contraste: "${memoryContext.previousResult}" mostra que repetir a mesma lógica não garante evolução de resultado.`]
        : []),
      ...knowledgeProvocations,
      `Mostre por que manter o modelo atual em ${challengeFocus} tende a esconder custo e risco: ${storyline.economicImpact}.`,
      `Ligue o tema da conversa ao problema real da conta: ${productSalesChallenge}.`,
      `Traduza o ponto técnico em impacto econômico, olhando ${metricByCulture(analysis.cultura)}.`,
      'Traga um insight que faça o produtor pensar sem sentir que está sendo pressionado.',
      `Puxe a conversa para esta direção: ${opcObjetivo}.`,
      produtoEducarHint,
      ...playerHooks.epaEducar,
      ...objectionStrategies.map((item) => `Se essa objeção aparecer, responda por ${item}.`),
      ...educarCoreByTheme[conversationTheme],
      'Traga uma leitura nova, que quebre a lógica atual sem criar confronto.',
      `Mostre que decisões em ${themeFocus} precisam ser comparadas pelo retorno no ciclo completo, e não só pelo preço: ${storyline.valueAnchor}.`,
      analysis.specificTerms.length
        ? `Use os termos do cenário (${analysis.specificTerms.slice(0, 3).join(', ')}) para mostrar custo oculto, risco e ganho potencial.`
        : 'Use exemplos reais da operação para mostrar custo oculto, risco e ganho potencial.',
      ...educarScenarioInsights,
      ...(scenarioPlaybook?.epaEducar ? [scenarioPlaybook.epaEducar] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(scenarioEpaPlaybook?.educar ? [scenarioEpaPlaybook.educar] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(epaTemplate?.educarReframe ?? []).filter((x) => !genericEpaPattern.test(x)),
      `Mostre que “preço baixo” pode virar custo alto no ciclo, cobrando a conta em produtividade, margem e risco na ${context.nome}.`,
      'Mostre o custo de adiar a decisão quando a janela está curta.',
      `Mostre a oportunidade que está ficando na mesa: ${context.oportunidade}.`
    ],
    5,
    scenario,
    storyline.centralChallenge,
    storyline.decisionTrap,
    storyline.economicImpact
  );

  const personalizar = selectRelevantUnique(
    [
      `Personalize a conversa em cima deste caso real: ${storyline.centralChallenge}.`,
      `Adapte a recomendação para ajudar o produtor a avançar para ${storyline.desiredShift}.`,
      ...(scenarioIntent.desiredShift
        ? [`Adapte a conversa para viabilizar o avanço desejado: ${scenarioIntent.desiredShift}.`]
        : []),
      ...(memoryContext?.relationshipLevel ? [`Personalize de acordo com o nível de relacionamento atual: ${memoryContext.relationshipLevel}.`] : []),
      `Ajuste a proposta para destravar o ponto mais sensível deste caso: ${productSalesChallenge}.`,
      `Traga a recomendação para a realidade desta fazenda: ${scenarioContext}.`,
      `Conecte a proposta ao impacto esperado no negócio: ${spinImplicationResumo} e ${storyline.economicImpact}.`,
      `Conduza a conversa de um jeito coerente com este caminho: ${opcProcesso}.`,
      'Ajuste a fala ao perfil de quem decide: mais técnico quando preciso, mais econômico quando necessário.',
      'Reduza atrito de compra deixando a proposta simples de entender e de testar.',
      ...(scenarioPlaybook?.epaPersonalizar ? [scenarioPlaybook.epaPersonalizar] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(scenarioEpaPlaybook?.personalizar ? [scenarioEpaPlaybook.personalizar] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(epaTemplate?.personalizarTailor ?? []).filter((x) => !genericEpaPattern.test(x)),
      'Conecte a recomendação ao momento da safra e à capacidade real da equipe.',
      analysis.primaryTheme === 'maquinario'
        ? 'Em maquinário, ajuste a conversa ao nível real de uso da tecnologia pela equipe.'
        : 'Ajuste a recomendação à rotina de campo para facilitar execução e adoção.',
      'Em conta estratégica, personalize pela prioridade que mais pesa hoje para o cliente.',
      'Se houver resistência, leve para validação prática em vez de debate de opinião.'
    ],
    4,
    scenario,
    storyline.centralChallenge,
    storyline.desiredShift,
    scenarioContext
  );

  if (productFocus) {
    personalizar.unshift(
      `No caso de ${productFocus.produto}, ligue a recomendação à janela certa, à execução e ao impacto real na área.`
    );
  }

  const takeControl = selectRelevantUnique(
    [
      `Mantenha a reunião girando em torno deste foco: ${storyline.processAnchor}.`,
      ...(scenarioIntent.desiredCommitment
        ? [`Conduza o fechamento para um compromisso claro: ${scenarioIntent.desiredCommitment}.`]
        : []),
      ...(memoryContext?.previousObjection
        ? [`Como essa objeção já apareceu antes (${memoryContext.previousObjection}), trate isso antes de entrar em condição comercial.`]
        : []),
      `Traga a conversa de volta para o ponto central: ${productSalesChallenge}.`,
      `Conduza com firmeza e respeito, mantendo foco em resultado e avanço concreto: ${scenarioContext}.`,
      `Transforme a necessidade validada em critério de decisão: ${spinNeedResumo}.`,
      `Feche a prova de valor desta forma: ${storyline.commitmentAnchor}.`,
      `Feche com este próximo passo: ${opcCompromisso}.`,
      'Abra com uma agenda clara e peça acordo para conduzir a conversa por resultado.',
      ...(scenarioPlaybook?.epaControle ? [scenarioPlaybook.epaControle] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(scenarioEpaPlaybook?.assumirControle ? [scenarioEpaPlaybook.assumirControle] : []).filter((x) => !genericEpaPattern.test(x)),
      ...(epaTemplate?.assumirControleTakeControl ?? []).filter((x) => !genericEpaPattern.test(x)),
      'Se o preço aparecer, puxe de volta para custo total, risco e retorno esperado.',
      'Mantenha a conversa andando sem deixar cair em indecisão ou dispersão.',
      'Faça alinhamentos curtos ao longo da reunião para manter direção.',
      'Feche com uma síntese objetiva: decisão, critério, responsável e prazo.'
    ],
    4,
    scenario,
    storyline.processAnchor,
    storyline.commitmentAnchor,
    opcCompromisso
  );

  return {
    educar: toActionList(educar, 5),
    personalizar: toActionList(personalizar, 4),
    assumirControle: toActionList(takeControl, 4)
  };
};

const buildTips = (
  analysis: ScenarioAnalysis,
  desafiosAgro: AgroChallengeSignal[],
  playerHooks: StrategicHooks,
  productFocus?: ProductIntelligence
): string[] => {
  const manufacturerNotes = buildManufacturerNotes(analysis);
  const desafiosTips = desafiosAgro.map(
    (item) => `Traga para a conversa o desafio "${item.titulo.toLowerCase()}" e conecte com a realidade da fazenda: ${item.comoUsarNaConversa}`
  );
  const tipsPool = [
    ...playerHooks.tips,
    'Foco na experiência do cliente: simplifique logística, decisão e execução para tornar a adoção mais fácil no dia a dia.',
    'Segurança e sustentabilidade: em recomendações de aplicação, sempre orientar EPI, procedimento correto, respeito ambiental e eficiência de uso.',
    'Credibilidade agronômica inegociável: não propor combinação sem base técnica; recomendar o que é correto para a área, a fase e o objetivo da safra.',
    'Abordagem educativa: atuar como agrônomo consultivo, explicando adoção prática de novas tecnologias, ferramentas digitais e manejo orientado a ROI.',
    'Mostre o mesmo tema em dois números simples: preço de compra e custo total por hectare no fim da safra.',
    'Quando a conversa travar em preço, puxe para resultado: produtividade, risco operacional, margem e previsibilidade.',
    'Traduza o técnico para o negócio da fazenda: o que muda na lavoura e o que muda no caixa.',
    'Ao ouvir “está caro”, traga comparação prática: custo do item versus custo de uma decisão mal tomada na janela da safra.',
    'Feche cada conversa com avanço concreto: data, responsável, indicador e regra de decisão.',
    'Evite sair com “vamos pensar”: proponha um próximo passo curto, mensurável e com dono definido.',
    'No corpo da conversa, priorize perguntas abertas. Deixe perguntas fechadas para confirmação final de compromisso.',
    ...desafiosTips
  ];

  if (productFocus) {
    tipsPool.unshift(
      `Se o foco for ${productFocus.produto}, conecte argumento técnico a impacto de negócio: ${productFocus.propostaValorCurta.toLowerCase()}`
    );
  }

  if (analysis.tags.includes('cooperativa')) {
    tipsPool.unshift('Em cenários com cooperativa, ancore o argumento em valor para o produtor, rentabilidade da área e sustentabilidade econômica da operação como um único racional.');
  }

  if (analysis.tags.includes('resistencia')) {
    tipsPool.unshift('Com cliente resistente, troque convencimento por validação: teste curto, métrica clara e decisão baseada em evidência.');
  }

  if (analysis.specificTerms.length) {
    tipsPool.unshift(
      `Use no roteiro os termos do cenário (${analysis.specificTerms.slice(0, 4).join(', ')}) para mostrar domínio do contexto e evitar conversa genérica.`
    );
  }

  if (analysis.primaryTheme === 'maquinario') {
    tipsPool.unshift(
      'Em máquinas e implementos de maior valor agregado, não pare no hardware: mostre o valor da tecnologia embarcada (taxa variável, telemetria, piloto, corte de seção) no resultado final.'
    );
  }

  if (analysis.foco === 'preco' || analysis.prioridade === 'competicao') {
    tipsPool.unshift('Quando houver travamento por preço, leve opção de fechamento em área menor e, se couber, proposta via barter.');
  }

  return pick(composeUnique([...manufacturerNotes, ...tipsPool], 9), 6);
};

const buildNextStep = (analysis: ScenarioAnalysis): string => {
  if (analysis.etapa === 'primeiro_contato') {
    return 'Próximo passo sugerido: agendar diagnóstico de 45 minutos com dados de campo e financeiros para decidir em até 7 dias.';
  }

  if (analysis.prioridade === 'competicao') {
    return 'Próximo passo sugerido: montar comparação simples de custo total e risco por alternativa, com reunião de decisão já agendada.';
  }

  if (analysis.prioridade === 'expansao') {
    return 'Próximo passo sugerido: fechar teste em talhão ou área menor, com meta de resultado e data para decidir expansão.';
  }

  if (analysis.prioridade === 'retencao') {
    return 'Próximo passo sugerido: revisar resultado entregue, identificar nova alavanca de valor e pactuar plano de evolução com metas do próximo ciclo.';
  }

  return 'Próximo passo sugerido: sair da reunião com plano de ação de curto prazo, dono por atividade e indicador de resultado para acompanhamento.';
};

const buildRoiDefenseHooks = (
  analysis: ScenarioAnalysis,
  playerHooks: StrategicHooks,
  productFocus?: ProductIntelligence
): string[] => {
  const scenarioRoiAnchor = `No ROI deste cenário, mostre retorno por hectare e redução de risco operacional na ${CULTURA_CONTEXT[analysis.cultura].nome}.`;
  const filteredPlayerRoiHooks = playerHooks.roiHooks
    .filter((hook) => !/no roi c\.?vale/i.test(normalizeText(hook)))
    .map((hook) => hook.replace(/no roi c\.?vale,?\s*/i, 'No ROI deste cenário, '));

  const hooks = [
    scenarioRoiAnchor,
    ...filteredPlayerRoiHooks,
    'Defina com o produtor uma regra de decisão simples: manter manejo atual versus avançar, com base em ganho econômico por hectare.',
    'Leve 3 números para defender valor: receita adicional potencial, custo evitado e prazo de retorno da mudança.',
    'Mostre que ROI não é planilha bonita: é resultado medido em talhão, com critério acordado antes da implantação.'
  ];

  if (analysis.primaryTheme === 'maquinario') {
    hooks.unshift('Em máquinas e implementos, inclua no ROI o valor da execução: menos sobreposição, menos falha e melhor uso da tecnologia embarcada.');
  }

  if (productFocus) {
    hooks.unshift(`No caso de ${productFocus.produto}, traduza benefício técnico em retorno econômico medido na área piloto.`);
  }

  return pick(composeUnique(hooks, 5), 3);
};

const SEARCH_DOMAINS_BY_PLAYER = [
  'corteva.com.br',
  'yara.com.br',
  'syngenta.com.br',
  'cropscience.bayer.com.br',
  'mosaicco.com.br',
  'icl-growingsolutions.com',
  'ihara.com.br',
  'pioneer.com',
  'brevant.com.br',
  'dekalb.com.br',
  'nksementes.com.br',
  'kws.com',
  'coamo.com.br',
  'cocamar.com.br',
  'cvale.com.br',
  'copacol.com.br'
];

const buildValueSineMap = (params: {
  objectives: string[];
  insight: string;
  risk: string;
  valueProposition: string;
  solution: string;
  specificTerms: string[];
  roiHooks: string[];
  storyline: ScenarioStoryline;
  scenarioIntent?: ScenarioIntent;
  productSalesChallenge?: string;
}): ValueSineMap => {
  const { objectives, insight, risk, valueProposition, solution, specificTerms, roiHooks, storyline, scenarioIntent, productSalesChallenge } = params;
  const naturalizeParentheses = (value: string): string =>
    value
      .replace(/\s*\(([^)]+)\)/g, ', $1')
      .replace(/\s*\|\s*/g, ', ')
      .replace(/\s+,/g, ',')
      .replace(/,\s*,/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  const simplifyObjectiveLine = (value: string): string =>
    naturalizeParentheses(value)
      .replace(/^objetivo central deste cenario:\s*/i, '')
      .replace(/,?\s*dentro do contexto real:\s*/i, ', ')
      .replace(/[.]+$/g, '')
      .trim();
  const cleanTerm = (value: string): string =>
    naturalizeParentheses(value).replace(/\s+/g, ' ').trim();
  const compactText = (value: string, max = 160): string => {
    const cleaned = naturalizeParentheses(value).replace(/\.\.\./g, '.').replace(/\s+/g, ' ').trim();
    if (cleaned.length <= max) return cleaned;
    const slice = cleaned.slice(0, max);
    const safe = slice.slice(0, Math.max(slice.lastIndexOf('.'), slice.lastIndexOf(','), slice.lastIndexOf(' ')));
    return `${safe.trim()}.`;
  };
  const uniqueTerms = unique(specificTerms.map(cleanTerm).filter(Boolean));
  const termFocus =
    uniqueTerms.length > 0
      ? `Termos-chave a considerar: ${uniqueTerms.slice(0, 4).join(', ')}.`
      : 'Termos-chave: usar linguagem específica da operação.';
  const objectiveFocus = simplifyObjectiveLine(objectives[0] ?? 'elevar a conversa para decisão orientada por valor');
  const conciseInsight = compactText(insight, 150);
  const conciseRisk = compactText(risk, 140);
  const conciseValueProposition = compactText(valueProposition, 170);
  const conciseSolution = compactText(solution, 170);
  const intentShift = cleanIntentChunk(scenarioIntent?.desiredShift);
  const intentCommitment = cleanIntentChunk(scenarioIntent?.desiredCommitment);
  const intentPain = cleanIntentChunk(scenarioIntent?.painSignal);
  const intentContext = cleanIntentChunk(scenarioIntent?.contextSignal);
  const intentFocusLine = intentContext
    ? `Contexto da conversa: ${intentContext}.`
    : 'Contexto da conversa: operação real da propriedade.';
  const intentPainLine = intentPain
    ? `Ponto crítico a tratar: ${intentPain}.`
    : 'Ponto crítico a tratar: remover gargalos que travam resultado e margem.';
  const intentShiftLine = intentShift
    ? `Leve a conversa para ${intentShift}.`
    : 'Leve a conversa do preço isolado para decisão por valor total.';
  const intentCommitmentLine = intentCommitment
    ? `Feche com um compromisso claro: ${intentCommitment}.`
    : 'Feche com um próximo passo claro, com prazo e responsável.';
  const salesChallengeLine = productSalesChallenge
    ? `Desafio comercial do produto em foco: ${productSalesChallenge}.`
    : 'Desafio comercial do produto em foco: defender valor por resultado e não por preço.';

  const map: ValueSineMap = {
    titulo: 'Mapa Estratégico da Conversa — Senoide da Venda de Valor',
    subtitulo:
      'Visualize como conduzir a conversa comercial de forma estruturada, conectando OPC, SPIN e EPA ao longo dos seis passos da venda de valor.',
    steps: [
      {
        id: 1,
        titulo: 'Estabelecer o Cenário',
        resumo: 'Diálogo colaborativo e construção de credibilidade',
        explicacao:
          'Comece pelo contexto da operação e pelo objetivo da safra. Demonstre escuta ativa, linguagem simples e domínio técnico do campo para gerar confiança.',
        guiaTatico: [
          `Abra por aqui: ${storyline.openingMove}.`,
          'Use perguntas abertas para entender meta, gargalo e impacto econômico.',
          `Combine agenda curta: cenário, impacto, próximo passo. ${termFocus}`,
          intentFocusLine,
          salesChallengeLine
        ],
        sugestaoPersonalizada:
          `Comece conectando contexto e objetivo de negócio para esta conversa: ${objectiveFocus}. Assim você cria confiança e prepara o reposicionamento do problema.`
      },
      {
        id: 2,
        titulo: 'Reestruturação do Problema',
        resumo: 'Trazer novo ângulo',
        explicacao:
          'Reposicione o problema sem confronto. Mostre um ângulo que o cliente ainda não conectou entre decisão de compra e resultado da fazenda.',
        guiaTatico: [
          'Traga uma nova forma de olhar o problema, sem confronto.',
          'Conecte esse novo ângulo à realidade da propriedade, sem discurso genérico.',
          'Valide entendimento com linguagem objetiva de campo.',
          intentShiftLine,
          salesChallengeLine
        ],
        sugestaoPersonalizada:
          `Use este ponto-chave para mudar o critério da conversa de preço para resultado: ${conciseInsight} Isso abre espaço para evidência no impacto racional.`
      },
      {
        id: 3,
        titulo: 'Impacto Racional',
        resumo: 'Intensificação do problema',
        explicacao:
          'Mostre dado concreto para provar o tamanho do problema. Use indicador técnico e indicador econômico para dar robustez à conversa.',
        guiaTatico: [
          `Leve 2 evidências ligadas ao caso: ${storyline.agronomicImpact}.`,
          `Traga a conta econômica assim: ${storyline.economicImpact}.`,
          'Use comparação simples: cenário atual versus cenário corrigido.',
          'Evite excesso de números; destaque só os que mudam decisão.',
          intentPainLine
        ],
        sugestaoPersonalizada:
          'Apresente uma prova técnica e uma prova econômica para sustentar a narrativa de valor e legitimar a urgência da mudança.'
      },
      {
        id: 4,
        titulo: 'Impacto Emocional',
        resumo: 'Humanizar o problema e gerar urgência',
        explicacao:
          'Traga o risco de manter tudo como está para o presente: perda de janela, pressão de caixa, retrabalho ou custo de oportunidade. Gere urgência com responsabilidade.',
        guiaTatico: [
          'Mostre o custo de adiar decisão em termos de risco operacional.',
          'Conecte urgência a um marco real da safra, como janela, prazo ou previsão climática.',
          'Mantenha tom consultivo: firmeza sem pressão agressiva.',
          'Reforce o risco de seguir do mesmo jeito.',
          intentShiftLine
        ],
        sugestaoPersonalizada:
          `Transforme o risco central em urgência prática: ${conciseRisk} Mostre o custo da inação para preparar aceitação da proposta de valor.`
      },
      {
        id: 5,
        titulo: 'Proposta de Valor',
        resumo: 'Novo caminho para resolver o problema',
        explicacao:
          'Apresente um caminho claro de execução, conectando dor priorizada, critério de decisão e resultado esperado no negócio.',
        guiaTatico: [
          'Mostre proposta em 3 blocos: ação, impacto esperado e condição de execução.',
          `Conecte cada ponto da proposta a esta dor já validada: ${storyline.centralChallenge}.`,
          'Fale em retorno e previsibilidade, não apenas em atributo.',
          roiHooks[0] ?? 'Amarre a proposta a uma métrica simples de ROI para sustentar a decisão.',
          intentCommitmentLine
        ],
        sugestaoPersonalizada:
          `Apresente a proposta como resposta direta ao que foi construído antes: ${conciseValueProposition} Conecte com retorno, previsibilidade e redução de risco.`
      },
      {
        id: 6,
        titulo: 'Pacote de Soluções',
        resumo: 'Sua solução: apresentação das soluções de valor agregado',
        explicacao:
          'Apresente o pacote final conectando produto, serviço e suporte técnico àquilo que foi construído na conversa. Feche com compromisso claro.',
        guiaTatico: [
          'Apresente somente o pacote aderente ao problema priorizado.',
          'Defina responsável, prazo e indicador de validação da área piloto ou da implantação.',
          'Finalize com próximo passo já agendado.',
          roiHooks[1] ?? 'Feche com critério objetivo de ROI para sustentar a decisão do cliente.',
          intentCommitmentLine
        ],
        sugestaoPersonalizada:
          `Feche a narrativa com compromisso claro: ${conciseSolution} Garanta próximo passo com prazo, dono e critério econômico de decisão.`
      }
    ],
    fases: [
      { nome: 'Gancho', etapas: [1, 2] },
      { nome: 'Impacto', etapas: [3, 4] },
      { nome: 'Solução', etapas: [5, 6] }
    ]
  };

  return {
    ...map,
    steps: map.steps.map((step) => ({
      ...step,
      titulo: naturalizeParentheses(step.titulo),
      resumo: naturalizeParentheses(step.resumo),
      explicacao: naturalizeParentheses(step.explicacao),
      guiaTatico: step.guiaTatico.map((line) => naturalizeParentheses(line)),
      sugestaoPersonalizada: naturalizeParentheses(step.sugestaoPersonalizada)
    }))
  };
};

export const generatePreparation = async (scenario: string): Promise<PreparationResult> => {
  const trimmedScenario = scenario.trim();

  if (!trimmedScenario) {
    throw new Error('Descreva o cenário da reunião para gerar a preparação.');
  }

  await new Promise((resolve) => setTimeout(resolve, 950));

  const analysis = analyzeScenario(trimmedScenario);
  const staticProducts = detectProductIntelligence(analysis.normalized, analysis.fabricantes);
  const dynamicProducts = buildDynamicProductProfiles(analysis, analysis.normalized, staticProducts);
  const produtosDetectados = pick([...staticProducts, ...dynamicProducts], 6);
  const produtoPrincipal = produtosDetectados[0];
  const memoryContext = buildScenarioMemory(trimmedScenario, analysis);
  const decisionContext = buildKnowledgeDecisionContext(analysis, analysis.normalized);
  const strategyContext = buildStrategyDecisionContext(analysis, analysis.normalized, decisionContext);
  const playerHooks = buildStrategicHooksByPlayer(analysis, analysis.normalized, produtoPrincipal);
  const storyline = buildScenarioStoryline(
    analysis,
    trimmedScenario,
    produtoPrincipal,
    decisionContext,
    strategyContext,
    memoryContext
  );
  const termosPossiveis = detectPotentialProductTerms(analysis.normalized);
  const trilhasPesquisaProdutos = termosPossiveis
    .filter((termo) => !produtosDetectados.some((p) => p.aliases.some((alias) => alias.test(termo))))
    .map((termo) => ({
      termo,
      sugestoes: SEARCH_DOMAINS_BY_PLAYER.slice(0, 6).map(
        (domain) => `https://www.google.com/search?q=${encodeURIComponent(`${termo} site:${domain}`)}`
      )
    }))
    .slice(0, 3);
  const desafiosAgro = selectAgroChallenges(analysis);
  const scenarioIntent = extractScenarioIntent(trimmedScenario);
  const opc = buildOpc(
    analysis,
    playerHooks,
    produtoPrincipal,
    trimmedScenario,
    storyline,
    strategyContext,
    memoryContext
  );
  const spin = buildSpin(
    analysis,
    desafiosAgro,
    trimmedScenario,
    playerHooks,
    produtoPrincipal,
    storyline,
    opc,
    decisionContext,
    memoryContext
  );
  const epa = buildEpa(
    analysis,
    desafiosAgro,
    playerHooks,
    produtoPrincipal,
    trimmedScenario,
    spin,
    opc,
    storyline,
    decisionContext,
    memoryContext
  );
  const dicasPraticas = buildTips(analysis, desafiosAgro, playerHooks, produtoPrincipal);
  const proximoPasso = buildNextStep(analysis);
  const roiHooks = buildRoiDefenseHooks(analysis, playerHooks, produtoPrincipal);
  const engineInsights = buildEngineInsights(
    analysis,
    trimmedScenario,
    playerHooks,
    produtoPrincipal,
    storyline,
    decisionContext,
    strategyContext,
    memoryContext
  );
  const executionContext = buildScenarioExecutionContext(analysis, trimmedScenario, produtoPrincipal);
  const valueSineMap = buildValueSineMap({
    objectives: opc.objetivo,
    insight: epa.educar[0],
    risk: epa.educar[1] ?? epa.assumirControle[0],
    valueProposition: epa.personalizar[0],
    solution: opc.compromisso.join(' | '),
    specificTerms: [
      ...analysis.specificTerms,
      ...(produtoPrincipal ? [`${produtoPrincipal.produto} (${produtoPrincipal.fabricante})`] : [])
    ],
    roiHooks,
    storyline,
    scenarioIntent,
    productSalesChallenge: executionContext.productSalesChallenge
  });

  const produtosReferenciados: ProductReference[] = produtosDetectados.map((item) => ({
    produto: item.produto,
    fabricante: item.fabricante,
    propostaValorCurta: item.propostaValorCurta,
    fortalezasCompetitivas: item.fortalezasCompetitivas,
    cuidadosDePosicionamento: item.cuidadosDePosicionamento,
    fontes: item.fontes,
    atualizadoEm: item.atualizadoEm
  }));

  return {
    tituloFicha: `Ficha Estratégica de Preparação Comercial | ${APP_NAME}`,
    cenarioOriginal: trimmedScenario,
    engineInsights,
    opc,
    spin,
    epa,
    valueSineMap,
    dicasPraticas,
    proximoPasso,
    metadata: {
      generatedAt: new Date().toISOString(),
      tags: analysis.tags,
      primaryTheme: analysis.primaryTheme,
      specificTerms: analysis.specificTerms,
      machineTechTerms: analysis.machineTechTerms,
      competitiveDifferentiationFocus:
        describeProductDifferentiation(produtoPrincipal) ?? describeCompetitiveDifferentiation(analysis),
      missingScenarioDetails: buildMissingScenarioDetails(analysis, produtosReferenciados.length > 0),
      fabricantesCitados: analysis.fabricantes,
      referenciasFabricantes: buildManufacturerReferences(analysis),
      referenciasSetoriais: buildSectorReferences(analysis),
      produtosReferenciados,
      trilhasPesquisaProdutos,
      desafiosAgro: desafiosAgro.map((item) => ({
        titulo: item.titulo,
        contexto: item.contexto,
        comoUsarNaConversa: item.comoUsarNaConversa,
        perguntaAberta: item.perguntaAberta,
        fontes: item.fontes
      })),
      prioridade: analysis.prioridade,
      farmerProfiles: decisionContext.farmerProfiles,
      objectionsDetected: decisionContext.objections.map((item) => item.label),
      seasonMoment: decisionContext.seasonMoment,
      problemType: decisionContext.problemType,
      fieldScenarioKeys: decisionContext.fieldScenarioKeys,
      meetingDifficulty: strategyContext.difficultyLevel,
      recommendedApproach: strategyContext.recommendedApproach,
      conversationPaths: strategyContext.conversationPath,
      communicationLevel: strategyContext.communicationLevel,
      memoryContext: buildMemoryContextSummary(memoryContext),
      relationshipLevel: memoryContext.relationshipLevel,
      meetingContinuity: memoryContext.meetingType,
      previousObjection: memoryContext.previousObjection ?? undefined,
      previousSolutionProposed: memoryContext.previousSolutionProposed ?? undefined,
      previousResult: memoryContext.previousResult ?? undefined
    }
  };
};

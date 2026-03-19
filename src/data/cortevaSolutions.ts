import type { ScenarioAnalysis } from '../types';
import { normalizeText, unique } from '../utils/text';

export const CORTEVA_SOLUTIONS = {
  engineModule: 'CORTEVA_SOLUTIONS',
  version: '1.0',
  mode: 'AGRONOMIC + VALUE_SELLING',
  brand: 'Corteva',
  portfolioStructure: {
    categories: ['seeds', 'biotechnology', 'herbicides', 'insecticides', 'fungicides', 'seed_treatment', 'biologicals', 'digital', 'systems']
  },
  globalPrinciples: [
    'proteger_potencial_produtivo',
    'reduzir_perdas',
    'aumentar_produtividade',
    'melhorar_estabilidade',
    'controlar_pragas',
    'controlar_daninhas',
    'controlar_doencas',
    'aumentar_lucro_por_hectare',
    'vender_solução_e_não_produto'
  ],
  never: ['recomendar_sem_diagnóstico', 'focar_só_em_preço', 'ignorar_risco', 'ignorar_impacto_econômico']
} as const;

type CortevaSolution = {
  key: string;
  label: string;
  category:
    | 'seeds'
    | 'biotechnology'
    | 'herbicides'
    | 'insecticides'
    | 'fungicides'
    | 'seed_treatment'
    | 'biologicals'
    | 'systems';
  value: string[];
  aliases: RegExp[];
  crops?: Array<ScenarioAnalysis['cultura']>;
};

export const CORTEVA_SOLUTION_LIBRARY: CortevaSolution[] = [
  {
    key: 'pioneer',
    label: 'Pioneer',
    category: 'seeds',
    crops: ['soja', 'milho', 'geral'],
    value: ['alto potencial produtivo', 'estabilidade por ambiente', 'genética avançada'],
    aliases: [/pioneer/]
  },
  {
    key: 'brevant',
    label: 'Brevant',
    category: 'seeds',
    crops: ['soja', 'milho', 'geral'],
    value: ['produtividade', 'adaptação regional', 'consistência de resultado'],
    aliases: [/brevant/]
  },
  {
    key: 'enlist-system',
    label: 'Enlist System',
    category: 'systems',
    crops: ['soja', 'milho', 'geral'],
    value: ['controle de daninhas difíceis', 'flexibilidade operacional', 'segurança de aplicação'],
    aliases: [/enlist\s*system|enlist/]
  },
  {
    key: 'powercore',
    label: 'PowerCore',
    category: 'biotechnology',
    crops: ['milho', 'geral'],
    value: ['controle de lagartas', 'tolerância a herbicidas', 'estabilidade produtiva'],
    aliases: [/powercore/]
  },
  {
    key: 'conkesta',
    label: 'Conkesta',
    category: 'biotechnology',
    crops: ['soja', 'geral'],
    value: ['controle de pragas', 'proteção de potencial', 'alta produtividade'],
    aliases: [/conkesta/]
  },
  {
    key: 'gapper',
    label: 'Gapper',
    category: 'herbicides',
    crops: ['soja', 'milho', 'geral'],
    value: ['limpeza de área', 'janela operacional', 'estabilidade para segunda safra'],
    aliases: [/gapper/]
  },
  {
    key: 'colex',
    label: 'Colex',
    category: 'herbicides',
    crops: ['soja', 'milho', 'geral'],
    value: ['controle difícil', 'manejo de resistência', 'proteção de teto produtivo'],
    aliases: [/colex/]
  },
  {
    key: 'tordon',
    label: 'Tordon',
    category: 'herbicides',
    crops: ['pecuaria', 'geral'],
    value: ['controle em pastagem', 'limpeza de área', 'melhor uso da área'],
    aliases: [/tordon/]
  },
  {
    key: 'spider',
    label: 'Spider',
    category: 'herbicides',
    crops: ['soja', 'milho', 'geral'],
    value: ['pré-emergente', 'controle inicial', 'redução de competição'],
    aliases: [/spider/]
  },
  {
    key: 'premio',
    label: 'Premio',
    category: 'insecticides',
    crops: ['soja', 'milho', 'geral'],
    value: ['controle de lagartas', 'redução de perda produtiva', 'proteção do rendimento'],
    aliases: [/premio/]
  },
  {
    key: 'delegate',
    label: 'Delegate',
    category: 'insecticides',
    crops: ['geral'],
    value: ['controle de insetos', 'manejo de risco', 'consistência operacional'],
    aliases: [/delegate/]
  },
  {
    key: 'lorsban',
    label: 'Lorsban',
    category: 'insecticides',
    crops: ['geral'],
    value: ['controle de solo', 'arranque protegido', 'redução de risco inicial'],
    aliases: [/lorsban/]
  },
  {
    key: 'exalt',
    label: 'Exalt',
    category: 'insecticides',
    crops: ['geral'],
    value: ['controle de lepidópteros', 'proteção de área', 'estabilidade de manejo'],
    aliases: [/exalt/]
  },
  {
    key: 'aproach',
    label: 'Aproach',
    category: 'fungicides',
    crops: ['soja', 'milho', 'geral'],
    value: ['proteção de folha', 'controle de doenças', 'manutenção da fotossíntese'],
    aliases: [/aproach/]
  },
  {
    key: 'aproach-power',
    label: 'AproachPower',
    category: 'fungicides',
    crops: ['soja', 'milho', 'geral'],
    value: ['controle de ferrugem e cercospora', 'proteção do rendimento', 'estabilidade de ciclo'],
    aliases: [/aproach\s*power|aproachpower/]
  },
  {
    key: 'viovan',
    label: 'Viovan',
    category: 'fungicides',
    crops: ['geral'],
    value: ['alta performance', 'controle de doença', 'proteção produtiva'],
    aliases: [/viovan/]
  },
  {
    key: 'seed-treatment',
    label: 'Tratamento de Sementes Corteva',
    category: 'seed_treatment',
    crops: ['soja', 'milho', 'geral'],
    value: ['vigor inicial', 'sanidade', 'uniformidade de stand'],
    aliases: [/tratamento de sementes|seed treatment/]
  },
  {
    key: 'biologicals',
    label: 'Biológicos Corteva',
    category: 'biologicals',
    crops: ['geral'],
    value: ['manejo integrado', 'sustentabilidade agronômica', 'equilíbrio de sistema'],
    aliases: [/biologicos|utrisha|bioinsumo/]
  },
  {
    key: 'integrated-crop-solution',
    label: 'Integrated Crop Solution',
    category: 'systems',
    crops: ['geral'],
    value: ['manejo completo', 'integração de decisões', 'resultado por sistema'],
    aliases: [/integrated crop solution|manejo completo|whole farm|visao sistema/]
  }
];

const CORTEVA_PROBLEM_RULES: Array<{ regex: RegExp; use: string[] }> = [
  { regex: /daninha resistente|resistencia.*daninha|escape de daninha|planta daninha/, use: ['enlist-system', 'gapper', 'colex', 'spider'] },
  { regex: /lagarta|helicoverpa|spodoptera/, use: ['premio', 'exalt', 'powercore'] },
  { regex: /percevejo|sugador/, use: ['delegate', 'lorsban', 'conkesta'] },
  { regex: /ferrugem|cercospora|doenca foliar|doenca/, use: ['aproach-power', 'aproach', 'viovan'] },
  { regex: /baixo arranque|falha de stand|arranque ruim/, use: ['seed-treatment', 'pioneer', 'brevant'] },
  { regex: /baixa produtividade|baixo rendimento|perda produtiva/, use: ['pioneer', 'brevant', 'aproach', 'premio'] },
  { regex: /risco alto|muito risco|instabilidade/, use: ['integrated-crop-solution', 'enlist-system', 'conkesta'] }
];

export const inferCortevaSolutionsByScenario = (
  scenario: string,
  culture: ScenarioAnalysis['cultura']
): CortevaSolution[] => {
  const normalized = normalizeText(scenario);
  const score = new Map<string, number>();
  const add = (key: string, value: number) => score.set(key, (score.get(key) ?? 0) + value);

  CORTEVA_SOLUTION_LIBRARY.forEach((solution) => {
    if (solution.crops?.includes(culture)) add(solution.key, 2);
    if (solution.aliases.some((alias) => alias.test(normalized))) add(solution.key, 5);
  });

  CORTEVA_PROBLEM_RULES.forEach((rule) => {
    if (rule.regex.test(normalized)) {
      rule.use.forEach((key) => add(key, 4));
    }
  });

  if (/sistema|integrado|manejo completo/.test(normalized)) {
    add('integrated-crop-solution', 3);
    add('enlist-system', 2);
  }

  const selected = [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => CORTEVA_SOLUTION_LIBRARY.find((solution) => solution.key === key))
    .filter((solution): solution is CortevaSolution => Boolean(solution))
    .slice(0, 5);

  if (selected.length) return selected;

  return CORTEVA_SOLUTION_LIBRARY.filter(
    (solution) => solution.category === 'systems' || solution.category === 'seeds'
  ).slice(0, 3);
};

export const buildCortevaValueHooks = (
  scenario: string,
  culture: ScenarioAnalysis['cultura']
): {
  solutions: string[];
  systemRecommended: string;
  educar: string[];
  spinNeed: string[];
  opcProcess: string[];
  roiHooks: string[];
} => {
  const selected = inferCortevaSolutionsByScenario(scenario, culture);
  const labels = selected.map((solution) => solution.label);
  const valueDrivers = unique(selected.flatMap((solution) => solution.value)).slice(0, 4);

  return {
    solutions: labels.map((label, idx) => `${label}: ${selected[idx]?.value.slice(0, 2).join(' | ') ?? 'valor agronômico-econômico'}`),
    systemRecommended:
      labels.length >= 2
        ? `Sistema recomendado: integrar ${labels.slice(0, 2).join(' + ')} para proteger potencial e reduzir perdas no ciclo completo.`
        : 'Sistema recomendado: construir manejo integrado Corteva por fase para estabilizar produtividade e margem.',
    educar: [
      `Evidencie ao produtor os vetores de valor desta decisão: ${valueDrivers.join(', ')}.`,
      'Mostre que o custo da falha de manejo geralmente é maior do que o investimento em proteção correta no timing certo.'
    ],
    spinNeed: [
      'Qual condição de resultado no talhão precisa ficar clara para você defender internamente essa evolução de manejo?',
      'Que combinação de produtividade protegida, risco evitado e margem por hectare te dá segurança para avançar?'
    ],
    opcProcess: [
      `No processo, organize a conversa por problema -> impacto -> sistema recomendado (${labels.slice(0, 2).join(' + ') || 'Corteva'}).`,
      'Use diagnóstico de cultura, fase e pressão de risco para recomendar pacote integrado e não produto avulso.'
    ],
    roiHooks: [
      'Defenda ROI por hectare mostrando perda evitada, produtividade protegida e custo de retrabalho evitado.',
      'Compare cenário atual versus cenário com manejo integrado para sustentar a decisão econômica.'
    ]
  };
};

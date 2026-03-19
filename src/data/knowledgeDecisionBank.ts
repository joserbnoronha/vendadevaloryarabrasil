import type { ScenarioAnalysis } from '../types';

export type FarmerProfileKey =
  | 'price_driven_farmer'
  | 'technology_adopter'
  | 'skeptical_farmer'
  | 'loyal_to_competitor'
  | 'large_farm_professional'
  | 'small_traditional_farmer'
  | 'highly_technical_farmer'
  | 'risk_averse_farmer'
  | 'late_buyer'
  | 'cost_focused_farmer'
  | 'margin_focused_farmer'
  | 'innovation_seeker';

export type ObjectionKey =
  | 'price_too_high'
  | 'always_used_competitor'
  | 'no_difference_between_products'
  | 'no_budget'
  | 'too_risky'
  | 'worked_before_without_this'
  | 'not_convinced'
  | 'need_to_think'
  | 'will_wait'
  | 'cooperative_cheaper'
  | 'distributor_cheaper'
  | 'not_priority_now';

export type ProblemTypeKey =
  | 'price_discussion'
  | 'low_productivity'
  | 'low_efficiency'
  | 'wrong_fertilization'
  | 'risk_exposure'
  | 'commodity_mentality'
  | 'lack_of_planning'
  | 'false_economy';

export type FieldScenarioKey =
  | 'strong_competitor_present'
  | 'farmer_loyal_to_cooperative'
  | 'late_planting'
  | 'tight_margin'
  | 'credit_limitation'
  | 'bad_previous_season'
  | 'high_input_cost'
  | 'low_commodity_price'
  | 'soil_limitation'
  | 'climate_uncertainty'
  | 'new_customer'
  | 'lost_customer'
  | 'upsell_opportunity'
  | 'cross_sell_opportunity';

type BankRule<T extends string> = {
  key: T;
  label: string;
  regex: RegExp;
};

export const FARMER_PROFILE_BANK: Array<BankRule<FarmerProfileKey>> = [
  { key: 'price_driven_farmer', label: 'price driven farmer', regex: /preco|desconto|cotacao|comparativo|barato/ },
  { key: 'technology_adopter', label: 'technology adopter', regex: /tecnologia|digital|mapa|telemetria|taxa variavel|precisao|fertirrigacao/ },
  { key: 'skeptical_farmer', label: 'skeptical farmer', regex: /cetic|desconfi|nao acredita|nao confia|nao convencido/ },
  { key: 'loyal_to_competitor', label: 'loyal to competitor', regex: /concorrente|cooperativa|distribuidor|sempre compra|fiel/ },
  { key: 'large_farm_professional', label: 'large farm professional', regex: /grande produtor|operacao grande|fazenda grande|\b1[0-9]{3,}\s*ha\b|\b[2-9][0-9]{3,}\s*ha\b/ },
  { key: 'small_traditional_farmer', label: 'small traditional farmer', regex: /tradicional|pequena propriedade|area pequena|sempre fez assim/ },
  { key: 'highly_technical_farmer', label: 'highly technical farmer', regex: /dados|roi|talhao|analise|validacao|protocolo|ensaio/ },
  { key: 'risk_averse_farmer', label: 'risk averse farmer', regex: /risco|seguranca|nao quer arriscar|medo de errar|conservador/ },
  { key: 'late_buyer', label: 'late buyer', regex: /ultima hora|em cima da hora|atrasad|tarde|janela apertada/ },
  { key: 'cost_focused_farmer', label: 'cost focused farmer', regex: /custo|cortar gasto|economizar|reduzir investimento/ },
  { key: 'margin_focused_farmer', label: 'margin focused farmer', regex: /margem|rentabilidade|lucro|resultado por hectare/ },
  { key: 'innovation_seeker', label: 'innovation seeker', regex: /inovacao|diferencial|alto desempenho|nova tecnologia/ }
];

export const OBJECTION_BANK: Array<BankRule<ObjectionKey> & { responseStrategy: string }> = [
  { key: 'price_too_high', label: 'price too high', regex: /caro|preco alto|muito caro/, responseStrategy: 'reframing para custo total, margem por hectare e risco evitado' },
  { key: 'always_used_competitor', label: 'always used competitor', regex: /sempre usei|sempre comprei|sempre usei concorrente/, responseStrategy: 'entrada de baixo risco com validação parcial e comparação por resultado' },
  { key: 'no_difference_between_products', label: 'no difference between products', regex: /tudo igual|sem diferenca|nao muda nada/, responseStrategy: 'mostrar diferença por eficiência, estabilidade e resposta econômica no talhão' },
  { key: 'no_budget', label: 'no budget', regex: /sem orcamento|sem budget|nao cabe no caixa/, responseStrategy: 'priorizar retorno, proteção de margem e evitar falsa economia' },
  { key: 'too_risky', label: 'too risky', regex: /muito risco|arriscado|nao quero arriscar/, responseStrategy: 'reduzir percepção de risco com área piloto, métrica clara e execução controlada' },
  { key: 'worked_before_without_this', label: 'worked before without this', regex: /sempre funcionou|deu certo sem isso|worked before/, responseStrategy: 'trazer uma nova perspectiva sobre custo de oportunidade e sobre o contexto atual da área' },
  { key: 'not_convinced', label: 'not convinced', regex: /nao estou convencido|nao convenceu|nao vejo motivo/, responseStrategy: 'aprofundar implicação, prova de valor e critério de decisão' },
  { key: 'need_to_think', label: 'need to think', regex: /preciso pensar|vou pensar/, responseStrategy: 'fechar critério objetivo e próximo passo com data' },
  { key: 'will_wait', label: 'will wait', regex: /vou esperar|vamos esperar|depois a gente vê/, responseStrategy: 'mostrar custo da postergação e risco de perder janela' },
  { key: 'cooperative_cheaper', label: 'cooperative cheaper', regex: /cooperativa.*mais barata|cooperativa cheaper/, responseStrategy: 'comparar por valor capturado, serviço e resultado econômico final' },
  { key: 'distributor_cheaper', label: 'distributor cheaper', regex: /distribuidor.*mais barato|revenda.*mais barata/, responseStrategy: 'reframing para eficiência de manejo, risco e previsibilidade' },
  { key: 'not_priority_now', label: 'not priority now', regex: /nao e prioridade|agora nao|depois vemos/, responseStrategy: 'conectar urgência à janela, risco e impacto de margem' }
];

export const FIELD_SCENARIO_BANK: Array<BankRule<FieldScenarioKey>> = [
  { key: 'strong_competitor_present', label: 'strong competitor present', regex: /concorrente forte|concorrente presente|outro vendedor visita sempre/ },
  { key: 'farmer_loyal_to_cooperative', label: 'farmer loyal to cooperative', regex: /cooperativa|fiel a cooperativa|compra so na cooperativa/ },
  { key: 'late_planting', label: 'late planting', regex: /plantio atrasado|janela apertada|atraso de plantio/ },
  { key: 'tight_margin', label: 'tight margin', regex: /margem apertada|rentabilidade baixa|lucro baixo/ },
  { key: 'credit_limitation', label: 'credit limitation', regex: /credito|limite|banco|caixa apertado|endivid/ },
  { key: 'bad_previous_season', label: 'bad previous season', regex: /safra ruim|quebra de safra|prejuizo|temporada ruim/ },
  { key: 'high_input_cost', label: 'high input cost', regex: /custo alto de insumo|insumo caro|fertilizante caro/ },
  { key: 'low_commodity_price', label: 'low commodity price', regex: /preco do grao baixo|commodity baixa|mercado ruim/ },
  { key: 'soil_limitation', label: 'soil limitation', regex: /solo|compactacao|fertilidade|arenoso|argiloso/ },
  { key: 'climate_uncertainty', label: 'climate uncertainty', regex: /clima|seca|veranico|chuva|incerteza climatica/ },
  { key: 'new_customer', label: 'new customer', regex: /novo cliente|primeira visita|prospeccao/ },
  { key: 'lost_customer', label: 'lost customer', regex: /cliente perdido|perdeu cliente|voltou para concorrente/ },
  { key: 'upsell_opportunity', label: 'upsell opportunity', regex: /upsell|ampliar participacao|aumentar espaco/ },
  { key: 'cross_sell_opportunity', label: 'cross sell opportunity', regex: /cross sell|mix|portifolio|portfolio/ }
];

type SpinQuestionTemplate = {
  problemType: ProblemTypeKey;
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidadeSolucao: string[];
};

export const SPIN_QUESTION_BANK: SpinQuestionTemplate[] = [
  {
    problemType: 'price_discussion',
    situacao: ['Hoje, como vocês comparam alternativas: por preço unitário, custo por hectare ou resultado final da área?'],
    problema: ['Onde a decisão por menor preço já trouxe perda de eficiência, retrabalho ou frustração de resultado?'],
    implicacao: ['Quando a compra é defendida só por preço, qual custo oculto aparece depois na produtividade, no risco e na margem?'],
    necessidadeSolucao: ['Que critério técnico-econômico precisa ficar claro para tirar a decisão da guerra de preço?']
  },
  {
    problemType: 'low_productivity',
    situacao: ['Quais talhões ou fases da cultura estão ficando abaixo do potencial e como vocês medem isso hoje?'],
    problema: ['Onde a produtividade está escapando: fertilização, timing, solo, clima ou execução?'],
    implicacao: ['Se esse padrão seguir, quanto isso custa em sacas, faturamento e margem por hectare?'],
    necessidadeSolucao: ['Que evidência prática você precisa para ajustar o manejo com foco em produtividade rentável?']
  },
  {
    problemType: 'low_efficiency',
    situacao: ['Como vocês acompanham hoje a eficiência do investimento em fertilização e nutrição na fazenda?'],
    problema: ['Em quais decisões a fazenda investe, mas converte pouco em resposta produtiva e econômica?'],
    implicacao: ['Qual impacto isso tem no custo total, no caixa e na previsibilidade da safra?'],
    necessidadeSolucao: ['Que indicador de eficiência precisa melhorar para justificar a mudança de manejo?']
  },
  {
    problemType: 'wrong_fertilization',
    situacao: ['Como a recomendação de fertilização está sendo definida hoje: análise, histórico, hábito ou comparação por fórmula?'],
    problema: ['Onde a adubação atual está desalinhada do ambiente, da fase ou da meta econômica da área?'],
    implicacao: ['Se a fertilização continuar mal posicionada, qual risco aparece em produtividade, qualidade e desperdício de investimento?'],
    necessidadeSolucao: ['Que critério técnico e econômico precisa ficar provado para corrigir essa estratégia?']
  },
  {
    problemType: 'risk_exposure',
    situacao: ['Quais riscos estão mais pressionando a decisão hoje: clima, caixa, solo, janela ou execução?'],
    problema: ['Onde a operação está mais exposta a perda por falta de previsibilidade ou resposta técnica?'],
    implicacao: ['Se esse risco se materializar, qual efeito direto você espera em margem, produtividade e tomada de decisão?'],
    necessidadeSolucao: ['Qual solução seria defensável se ela reduzisse risco sem virar custo improdutivo?']
  },
  {
    problemType: 'commodity_mentality',
    situacao: ['Quando o assunto é fertilização, qual parte da decisão ainda é tratada como commodity?'],
    problema: ['Onde essa lógica de commodity faz a fazenda ignorar eficiência, estabilidade e custo oculto?'],
    implicacao: ['Quanto essa visão simplificada pode custar no fechamento econômico da safra?'],
    necessidadeSolucao: ['Que tipo de comparação faria sentido para sair de commodity e entrar em valor agronômico-econômico?']
  },
  {
    problemType: 'lack_of_planning',
    situacao: ['Como vocês planejam hoje a decisão de compra e posicionamento nutricional ao longo da safra?'],
    problema: ['Onde a falta de planejamento está comprimindo janela, qualidade de decisão e execução?'],
    implicacao: ['Qual custo aparece quando a decisão entra tarde e a fazenda perde o melhor momento de posicionamento?'],
    necessidadeSolucao: ['O que precisa ficar combinado agora para a próxima decisão não voltar para o improviso?']
  },
  {
    problemType: 'false_economy',
    situacao: ['Em quais itens a fazenda costuma economizar primeiro quando sente pressão de caixa ou mercado?'],
    problema: ['Onde essa economia aparente já virou perda real de produtividade, estabilidade ou qualidade?'],
    implicacao: ['Se a fazenda repetir esse corte, qual custo maior tende a aparecer no fim da safra?'],
    necessidadeSolucao: ['Que conta precisa ficar clara para separar economia real de falsa economia?']
  }
];

export const EPA_BANK: Array<{ problemType: ProblemTypeKey; lines: string[] }> = [
  { problemType: 'price_discussion', lines: ['Preço baixo sem resposta produtiva é só custo mal disfarçado.', 'A decisão correta não é a mais barata na entrada, é a que fecha melhor no resultado por hectare.'] },
  { problemType: 'low_productivity', lines: ['Quando a produtividade não reage, normalmente o problema não é só produto, é critério de decisão e posicionamento.', 'A área não precisa de mais custo; precisa de investimento mais eficiente e melhor direcionado.'] },
  { problemType: 'low_efficiency', lines: ['Baixa eficiência não destrói a margem de uma vez; ela corrói a rentabilidade decisão após decisão.', 'A pergunta não é quanto custa aplicar, e sim quanto do investimento realmente volta na colheita.'] },
  { problemType: 'wrong_fertilization', lines: ['Fertilização mal posicionada pode parecer economia no pedido, mas cobra caro no talhão.', 'Fórmula semelhante não significa resultado semelhante quando ambiente, fonte e eficiência mudam.'] },
  { problemType: 'risk_exposure', lines: ['Quando o risco aumenta, a fazenda não precisa de aposta; precisa de previsibilidade com critério.', 'Risco alto exige decisão mais inteligente, não necessariamente decisão mais barata.'] },
  { problemType: 'commodity_mentality', lines: ['Quando tudo vira commodity, a fazenda deixa de enxergar onde está ganhando e onde está perdendo margem.', 'O insumo pode até parecer igual no pedido, mas o efeito econômico raramente é igual no sistema.'] },
  { problemType: 'lack_of_planning', lines: ['Planejar cedo não é burocracia; é proteger janela, execução e qualidade de decisão.', 'Quem decide tarde normalmente paga mais e ainda executa pior.'] },
  { problemType: 'false_economy', lines: ['Cortar investimento no lugar errado costuma aliviar o caixa no curto prazo e apertar a margem na colheita.', 'Falsa economia é quando o desconto na compra aumenta o custo por hectare no fim do ciclo.'] }
];

export const VALUE_NARRATIVE_BANK: Array<{ key: string; lines: string[] }> = [
  { key: 'margin_per_hectare', lines: ['Leve a conversa para margem por hectare, porque é ali que a decisão mostra se foi boa ou só barata.', 'Comparar preço sem comparar margem é decidir sem ver a conta completa.'] },
  { key: 'hidden_cost', lines: ['O custo invisível aparece em baixa resposta, retrabalho, perda de janela e instabilidade.', 'O barato aparente quase sempre transfere custo para outra etapa da safra.'] },
  { key: 'efficiency', lines: ['Eficiência é transformar investimento em resposta agronômica e retorno econômico.', 'A fazenda captura mais valor quando cada real investido converte melhor no talhão.'] },
  { key: 'stability', lines: ['Estabilidade vale porque protege produtividade em cenários imperfeitos.', 'Resultado consistente reduz risco de caixa e melhora a confiança da decisão.'] },
  { key: 'predictability', lines: ['Previsibilidade de resposta ajuda a fazenda a decidir melhor e errar menos.', 'Quanto mais previsível o sistema, menor o peso da compra por impulso ou medo.'] },
  { key: 'risk_reduction', lines: ['Reduzir risco não é travar a operação; é comprar segurança produtiva com critério.', 'Valor aparece quando a solução diminui a chance de perda cara no ciclo.'] },
  { key: 'long_term_soil_health', lines: ['Solo saudável sustenta produtividade e reduz dependência de correções reativas.', 'Visão de longo prazo em fertilidade melhora eficiência e estabilidade do sistema.'] },
  { key: 'technology_adoption', lines: ['Tecnologia só vira valor quando melhora execução, eficiência e previsibilidade.', 'Adotar tecnologia com método reduz erro e aumenta retorno do manejo.'] },
  { key: 'profitability_vs_price', lines: ['Preço é fotografia; rentabilidade é o filme completo da decisão.', 'A pergunta certa não é quanto custa comprar, e sim quanto sobra depois de produzir.'] }
];

export const AGRONOMIC_ARGUMENT_BANK: Array<{ theme: ScenarioAnalysis['primaryTheme'] | 'geral'; lines: string[] }> = [
  { theme: 'adubo', lines: ['Nutrição bem posicionada aumenta a eficiência de uso dos nutrientes e melhora a conversão do investimento em produtividade.', 'Fertilização equilibrada protege teto produtivo, reduz variabilidade e melhora retorno por hectare.'] },
  { theme: 'biologico', lines: ['Quando bem posicionado, o bioinsumo ajuda a estabilizar resposta fisiológica e complementar a estratégia de manejo.', 'Biológico não deve ser vendido por moda, mas por consistência de uso e função clara dentro do sistema.'] },
  { theme: 'irrigacao', lines: ['Fertirrigação e manejo preciso elevam controle, eficiência e qualidade em culturas mais intensivas.', 'Precisão de água e nutriente melhora previsibilidade e reduz desperdício em ambientes irrigados.'] },
  { theme: 'semente', lines: ['A genética certa precisa conversar com o ambiente, a fertilidade e a meta econômica da área.', 'Decisão de semente ruim limita teto produtivo antes mesmo de a safra começar.'] },
  { theme: 'defensivo', lines: ['Perda evitada também é valor: proteção correta conserva produtividade e reduz custo de falha.', 'Timing e programa consistente contam tanto quanto o produto para defender rentabilidade.'] },
  { theme: 'geral', lines: ['Eficiência nutricional, fertilidade de solo e posicionamento correto do manejo definem boa parte do resultado econômico.', 'Agronomia boa não é a que explica bonito; é a que melhora produtividade, estabilidade e margem no campo.'] }
];

export const SALES_MISTAKE_BANK = [
  'talking price too early',
  'suggesting product too soon',
  'not asking questions',
  'not reframing problem',
  'not showing value',
  'not guiding decision',
  'not creating impact',
  'accepting objection too fast'
] as const;

export const classifyByBank = <T extends string>(text: string, bank: Array<BankRule<T>>): T[] =>
  bank.filter((item) => item.regex.test(text)).map((item) => item.key);

export const detectProblemType = (text: string): ProblemTypeKey => {
  if (/preco|desconto|cotacao|caro|barato/.test(text)) return 'price_discussion';
  if (/baixa produtividade|produtividade baixa|queda de produtividade/.test(text)) return 'low_productivity';
  if (/baixa eficiencia|nao converte|ineficiencia/.test(text)) return 'low_efficiency';
  if (/adubacao errada|fertilizacao errada|formula errada|mal posicionado/.test(text)) return 'wrong_fertilization';
  if (/risco|clima|incerteza|exposto/.test(text)) return 'risk_exposure';
  if (/commodity|tudo igual|formula igual/.test(text)) return 'commodity_mentality';
  if (/planejamento|atraso|ultima hora|janela/.test(text)) return 'lack_of_planning';
  return 'false_economy';
};

export const inferSeasonMomentFromText = (text: string): string => {
  if (/plantio|pre-plantio|abertura de safra/.test(text)) return 'plantio';
  if (/vegetativo|cobertura/.test(text)) return 'vegetativo';
  if (/florada|reprodutivo/.test(text)) return 'reprodutivo';
  if (/enchimento|graos|colheita|qualidade final/.test(text)) return 'enchimento/colheita';
  if (/fertirrigacao|irrigado|pivo/.test(text)) return 'fertirrigação';
  return 'momento crítico da safra';
};

export const getSpinBankByProblem = (problemType: ProblemTypeKey): SpinQuestionTemplate =>
  SPIN_QUESTION_BANK.find((item) => item.problemType === problemType) ?? SPIN_QUESTION_BANK[0];

export const getEpaProvocationsByProblem = (problemType: ProblemTypeKey): string[] =>
  EPA_BANK.find((item) => item.problemType === problemType)?.lines ?? [];

export const getObjectionStrategies = (text: string): Array<{ key: ObjectionKey; label: string; responseStrategy: string }> =>
  OBJECTION_BANK.filter((item) => item.regex.test(text)).map((item) => ({
    key: item.key,
    label: item.label,
    responseStrategy: item.responseStrategy
  }));

export const getAgronomicArgumentsByTheme = (theme: ScenarioAnalysis['primaryTheme']): string[] => {
  const specific = AGRONOMIC_ARGUMENT_BANK.find((item) => item.theme === theme)?.lines ?? [];
  const general = AGRONOMIC_ARGUMENT_BANK.find((item) => item.theme === 'geral')?.lines ?? [];
  return [...specific, ...general];
};

export const getValueNarratives = (problemType: ProblemTypeKey, profiles: FarmerProfileKey[]): string[] => {
  const keys = ['margin_per_hectare', 'hidden_cost', 'efficiency', 'risk_reduction', 'profitability_vs_price'];

  if (problemType === 'low_productivity') keys.unshift('stability');
  if (problemType === 'wrong_fertilization') keys.unshift('long_term_soil_health');
  if (profiles.includes('technology_adopter') || profiles.includes('innovation_seeker')) keys.unshift('technology_adoption');
  if (profiles.includes('margin_focused_farmer')) keys.unshift('margin_per_hectare');

  return keys.flatMap((key) => VALUE_NARRATIVE_BANK.find((item) => item.key === key)?.lines ?? []);
};

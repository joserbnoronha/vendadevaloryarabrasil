export const VALUE_SELLING_GLOBAL_RULES = {
  priority: [
    'productivity',
    'ROI_per_hectare',
    'efficiency',
    'risk_reduction',
    'crop_stability',
    'quality',
    'nutrient_use_efficiency'
  ],
  avoid: ['price_only', 'commodity_logic', 'discount_first', 'product_without_diagnosis'],
  reasoningModel: ['SPIN', 'Challenger', 'OPC', 'ValueSelling', 'AgronomicDiagnosis']
} as const;

export const YARA_INSTITUTIONAL_FOUNDATION = {
  purpose: 'alimentar o mundo de forma responsável e proteger o planeta',
  mission: 'liderar uma nutrição de plantas baseada em ciência, eficiência e sustentabilidade para gerar valor ao produtor',
  values: ['ambição', 'curiosidade', 'colaboração', 'responsabilidade'],
  globalPositioning: [
    'liderança global em nutrição de plantas',
    'forte base em ciência agronômica, inovação e execução no campo',
    'decisão comercial orientada por produtividade, eficiência e sustentabilidade'
  ],
  sustainability: [
    'agricultura climaticamente inteligente',
    'eficiência de uso de nutrientes',
    'redução de perdas e emissões',
    'saúde de solo e previsibilidade de longo prazo'
  ],
  premiumNutrition: [
    'nutrição premium não é custo extra, é ferramenta para capturar produtividade, qualidade e estabilidade',
    'o argumento deve sair do preço por tonelada e migrar para retorno por hectare e risco evitado'
  ],
  cropNutritionExpertise: [
    'diagnóstico agronômico por cultura, ambiente, fase e objetivo econômico',
    'recomendação conectada a produtividade, qualidade comercial, margem e previsibilidade'
  ],
  digitalFarming: [
    'uso de dados, ferramentas digitais e agronomia aplicada para apoiar decisão',
    'adoção tecnológica como meio para eficiência, precisão e previsibilidade'
  ],
  brazilPositioning: [
    'forte presença no agro brasileiro com foco em nutrição vegetal, relacionamento técnico e valor por sistema',
    'relevância em soja, milho, café, cana, algodão, trigo, feijão, pastagens, frutas e hortaliças'
  ],
  conversationDrivers: [
    'produtividade',
    'rentabilidade',
    'margem por hectare',
    'redução de risco',
    'previsibilidade',
    'saúde do solo',
    'adoção de tecnologia',
    'eficiência'
  ]
} as const;

export const ROI_SCENARIO_MULTIPLIERS = {
  conservador: 0.6,
  moderado: 1.0,
  agressivo: 1.3
} as const;

export const YARA_LINE_ROLE_MAP = {
  YaraAmplix: { role: 'estabilidade e eficiência', use: 'lavouras de alto risco / estresse / abertura de safra' },
  YaraVita: { role: 'ajuste fino e teto produtivo', use: 'fases críticas, florada e enchimento' },
  YaraMila: { role: 'base de alta eficiência', use: 'plantio e adubação de base' },
  YaraTera: { role: 'precisão máxima', use: 'fertirrigação, irrigado, HF, café, citrus' },
  YaraLiva: { role: 'qualidade e vigor', use: 'culturas de alto padrão e qualidade final' },
  YaraBela: { role: 'eficiência de nitrogênio', use: 'fase vegetativa com alta demanda de N' },
  YaraVera: { role: 'fonte de nitrogênio', use: 'suporte de N em sistemas de alta resposta' },
  YaraRega: { role: 'NPK para fertirrigação', use: 'manejo em sistemas irrigados' }
} as const;

export const YARA_LINE_GAIN_PERCENT: Record<string, { min: number; max: number }> = {
  YaraAmplix: { min: 3, max: 8 },
  YaraVita: { min: 4, max: 10 },
  YaraMila: { min: 5, max: 12 },
  YaraLiva: { min: 3, max: 7 },
  YaraTera: { min: 6, max: 15 },
  YaraBela: { min: 3, max: 6 },
  YaraVera: { min: 2, max: 5 },
  YaraRega: { min: 4, max: 10 }
};

export const CROP_BENCHMARKS = {
  soja: { avgYield: 65, pricePerBag: 120, unit: 'sc/ha' },
  milho: { avgYield: 180, pricePerBag: 60, unit: 'sc/ha' },
  algodao: { avgYield: 320, pricePerBag: 4.2, unit: '@/ha (referência convertida)' },
  cafe: { avgYield: 35, pricePerBag: 900, unit: 'sc/ha' },
  cana: { avgYield: 90, pricePerBag: 120, unit: 't/ha (referência convertida)' },
  trigo: { avgYield: 55, pricePerBag: 70, unit: 'sc/ha' },
  feijao: { avgYield: 45, pricePerBag: 240, unit: 'sc/ha' },
  pastagem: { avgYield: 14, pricePerBag: 320, unit: '@/ha (referência convertida)' },
  frutas: { avgYield: 32, pricePerBag: 1800, unit: 't/ha (referência convertida)' },
  vegetais: { avgYield: 38, pricePerBag: 1400, unit: 't/ha (referência convertida)' },
  pecuaria: { avgYield: 18, pricePerBag: 320, unit: '@/ha (referência convertida)' },
  geral: { avgYield: 60, pricePerBag: 120, unit: 'unidade/ha (referência)' }
} as const;

export const YARA_CROP_FOCUS: Record<string, string[]> = {
  soja: ['YaraMila', 'YaraVita', 'YaraAmplix'],
  milho: ['YaraMila', 'YaraBela', 'YaraVita', 'YaraAmplix'],
  cafe: ['YaraLiva', 'YaraTera', 'YaraVita'],
  algodao: ['YaraMila', 'YaraVita', 'YaraAmplix'],
  trigo: ['YaraMila', 'YaraBela', 'YaraVita'],
  feijao: ['YaraMila', 'YaraVita', 'YaraLiva'],
  pastagem: ['YaraMila', 'YaraBela', 'YaraVera'],
  frutas: ['YaraLiva', 'YaraTera', 'YaraVita'],
  citrus: ['YaraLiva', 'YaraTera', 'YaraVita'],
  cana: ['YaraMila', 'YaraVita'],
  hortalicas: ['YaraLiva', 'YaraTera', 'YaraVita'],
  vegetais: ['YaraLiva', 'YaraTera', 'YaraVita'],
  geral: ['YaraMila', 'YaraVita', 'YaraAmplix']
};

export const YARA_PROBLEM_TO_LINES: Array<{ regex: RegExp; lines: string[] }> = [
  { regex: /baixa produtividade|baixo rendimento|pouca saca|baixa resposta/, lines: ['YaraMila', 'YaraVita', 'YaraAmplix'] },
  { regex: /estresse|seca|veranico|clima/, lines: ['YaraAmplix', 'YaraVita'] },
  { regex: /baixa qualidade|padrao ruim|qualidade final/, lines: ['YaraLiva', 'YaraVita'] },
  { regex: /variabilidade|desuniforme|desuniformidade/, lines: ['YaraAmplix', 'YaraTera'] },
  { regex: /falta de controle|baixa precisao|fertirrigacao/, lines: ['YaraTera', 'YaraRega'] },
  { regex: /enraizamento|raiz fraca|arranque ruim/, lines: ['YaraAmplix'] },
  { regex: /florada|pegamento/, lines: ['YaraVita'] },
  { regex: /enchimento|grao chocho|mal enchimento/, lines: ['YaraVita', 'YaraLiva'] },
  { regex: /perda de nitrogenio|volatilizacao|nitrogenio/, lines: ['YaraBela', 'YaraMila', 'YaraVera'] },
  { regex: /margem apertada|rentabilidade|lucro|roi/, lines: ['YaraMila', 'YaraAmplix', 'YaraVita'] },
  { regex: /solo|fertilidade|correcao|saude do solo/, lines: ['YaraMila', 'YaraLiva'] },
  { regex: /tecnologia|adocao|digital|dados|mapa|precisao/, lines: ['YaraTera', 'YaraMila'] }
];

export const YARA_STAGE_TO_LINES: Array<{ regex: RegExp; lines: string[] }> = [
  { regex: /plantio|abertura de safra|base/, lines: ['YaraMila', 'YaraAmplix'] },
  { regex: /vegetativo/, lines: ['YaraVita', 'YaraAmplix', 'YaraBela'] },
  { regex: /reprodutivo|florada|enchimento|graos/, lines: ['YaraVita', 'YaraLiva'] },
  { regex: /fertirrigacao|pivo|irrigado/, lines: ['YaraTera', 'YaraRega'] }
];

export const YARA_OBJECTIVE_TO_LINES: Array<{ regex: RegExp; lines: string[] }> = [
  { regex: /aumentar produtividade|mais sacas|teto produtivo/, lines: ['YaraMila', 'YaraVita', 'YaraAmplix'] },
  { regex: /reduzir risco|estabilidade|previsibilidade/, lines: ['YaraAmplix', 'YaraTera'] },
  { regex: /melhorar qualidade|padrao comercial|valor de venda/, lines: ['YaraLiva', 'YaraVita'] },
  { regex: /precisao|controle fino/, lines: ['YaraTera', 'YaraRega'] },
  { regex: /eficiencia|retorno por hectare|roi/, lines: ['YaraMila', 'YaraBela', 'YaraVera'] },
  { regex: /margin|margem|rentabilidade|profitabilidade|lucratividade/, lines: ['YaraMila', 'YaraAmplix', 'YaraVita'] },
  { regex: /sustentabilidade|solo|longo prazo|clima/, lines: ['YaraAmplix', 'YaraLiva', 'YaraTera'] },
  { regex: /digital|tecnologia|dados|agricultura de precisao/, lines: ['YaraTera', 'YaraMila'] }
];

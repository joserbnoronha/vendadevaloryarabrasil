import type { ScenarioAnalysis } from '../types';

export const APP_NAME = 'Yara Way of Selling';
export const APP_SUBTITLE = 'Inteligência de Preparação Consultiva para Vendas de Valor no Agro';

export const TAG_PATTERNS: Array<{ tag: string; regex: RegExp }> = [
  { tag: 'upsell', regex: /\bupsell\b|expansao|ticket|premium/ },
  { tag: 'cross_sell', regex: /\bcross\s?-?sell\b|portfolio|mix/ },
  { tag: 'primeira_visita', regex: /primeira visita|potencial cliente|prospeccao|novo cliente/ },
  { tag: 'orientado_preco', regex: /preco|desconto|barato|cotacao|comparativo/ },
  { tag: 'cooperativa', regex: /cooperativa|co-op/ },
  { tag: 'resistencia', regex: /resistente|resistencia|cetico|nao acredita/ },
  { tag: 'stakeholders_multiplos', regex: /multiplos stakeholders|socios|familia|comite|compras/ },
  { tag: 'revisao_relacionamento', regex: /revisao de relacionamento|renovacao|conta importante/ },
  { tag: 'pos_venda', regex: /pos-venda|implantacao|adocao/ },
  { tag: 'cenario_competitivo', regex: /competitivo|concorrencia|concorrente|leilao/ },
  { tag: 'soja', regex: /soja|oleaginosa/ },
  { tag: 'milho', regex: /milho|safrinha/ },
  { tag: 'algodao', regex: /algodao|cotton/ },
  { tag: 'cana', regex: /cana|usina/ },
  { tag: 'cafe', regex: /cafe/ },
  { tag: 'trigo', regex: /trigo|wheat/ },
  { tag: 'feijao', regex: /feijao|beans?/ },
  { tag: 'pastagem', regex: /pastagem|pasto|forrageira/ },
  { tag: 'frutas', regex: /frutas?|pomar|citrus|citros|uva|maca|banana/ },
  { tag: 'vegetais', regex: /vegetais|hortalicas|hortifruti|hf|tomate|batata|cebola|alface/ },
  { tag: 'pecuaria', regex: /pecuaria|boi|gado|confinamento/ }
];

export const PRIORITY_BY_TAG: Array<{ when: (a: ScenarioAnalysis) => boolean; value: ScenarioAnalysis['prioridade'] }> = [
  { when: (a) => a.tags.includes('orientado_preco') || a.tags.includes('cenario_competitivo'), value: 'competicao' },
  { when: (a) => a.tags.includes('upsell') || a.tags.includes('cross_sell'), value: 'expansao' },
  { when: (a) => a.tags.includes('revisao_relacionamento') || a.tags.includes('pos_venda'), value: 'retencao' },
  { when: (a) => a.tags.includes('primeira_visita'), value: 'diagnostico' }
];

export const DEFAULT_PRIORITY: ScenarioAnalysis['prioridade'] = 'margem';

export const CULTURA_CONTEXT: Record<ScenarioAnalysis['cultura'], { nome: string; risco: string; oportunidade: string }> = {
  geral: {
    nome: 'operação agro',
    risco: 'decisões de curto prazo que pressionam margem ao longo do ciclo',
    oportunidade: 'ganhos consistentes de produtividade e previsibilidade'
  },
  soja: {
    nome: 'operação de soja',
    risco: 'perder janela operacional e comprometer potencial produtivo da safra',
    oportunidade: 'proteger teto produtivo e reduzir variabilidade por talhão'
  },
  milho: {
    nome: 'operação de milho',
    risco: 'elevação de custo por hectare sem conversão em produtividade',
    oportunidade: 'melhor equilíbrio entre investimento, stand e estabilidade'
  },
  algodao: {
    nome: 'operação de algodão',
    risco: 'perda de produtividade e qualidade de fibra por falhas de nutrição e timing',
    oportunidade: 'ganho de produtividade, qualidade e valor por hectare com maior precisão de manejo'
  },
  cana: {
    nome: 'operação de cana',
    risco: 'quebra de longevidade do canavial e aumento de custo de reforma',
    oportunidade: 'melhorar TCH/ATR com maior eficiência operacional'
  },
  cafe: {
    nome: 'operação de café',
    risco: 'oscilações de produtividade e perda de qualidade comercial',
    oportunidade: 'mais uniformidade e qualidade com melhor previsibilidade financeira'
  },
  trigo: {
    nome: 'operação de trigo',
    risco: 'perda de teto produtivo e qualidade por manejo nutricional mal ajustado',
    oportunidade: 'melhorar produtividade, peso hectolitro e rentabilidade por hectare'
  },
  feijao: {
    nome: 'operação de feijão',
    risco: 'variabilidade alta de produtividade e qualidade em janelas curtas de decisão',
    oportunidade: 'ganhar uniformidade, padrão comercial e previsibilidade de colheita'
  },
  pastagem: {
    nome: 'operação de pastagem',
    risco: 'baixa conversão de fertilidade em ganho por área e menor eficiência do sistema',
    oportunidade: 'elevar produção por hectare e melhorar eficiência do uso da área'
  },
  frutas: {
    nome: 'operação de frutas',
    risco: 'perda de padrão comercial, qualidade e valor de venda por falhas de manejo fino',
    oportunidade: 'capturar mais valor por qualidade, regularidade e eficiência nutricional'
  },
  vegetais: {
    nome: 'operação de hortaliças e vegetais',
    risco: 'perder qualidade, padronização e rentabilidade por falhas de precisão',
    oportunidade: 'maximizar valor comercial com fertirrigação, nutrição fina e maior previsibilidade'
  },
  pecuaria: {
    nome: 'operação pecuária',
    risco: 'baixa eficiência alimentar e giro abaixo do potencial',
    oportunidade: 'ganho de arroba por área com decisão técnica-econômica mais precisa'
  }
};

export const FABRICANTE_REFERENCIAS: Array<{
  fabricante: string;
  regex: RegExp;
  fontes: string[];
  focoConversa: string;
  categoria?: 'nutricao' | 'protecao' | 'sementes' | 'maquinas' | 'cooperativa' | 'servicos';
  temas?: Array<ScenarioAnalysis['primaryTheme'] | 'geral'>;
}> = [
  {
    fabricante: 'Corteva',
    regex: /corteva/,
    fontes: ['https://www.corteva.com.br/', 'https://www.corteva.com.br/produtos-e-servicos.html'],
    focoConversa: 'comparar posicionamento por resultado técnico + retorno econômico, não por comparação isolada de item.',
    categoria: 'protecao',
    temas: ['defensivo', 'semente', 'geral']
  },
  {
    fabricante: 'Yara',
    regex: /yara/,
    fontes: ['https://www.yara.com.br/', 'https://www.yara.com.br/nutricao-de-plantas/'],
    focoConversa:
      'avaliar impacto em eficiência nutricional, produtividade, sustentabilidade do sistema e previsibilidade de resultado por hectare.',
    categoria: 'nutricao',
    temas: ['adubo', 'geral']
  },
  {
    fabricante: 'Bayer',
    regex: /bayer|crop\\s*science/,
    fontes: ['https://www.cropscience.bayer.com.br/', 'https://www.cropscience.bayer.com.br/produtos'],
    focoConversa: 'discutir redução de risco operacional e consistência de performance no ciclo.',
    categoria: 'protecao',
    temas: ['defensivo', 'semente', 'geral']
  },
  {
    fabricante: 'Syngenta',
    regex: /syngenta/,
    fontes: ['https://www.syngenta.com.br/', 'https://www.syngenta.com.br/produtos'],
    focoConversa: 'mapear impacto em estabilidade produtiva e custo total de decisão por safra.',
    categoria: 'protecao',
    temas: ['defensivo', 'semente', 'geral']
  },
  {
    fabricante: 'BASF',
    regex: /basf/,
    fontes: ['https://www.agro.basf.com.br/', 'https://www.agro.basf.com.br/produtos'],
    focoConversa: 'comparar propostas por risco evitado, produtividade e retorno econômico do manejo.',
    categoria: 'protecao',
    temas: ['defensivo', 'geral']
  },
  {
    fabricante: 'Monsanto (legado Bayer)',
    regex: /monsanto|monsoy/,
    fontes: [
      'https://www.bayer.com/pt/br/monsanto-na-bayer',
      'https://www.cropscience.bayer.com.br/marcas/monsoy'
    ],
    focoConversa:
      'quando o cliente citar Monsanto/Monsoy, atualizar a conversa para o portfólio atual e comparar por resultado no talhão, não por memória de marca.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'Mosaic',
    regex: /mosaic/,
    fontes: ['https://www.mosaicco.com.br/', 'https://www.mosaicco.com.br/pt-br/produtos'],
    focoConversa: 'avaliar eficiência nutricional por fase da cultura e impacto em retorno por hectare.',
    categoria: 'nutricao',
    temas: ['adubo', 'geral']
  },
  {
    fabricante: 'ICL',
    regex: /icl/,
    fontes: ['https://icl-growingsolutions.com/pt-br/', 'https://icl-growingsolutions.com/pt-br/produtos/'],
    focoConversa: 'comparar manejo nutricional por resultado agronômico e estabilidade operacional ao longo da safra.',
    categoria: 'nutricao',
    temas: ['adubo', 'biologico', 'geral']
  },
  {
    fabricante: 'Ihara',
    regex: /ihara/,
    fontes: ['https://www.ihara.com.br/', 'https://www.ihara.com.br/produtos/'],
    focoConversa: 'focar em programa de manejo e redução de risco de resistência, com visão de ciclo completo.',
    categoria: 'protecao',
    temas: ['defensivo', 'geral']
  },
  {
    fabricante: 'Pioneer',
    regex: /pioneer/,
    fontes: ['https://www.pioneer.com/br/', 'https://www.pioneer.com/br/produtos.html'],
    focoConversa: 'avaliar genética por estabilidade e teto produtivo, conectando escolha de híbrido à meta de margem.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'Brevant',
    regex: /brevant/,
    fontes: ['https://brevant.com.br/', 'https://brevant.com.br/produtos/'],
    focoConversa: 'trazer escolha de material para dentro da estratégia de produtividade, risco e janela operacional.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'DEKALB',
    regex: /dekalb/,
    fontes: ['https://www.dekalb.com.br/', 'https://www.dekalb.com.br/produtos'],
    focoConversa: 'comparar híbrido por desempenho em ambiente real de produção e retorno econômico por área.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'NK Sementes',
    regex: /\bnk\b|nk sementes/,
    fontes: ['https://www.nksementes.com.br/', 'https://www.nksementes.com.br/produtos'],
    focoConversa: 'definir escolha de híbrido por adaptabilidade, estabilidade e resultado econômico final.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'KWS',
    regex: /\bkws\b/,
    fontes: ['https://www.kws.com/br/pt/', 'https://www.kws.com/br/pt/produtos/'],
    focoConversa: 'discutir genética com base em ambiente produtivo, sanidade e previsibilidade de colheita.',
    categoria: 'sementes',
    temas: ['semente', 'geral']
  },
  {
    fabricante: 'Coamo',
    regex: /coamo/,
    fontes: ['https://www.coamo.com.br/', 'https://www.coamo.com.br/servicos'],
    focoConversa: 'em contas com cooperativa, alinhar proposta ao ganho do produtor e sustentabilidade econômica do sistema.',
    categoria: 'cooperativa',
    temas: ['geral', 'servicos']
  },
  {
    fabricante: 'Cocamar',
    regex: /cocamar/,
    fontes: ['https://www.cocamar.com.br/', 'https://www.cocamar.com.br/negocios'],
    focoConversa: 'mostrar valor com linguagem de eficiência da operação e resultado econômico para o produtor.',
    categoria: 'cooperativa',
    temas: ['geral', 'servicos']
  },
  {
    fabricante: 'Copacol',
    regex: /copacol/,
    fontes: ['https://www.copacol.com.br/', 'https://www.copacol.com.br/negocios/'],
    focoConversa: 'adaptar proposta à lógica cooperativista: resultado econômico, assistência técnica e execução no campo.',
    categoria: 'cooperativa',
    temas: ['geral', 'servicos']
  }
];

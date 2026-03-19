import type { ScenarioAnalysis } from '../types';

type ChallengeTheme = ScenarioAnalysis['primaryTheme'] | 'geral';

export interface AgroChallengeSignal {
  id: string;
  titulo: string;
  contexto: string;
  comoUsarNaConversa: string;
  perguntaAberta: string;
  temas: ChallengeTheme[];
  fontes: string[];
}

export const AGRO_CHALLENGE_SIGNALS: AgroChallengeSignal[] = [
  {
    id: 'clima-janela',
    titulo: 'Janela da safra mais apertada com clima instável',
    contexto:
      'Com clima mais irregular, decisão atrasada costuma virar perda de janela, retrabalho e custo extra por hectare.',
    comoUsarNaConversa:
      'Leve a conversa para previsibilidade e plano de execução por etapa, não só para preço do item.',
    perguntaAberta:
      'Onde a instabilidade do clima mais tem pressionado custo, produtividade ou risco na sua operação hoje?',
    temas: ['geral', 'adubo', 'defensivo', 'semente', 'irrigacao', 'maquinario', 'servicos', 'biologico'],
    fontes: [
      'https://www.conab.gov.br/perspectivas-para-a-agropecuaria',
      'https://www.embrapa.br/busca-de-noticias/-/noticia/96704773/embrapa-faz-alerta-sobre-riscos-do-clima-na-producao-de-alimentos'
    ]
  },
  {
    id: 'credito-capital',
    titulo: 'Crédito mais seletivo e capital mais caro',
    contexto:
      'Quando o dinheiro fica mais seletivo, decisões com retorno mal explicado tendem a travar, mesmo com boa solução técnica.',
    comoUsarNaConversa:
      'Mostre retorno por área, prazo de captura e risco evitado para facilitar aprovação técnica e financeira.',
    perguntaAberta:
      'Como vocês estão priorizando investimentos quando caixa e crédito ficam mais apertados?',
    temas: ['geral', 'adubo', 'defensivo', 'semente', 'biologico', 'irrigacao', 'maquinario', 'servicos'],
    fontes: [
      'https://agenciagov.ebc.com.br/noticias/202602/governo-federal-amplia-credito-rural',
      'https://www.conab.gov.br/perspectivas-para-a-agropecuaria'
    ]
  },
  {
    id: 'tecnologia-embarcada',
    titulo: 'Tecnologia embarcada ainda subutilizada no campo',
    contexto:
      'Em muitas fazendas, parte da tecnologia embarcada existe, mas não entra no padrão diário de uso e gestão.',
    comoUsarNaConversa:
      'Diferencie por adoção prática: treinamento, rotina de uso e indicador de resultado no talhão.',
    perguntaAberta:
      'Quais recursos da máquina já existem na fazenda, mas ainda não estão virando resultado de forma consistente?',
    temas: ['geral', 'maquinario', 'servicos'],
    fontes: [
      'https://www.gov.br/agricultura/pt-br/assuntos/noticias/mcti-e-mapa-lancam-programa-rumo-a-100-de-cobertura-de-internet-no-campo',
      'https://www.embrapa.br/agropensa/busca-de-publicacoes/-/publicacao/1137318/agricultura-digital-no-brasil-tendencias-desafios-e-oportunidades'
    ]
  },
  {
    id: 'produtividade-margem',
    titulo: 'Pressão por produtividade com margem sob risco',
    contexto:
      'Mesmo com boa produção total do país, a margem da fazenda depende cada vez mais de execução fina por área e decisão técnica no momento certo.',
    comoUsarNaConversa:
      'Conecte recomendação técnica com impacto econômico por hectare e estabilidade de resultado.',
    perguntaAberta:
      'Qual frente hoje tem mais chance de melhorar margem sem aumentar risco operacional?',
    temas: ['geral', 'adubo', 'defensivo', 'semente', 'biologico', 'irrigacao', 'maquinario'],
    fontes: ['https://www.conab.gov.br/perspectivas-para-a-agropecuaria']
  }
];

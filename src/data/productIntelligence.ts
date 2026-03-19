import type { ScenarioAnalysis } from '../types';

export interface ProductIntelligence {
  produto: string;
  fabricante: string;
  aliases: RegExp[];
  temas: Array<ScenarioAnalysis['primaryTheme'] | 'geral'>;
  propostaValorCurta: string;
  fortalezasCompetitivas: string[];
  cuidadosDePosicionamento: string[];
  ganchosSpin: {
    situacao: string[];
    problema: string[];
    implicacao: string[];
    necessidadeSolucao: string[];
  };
  fontes: string[];
  atualizadoEm: string;
}

export const PRODUCT_INTELLIGENCE_DB: ProductIntelligence[] = [
  {
    produto: 'Gapper',
    fabricante: 'Corteva',
    aliases: [/\bgapper\b/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta:
      'Dessecação com foco em janela operacional, uniformidade da lavoura e sustentação de resultado no sistema soja-milho.',
    fortalezasCompetitivas: [
      'Herbicida sistêmico com tecnologia Rinskor Active, com posicionamento em soja e milho.',
      'Na soja, entra na dessecação pré-colheita (estádio R7.1), ajudando na uniformidade e antecipação da colheita.',
      'No milho, posiciona em dessecação pré-plantio com foco em folhas largas e integração no manejo.',
      'Comparado a decisões por preço isolado, permite defender valor por janela, previsibilidade e execução da segunda safra.'
    ],
    cuidadosDePosicionamento: [
      'A recomendação técnica deve seguir bula, dose e estágio corretos para proteger resultado e segurança de uso.',
      'Aplicação e cobertura de alvo precisam de calibração adequada do equipamento e condição climática favorável.',
      'Converse sobre risco de deriva e sensibilidade de culturas próximas para evitar perda por aplicação incorreta.'
    ],
    ganchosSpin: {
      situacao: [
        'Hoje, como vocês fazem a dessecação pré-colheita e quais critérios definem o momento da aplicação no R7.1?'
      ],
      problema: ['Onde a falta de uniformidade da maturação tem atrasado colheita e pressionado a janela da segunda safra?'],
      implicacao: [
        'Quando a dessecação não entrega uniformidade no momento certo, qual impacto isso traz em perda de janela e risco no milho safrinha?'
      ],
      necessidadeSolucao: [
        'Que evidência em campo faria você defender uma estratégia de dessecação focada em janela, previsibilidade e resultado final?'
      ]
    },
    fontes: [
      'https://www.corteva.com.br/produtos-e-servicos/protecao-de-cultivos/Gapper.html',
      'https://www.corteva.com/content/dam/dpagco/corteva/la/br/pt/bulas-2025/herbicidas/DOC_Bula_Gapper_Corteva_Br_La_v7.pdf',
      'https://www.corteva.com.br/content/dam/dpagco/corteva/la/br/pt/bulas-2025/fisqp/GAPPER_FDS.pdf'
    ],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Utrisha N',
    fabricante: 'Corteva',
    aliases: [/utrisha\s*n/],
    temas: ['biologico', 'adubo', 'geral'],
    propostaValorCurta:
      'Apoio nutricional complementar com foco em estabilidade produtiva e consistência ao longo do ciclo.',
    fortalezasCompetitivas: [
      'Produto de referência da Corteva em nutrição complementar com abordagem de manejo.',
      'Ajuda a elevar a conversa para eficiência de sistema e previsibilidade de resultado.',
      'Permite defender valor por consistência no campo, não por preço isolado de insumo.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar conforme recomendação oficial do fabricante para cultura, fase e dose.',
      'Alinhar expectativa de resultado com ambiente, clima e qualidade de aplicação.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês definem hoje a estratégia de nutrição complementar em cada fase da cultura?'],
      problema: ['Em quais áreas a estratégia atual ainda não entrega estabilidade de resultado?'],
      implicacao: ['Quando a nutrição complementar falha, qual impacto aparece em variabilidade e margem por hectare?'],
      necessidadeSolucao: ['Que evidência prática vocês precisam para evoluir o manejo com foco em previsibilidade?']
    },
    fontes: [
      'https://www.corteva.com.br/produtos-e-servicos/biologicos/utrisha-n.html',
      'https://www.corteva.com.br/'
    ],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Enlist System',
    fabricante: 'Corteva',
    aliases: [/enlist\s*system|enlist/],
    temas: ['defensivo', 'semente', 'geral'],
    propostaValorCurta:
      'Sistema integrado para controle de daninhas difíceis com foco em flexibilidade operacional, segurança de aplicação e proteção do rendimento.',
    fortalezasCompetitivas: [
      'Integra genética, sementes e herbicidas em uma lógica de manejo mais robusta.',
      'Ajuda a controlar daninhas difíceis e a reduzir risco de perda por pressão de resistência.',
      'Permite defender valor por estabilidade de sistema e proteção de produtividade, não por preço isolado.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar por diagnóstico de área, histórico de daninhas e janela de aplicação.',
      'Conduzir recomendação dentro de manejo antiresistência e boas práticas de aplicação.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês estão lidando hoje com daninhas difíceis e com a pressão de resistência na área?'],
      problema: ['Onde o manejo atual ainda gera escape, retrabalho ou risco de janela?'],
      implicacao: ['Se esse padrão continuar, qual impacto aparece em custo de controle e proteção de produtividade?'],
      necessidadeSolucao: ['Que condição de resultado precisa ficar clara para avançar com uma estratégia integrada de manejo?']
    },
    fontes: ['https://www.corteva.com.br/', 'https://www.corteva.com.br/produtos-e-servicos.html'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'PowerCore',
    fabricante: 'Corteva',
    aliases: [/powercore/],
    temas: ['semente', 'defensivo', 'geral'],
    propostaValorCurta:
      'Biotecnologia para proteção contra lagartas e maior estabilidade produtiva em ambientes de pressão.',
    fortalezasCompetitivas: [
      'Contribui para controle de lagartas e proteção do potencial da lavoura.',
      'Apoia decisão por estabilidade de resultado e redução de perda produtiva.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar por pressão de praga, ambiente e estratégia de refúgio.',
      'Integrar biotecnologia com manejo completo para preservar eficiência ao longo do tempo.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês avaliam hoje a pressão de lagartas e o impacto dela no rendimento esperado?'],
      problema: ['Em quais áreas a pressão de lagarta ainda limita produtividade e previsibilidade?'],
      implicacao: ['Se essa pressão seguir, quanto pode ser perdido em produtividade e margem por hectare?'],
      necessidadeSolucao: ['Qual nível de proteção e estabilidade você precisa para avançar na decisão desta biotecnologia?']
    },
    fontes: ['https://www.corteva.com.br/', 'https://www.pioneer.com/br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Conkesta',
    fabricante: 'Corteva',
    aliases: [/conkesta/],
    temas: ['semente', 'defensivo', 'geral'],
    propostaValorCurta:
      'Solução biotecnológica para controle de pragas e sustentação de produtividade em cenários de risco.',
    fortalezasCompetitivas: [
      'Ajuda a proteger potencial produtivo com foco em controle de pragas.',
      'Permite discussão de valor por risco evitado e estabilidade do sistema.'
    ],
    cuidadosDePosicionamento: [
      'Definir estratégia por nível de pressão e histórico da área.',
      'Conectar escolha da tecnologia a manejo integrado e objetivo econômico da safra.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês definem hoje a estratégia de proteção da lavoura em áreas de maior pressão de pragas?'],
      problema: ['Onde a estratégia atual ainda deixa risco elevado de perda produtiva?'],
      implicacao: ['Quando o risco de praga não é bem controlado, qual impacto aparece em produtividade e custo operacional?'],
      necessidadeSolucao: ['Que evidência técnica e econômica precisa ficar clara para avançar com essa solução?']
    },
    fontes: ['https://www.corteva.com.br/', 'https://www.pioneer.com/br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Premio',
    fabricante: 'Corteva',
    aliases: [/premio/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta:
      'Inseticida para controle de lagartas com foco em proteção de produtividade e redução de perdas.',
    fortalezasCompetitivas: [
      'Apoia controle de lagartas em momentos críticos do ciclo.',
      'Permite defender valor por produtividade protegida e risco evitado.'
    ],
    cuidadosDePosicionamento: [
      'Aplicar no timing correto e conforme recomendação técnica oficial.',
      'Integrar a estratégia com monitoramento e manejo completo de pragas.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês estão monitorando lagartas e decidindo o momento de entrada no controle?'],
      problema: ['Onde o controle atual ainda deixa escape ou retrabalho?'],
      implicacao: ['Qual impacto em produtividade e margem quando a pressão de lagarta passa do ponto de controle?'],
      necessidadeSolucao: ['Que condição de controle precisa ficar comprovada para avançar com ajuste de programa?']
    },
    fontes: ['https://www.corteva.com.br/produtos-e-servicos/protecao-de-cultivos.html', 'https://www.corteva.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'AproachPower',
    fabricante: 'Corteva',
    aliases: [/aproach\s*power|aproachpower/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta:
      'Fungicida para controle de ferrugem e cercospora com foco em proteção de folha e manutenção do potencial produtivo.',
    fortalezasCompetitivas: [
      'Contribui para manter fotossíntese e estabilidade de rendimento.',
      'Ajuda a defender decisão por proteção de resultado, não por custo unitário da aplicação.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar por fase da cultura, pressão de doença e estratégia antiresistência.',
      'Conectar uso ao impacto esperado em produtividade e margem.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês estruturam hoje o programa de fungicidas e os critérios de aplicação?'],
      problema: ['Onde ainda há oscilação de controle em ferrugem/cercospora que pressiona o resultado?'],
      implicacao: ['Se esse padrão seguir, qual impacto em perda de produtividade e previsibilidade da colheita?'],
      necessidadeSolucao: ['Que evidência em campo precisa ficar clara para ajustar o programa com foco em valor?']
    },
    fontes: ['https://www.corteva.com.br/produtos-e-servicos/protecao-de-cultivos.html', 'https://www.corteva.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Brevant',
    fabricante: 'Corteva',
    aliases: [/brevant/],
    temas: ['semente', 'geral'],
    propostaValorCurta:
      'Sementes de alta performance com foco em produtividade, adaptação regional e consistência de resultado por ambiente.',
    fortalezasCompetitivas: [
      'Ajuda a estruturar decisão de genética por ambiente produtivo e meta de negócio.',
      'Defesa de valor por produtividade e estabilidade, não por preço da semente.'
    ],
    cuidadosDePosicionamento: [
      'Escolher material por ambiente, histórico de área e objetivo de produtividade.',
      'Conectar recomendação à estratégia de manejo e capacidade de execução da fazenda.'
    ],
    ganchosSpin: {
      situacao: ['Quais critérios vocês usam hoje para escolher híbridos/cultivares por ambiente?'],
      problema: ['Em quais áreas o material atual ainda limita produtividade ou estabilidade?'],
      implicacao: ['Quando a escolha de genética fica desalinhada do ambiente, qual impacto aparece em margem por hectare?'],
      necessidadeSolucao: ['Que validação prática você precisa para evoluir a escolha de material com segurança?']
    },
    fontes: ['https://www.brevant.com.br/', 'https://www.corteva.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'YaraAmplix',
    fabricante: 'Yara',
    aliases: [/yara\s*amplix|amplix/],
    temas: ['adubo', 'biologico', 'geral'],
    propostaValorCurta:
      'Bioestimulantes e eficiência nutricional para estabilizar produtividade, fortalecer raiz e melhorar resposta ao investimento na lavoura.',
    fortalezasCompetitivas: [
      'Linha voltada a absorção de nutrientes, desenvolvimento radicular e tolerância a estresse.',
      'Especialmente útil em lavouras de alto investimento, abertura de safra e momentos de maior risco climático.',
      'Permite defender valor por estabilidade produtiva e menor risco de perda, não por custo unitário.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar por fase crítica e objetivo agronômico claro (vigor, raiz, tolerância, uniformidade).',
      'Conectar uso ao contexto da área: limitação nutricional, estresse hídrico, falha de stand ou baixo vigor.',
      'Acordar indicador econômico de validação para mostrar ganho real por hectare.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês têm conduzido hoje o manejo para vigor inicial, raiz e resposta ao adubo em áreas mais desafiadoras?'],
      problema: ['Onde a lavoura ainda perde estabilidade por estresse, baixo enraizamento ou falha de arranque?'],
      implicacao: ['Quando esse padrão se repete, qual impacto aparece em produtividade e risco de perda na safra?'],
      necessidadeSolucao: ['Qual nível de estabilidade de resultado você precisa ver para avançar com uma estratégia de eficiência nutricional?']
    },
    fontes: ['https://www.yara.com.br/', 'https://www.yara.com.br/nutricao-de-plantas/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'YaraMila',
    fabricante: 'Yara',
    aliases: [/yaramila/],
    temas: ['adubo', 'geral'],
    propostaValorCurta:
      'NPK de maior valor agregado e alta eficiência para nutrição uniforme, melhor arranque e maior retorno por hectare.',
    fortalezasCompetitivas: [
      'Nutrientes no mesmo grânulo, melhor distribuição e maior aproveitamento no campo.',
      'Combinação de nitrogênio nítrico e amoniacal para eficiência de base em sistemas tecnificados.',
      'Ajuda a sair da comparação por preço/tonelada e levar a conversa para retorno por hectare.'
    ],
    cuidadosDePosicionamento: [
      'Definir recomendação com base em análise de solo, expectativa de produtividade e histórico de área.',
      'Conectar dose e momento de aplicação ao objetivo econômico da fazenda.'
    ],
    ganchosSpin: {
      situacao: ['Quais fertilizantes NPK vocês usam hoje e como medem resposta por talhão?'],
      problema: ['Onde o manejo atual de base ainda mostra baixa eficiência econômica por hectare?'],
      implicacao: ['Quando o NPK é escolhido só por preço, qual custo aparece no resultado final da safra?'],
      necessidadeSolucao: ['Que validação econômica vocês precisam para migrar para uma decisão por valor total?']
    },
    fontes: ['https://www.yara.com.br/nutricao-de-plantas/', 'https://www.yara.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'YaraVita',
    fabricante: 'Yara',
    aliases: [/yaravita/],
    temas: ['adubo', 'geral'],
    propostaValorCurta: 'Nutrição foliar de maior valor agregado para ajuste fino em fases críticas e elevação do teto produtivo.',
    fortalezasCompetitivas: [
      'Linha de alta eficiência para correção rápida, estímulo fisiológico e suporte em momentos críticos.',
      'Aplicável em pré-florada, enchimento de grãos, pegamento e pós-estresse.',
      'Defesa de valor por sacas/ha, qualidade e padrão comercial, não por custo por litro.'
    ],
    cuidadosDePosicionamento: [
      'Respeitar recomendação de uso por cultura e fase fenológica.',
      'Avaliar integração com o manejo nutricional de base para não gerar sobreposição.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês definem hoje as aplicações foliares ao longo do ciclo?'],
      problema: ['Onde a cultura mais sente perda de desempenho por falha de ajuste nutricional em momento crítico?'],
      implicacao: ['Qual custo aparece quando a correção nutricional é tardia ou mal posicionada?'],
      necessidadeSolucao: ['Que evidência de campo e de margem te dá segurança para ajustar o programa foliar?']
    },
    fontes: ['https://www.yara.com.br/nutricao-de-plantas/', 'https://www.yara.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'YaraTera',
    fabricante: 'Yara',
    aliases: [/yaratera|yara\s*tera|tera/],
    temas: ['irrigacao', 'adubo', 'geral'],
    propostaValorCurta:
      'Nutrição solúvel para fertirrigação com foco em precisão de manejo e máximo controle de produtividade em sistemas irrigados.',
    fortalezasCompetitivas: [
      'Linha para agricultura intensiva e ambientes de alto nível tecnológico (pivô, HF, café, citrus).',
      'Permite controle fino da nutrição e resposta rápida no ciclo.',
      'Defesa de valor por precisão operacional, rendimento e qualidade final.'
    ],
    cuidadosDePosicionamento: [
      'Trabalhar com plano nutricional por fase e critério claro de monitoramento.',
      'Ajustar recomendação à qualidade de água/sistema e à capacidade de execução da equipe.',
      'Definir métricas de resultado técnico e econômico antes da implementação.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês têm feito hoje o manejo de nutrição em fertirrigação e quais decisões exigem mais precisão?'],
      problema: ['Onde o modelo atual ainda não entrega o controle fino necessário para preservar rendimento e qualidade?'],
      implicacao: ['Se isso continuar, qual impacto aparece em potencial produtivo, padronização e rentabilidade do sistema irrigado?'],
      necessidadeSolucao: ['Que evidência de precisão e retorno você precisa para avançar com uma estratégia de fertirrigação mais robusta?']
    },
    fontes: ['https://www.yara.com.br/', 'https://www.yara.com.br/nutricao-de-plantas/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'YaraLiva',
    fabricante: 'Yara',
    aliases: [/yaraliva|yara\s*liva|liva|nitratos?/],
    temas: ['adubo', 'geral'],
    propostaValorCurta:
      'Nutrição com base em nitratos para vigor, qualidade e melhor padrão comercial em culturas de alto valor.',
    fortalezasCompetitivas: [
      'Foco em qualidade final, enchimento e desempenho fisiológico em ambientes de maior exigência.',
      'Muito aderente a HF, café, frutas e sistemas orientados a padrão comercial.',
      'Defesa de valor por qualidade de venda, classificação e redução de perdas.'
    ],
    cuidadosDePosicionamento: [
      'Alinhar recomendação ao objetivo comercial da cultura (qualidade, padrão e sanidade).',
      'Definir critérios de medição que capturem não só volume, mas qualidade e valor de venda.',
      'Conectar posicionamento nutricional à fase mais sensível para captura de valor.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês têm trabalhado hoje a nutrição para qualidade final e padrão comercial da produção?'],
      problema: ['Onde ainda aparecem falhas de qualidade, enchimento ou vigor que reduzem valor de venda?'],
      implicacao: ['Quando isso acontece, qual impacto fica no preço final, classificação e margem da operação?'],
      necessidadeSolucao: ['Que condição de qualidade e retorno precisa ficar clara para você avançar nessa proposta?']
    },
    fontes: ['https://www.yara.com.br/', 'https://www.yara.com.br/nutricao-de-plantas/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Elatus',
    fabricante: 'Syngenta',
    aliases: [/elatus/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta: 'Manejo de doenças com foco em proteção de produtividade e previsibilidade no fechamento da safra.',
    fortalezasCompetitivas: [
      'Marca reconhecida da Syngenta em programa de fungicidas para culturas relevantes.',
      'Permite discutir valor por risco evitado e estabilidade de resultado.',
      'Reforça defesa técnica quando conectada a programa completo de manejo.'
    ],
    cuidadosDePosicionamento: [
      'Posicionamento deve respeitar bula, alvo, momento e rotação de mecanismos de ação.',
      'Tratar manejo de resistência como parte central da decisão de valor.'
    ],
    ganchosSpin: {
      situacao: ['Como está o programa atual de controle de doenças e quais pontos mais pressionam custo e produtividade?'],
      problema: ['Em quais áreas o manejo atual ainda perde estabilidade de controle?'],
      implicacao: ['Quando o controle oscila, qual impacto aparece na margem e previsibilidade da colheita?'],
      necessidadeSolucao: ['O que precisa ficar comprovado para você defender internamente um ajuste de programa?']
    },
    fontes: ['https://www.syngenta.com.br/produtos', 'https://www.syngenta.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Cruiser',
    fabricante: 'Syngenta',
    aliases: [/cruiser/],
    temas: ['defensivo', 'semente', 'geral'],
    propostaValorCurta:
      'Proteção inicial da lavoura para fortalecer estabelecimento e reduzir risco operacional no início do ciclo.',
    fortalezasCompetitivas: [
      'Marca de referência em tratamento de sementes da Syngenta.',
      'Ajuda a defender decisão por proteção de estabelecimento e segurança da operação.',
      'Conecta valor ao risco evitado nas fases mais sensíveis da lavoura.'
    ],
    cuidadosDePosicionamento: [
      'A recomendação deve considerar praga-alvo, ambiente e integração com o programa completo.',
      'Seguir rigorosamente orientações de tratamento e segurança operacional.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês avaliam hoje o desempenho do tratamento de sementes no campo?'],
      problema: ['Onde ainda ocorrem falhas de estabelecimento que viram custo no restante do ciclo?'],
      implicacao: ['Qual custo aparece quando a lavoura começa com proteção inadequada?'],
      necessidadeSolucao: ['Que indicador de campo te daria segurança para evoluir o manejo inicial?']
    },
    fontes: ['https://www.syngenta.com.br/produtos', 'https://www.syngenta.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Verdavis',
    fabricante: 'Syngenta',
    aliases: [/verdavis/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta:
      'Manejo inseticida orientado a proteção de produtividade, redução de risco de pragas e sustentação de margem no ciclo.',
    fortalezasCompetitivas: [
      'Solução inseticida da Syngenta para compor estratégia de controle em cenários de pressão de pragas.',
      'Abre conversa de valor por risco evitado, estabilidade de lavoura e proteção de resultado final.',
      'Fortalece a defesa comercial quando conectada a plano de manejo e critério econômico de decisão.'
    ],
    cuidadosDePosicionamento: [
      'Definir posicionamento conforme recomendação oficial de bula e contexto da área.',
      'Tratar cigarrinha/percevejo dentro de estratégia completa de monitoramento e tomada de decisão no timing correto.',
      'Evitar promessa genérica: alinhar expectativa por pressão de praga, momento de aplicação e qualidade de execução.'
    ],
    ganchosSpin: {
      situacao: [
        'Como vocês têm feito hoje o controle de cigarrinha e percevejos e quais critérios definem o momento de entrar com inseticida?'
      ],
      problema: ['Onde o manejo atual ainda deixa escape de praga ou aumento de risco para produtividade?'],
      implicacao: ['Se essa pressão de praga seguir, qual impacto direto você projeta em custo, produtividade e margem?'],
      necessidadeSolucao: [
        'Que condição de resultado você precisa ver para concordar em avançar com ajuste do programa de controle?'
      ]
    },
    fontes: ['https://www.syngenta.com.br/produtos', 'https://www.syngenta.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Roundup',
    fabricante: 'Bayer',
    aliases: [/roundup/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta:
      'Manejo de plantas daninhas com foco em execução correta, janela operacional e proteção do potencial produtivo.',
    fortalezasCompetitivas: [
      'Marca histórica de referência em herbicidas para dessecação e manejo.',
      'Permite elevar conversa para custo de falha de execução e risco de janela.',
      'Defesa de valor baseada em programa de manejo, não em preço por litro.'
    ],
    cuidadosDePosicionamento: [
      'Considerar estágio das plantas daninhas, qualidade de aplicação e estratégia antiresistência.',
      'Respeitar recomendação oficial de uso e segurança conforme bula.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês estão conduzindo hoje a dessecação e o manejo de daninhas pré-plantio?'],
      problema: ['Onde ainda há escapes ou retrabalho que encarecem a operação?'],
      implicacao: ['Qual impacto em custo e risco de janela quando o manejo falha no momento crítico?'],
      necessidadeSolucao: ['Que plano de manejo te dá segurança para reduzir retrabalho e proteger o potencial produtivo?']
    },
    fontes: ['https://www.cropscience.bayer.com.br/produtos', 'https://www.cropscience.bayer.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Fox Xpro',
    fabricante: 'Bayer',
    aliases: [/fox\s*xpro/],
    temas: ['defensivo', 'geral'],
    propostaValorCurta: 'Programa fungicida orientado a proteção de produtividade e previsibilidade de colheita.',
    fortalezasCompetitivas: [
      'Produto conhecido do portfólio Bayer para manejo de doenças.',
      'Valor aparece quando integrado em programa e decisão no timing correto.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar por fase e pressão de doença, com rotação adequada.',
      'Amarrar objetivo técnico a meta econômica por hectare.'
    ],
    ganchosSpin: {
      situacao: ['Como está o programa atual de fungicidas e quais critérios definem as aplicações?'],
      problema: ['Onde o manejo ainda perde eficiência ou estabilidade?'],
      implicacao: ['Quando o controle oscila, quanto isso custa em produtividade e margem?'],
      necessidadeSolucao: ['Qual evidência prática faltaria para ajustar o programa com foco em valor?']
    },
    fontes: ['https://www.cropscience.bayer.com.br/produtos', 'https://www.cropscience.bayer.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Mosaic Performa',
    fabricante: 'Mosaic',
    aliases: [/mosaic\s*performa|performa/],
    temas: ['adubo', 'geral'],
    propostaValorCurta: 'Manejo nutricional para ganho de eficiência e estabilidade de produtividade por área.',
    fortalezasCompetitivas: [
      'Solução associada ao portfólio Mosaic em nutrição de alta performance.',
      'Permite defender valor por eficiência de uso e retorno por hectare.'
    ],
    cuidadosDePosicionamento: [
      'Ajustar recomendação ao ambiente de produção e análise de solo.',
      'Conduzir validação por talhão para comprovar retorno econômico.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês estão avaliando hoje a eficiência da adubação por talhão?'],
      problema: ['Onde o custo de adubação ainda não converte em produtividade esperada?'],
      implicacao: ['Qual impacto em margem quando a eficiência nutricional fica abaixo do esperado?'],
      necessidadeSolucao: ['Que validação em campo te ajuda a defender mudança de manejo nutricional?']
    },
    fontes: ['https://www.mosaicco.com.br/pt-br/produtos', 'https://www.mosaicco.com.br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'ICL Fertilizantes Especiais',
    fabricante: 'ICL',
    aliases: [/icl|fertilizantes?\s*especiais/],
    temas: ['adubo', 'biologico', 'geral'],
    propostaValorCurta:
      'Nutrição especializada para melhorar eficiência de manejo e previsibilidade de desempenho no ciclo.',
    fortalezasCompetitivas: [
      'Portfólio de fertilizantes especiais com proposta de performance agronômica.',
      'Ajuda a deslocar conversa de preço para custo total e resultado final.'
    ],
    cuidadosDePosicionamento: [
      'Escolher solução com base em diagnóstico técnico da área.',
      'Definir métrica econômica de acompanhamento desde o início da validação.'
    ],
    ganchosSpin: {
      situacao: ['Quais critérios vocês usam para escolher fertilizantes especiais hoje?'],
      problema: ['Onde a estratégia atual ainda não entrega consistência de resposta?'],
      implicacao: ['Quando a decisão é por preço, qual custo oculto aparece no resultado da safra?'],
      necessidadeSolucao: ['Que indicador precisa evoluir para justificar ajuste de manejo nutricional?']
    },
    fontes: ['https://icl-growingsolutions.com/pt-br/produtos/', 'https://icl-growingsolutions.com/pt-br/'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'Pioneer',
    fabricante: 'Corteva',
    aliases: [/pioneer/],
    temas: ['semente', 'geral'],
    propostaValorCurta: 'Escolha de genética orientada a estabilidade produtiva, adaptabilidade e retorno por área.',
    fortalezasCompetitivas: [
      'Marca de sementes de referência da Corteva.',
      'Permite discutir escolha de híbrido/cultivar por ambiente de produção e resultado econômico.'
    ],
    cuidadosDePosicionamento: [
      'Definir material por histórico de talhão e estratégia da safra.',
      'Amarrar recomendação a população, manejo e janela para capturar o potencial.'
    ],
    ganchosSpin: {
      situacao: ['Como vocês escolhem hoje o material de sementes por ambiente produtivo?'],
      problema: ['Onde a genética atual tem limitado estabilidade e teto de resultado?'],
      implicacao: ['Qual custo de oportunidade existe ao manter material desalinhado da meta de negócio?'],
      necessidadeSolucao: ['Que validação em campo precisa acontecer para apoiar a troca de material?']
    },
    fontes: ['https://www.pioneer.com/br/', 'https://www.pioneer.com/br/produtos.html'],
    atualizadoEm: '2026-03-14'
  },
  {
    produto: 'DEKALB',
    fabricante: 'Bayer',
    aliases: [/dekalb/],
    temas: ['semente', 'geral'],
    propostaValorCurta: 'Genética com foco em desempenho por ambiente e sustentação de margem no fechamento da safra.',
    fortalezasCompetitivas: [
      'Marca reconhecida em sementes de milho.',
      'Permite defender valor por estabilidade e retorno final da operação.'
    ],
    cuidadosDePosicionamento: [
      'Posicionar híbrido conforme ambiente e tecnologia de manejo disponível.',
      'Estabelecer critério de acompanhamento técnico-econômico por área.'
    ],
    ganchosSpin: {
      situacao: ['Quais critérios estão pesando mais hoje na escolha do híbrido?'],
      problema: ['Onde o material atual ainda não entrega consistência de resultado?'],
      implicacao: ['Quando a escolha de genética falha, qual impacto fica na margem por hectare?'],
      necessidadeSolucao: ['Que prova de campo você precisa para defender ajuste de material?']
    },
    fontes: ['https://www.dekalb.com.br/produtos', 'https://www.dekalb.com.br/'],
    atualizadoEm: '2026-03-14'
  }
];

import { normalizeText } from '../utils/text';
import { inferAgroCatalogScenario } from './agroScenarioCatalog';

export interface SpinScenarioTemplate {
  id: string;
  categoria: string;
  descricao: string;
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidadeSolucao: string[];
}

export const SPIN_SCENARIO_LIBRARY: SpinScenarioTemplate[] = [
  {
    id: 'produtor_resistente_nova_tecnologia',
    categoria: 'resistencia_inovacao',
    descricao: 'Produtor resistente à adoção de novas tecnologias, manejos modernos ou soluções de maior valor agregado.',
    situacao: [
      'Como o senhor tem conduzido hoje o manejo dessa cultura?',
      'Quais tecnologias já utiliza hoje com mais confiança?',
      'O que normalmente considera antes de adotar algo novo?'
    ],
    problema: [
      'O que mais tem limitado seus resultados atuais?',
      'Onde o manejo atual já não responde como antes?',
      'O que gera mais dúvida quando se fala em tecnologia nova?'
    ],
    implicacao: [
      'Se o manejo atual continuar igual, onde isso pode comprometer produtividade, qualidade ou rentabilidade?',
      'Quanto custa permanecer no modelo atual se o ambiente produtivo mudou?',
      'O que acontece se os concorrentes evoluírem e sua operação não acompanhar?'
    ],
    necessidadeSolucao: [
      'Se existisse uma forma segura de testar com menor risco, faria sentido avaliar?',
      'Se uma nova solução ajudasse a produzir mais com mais previsibilidade, valeria a pena olhar?',
      'Se fosse possível validar em área controlada, isso abriria espaço para avançar?'
    ]
  },
  {
    id: 'produtor_focado_preco',
    categoria: 'pressao_preco',
    descricao: 'Produtor que direciona a conversa para preço e tende a comparar apenas custo por saco ou por hectare.',
    situacao: [
      'Hoje suas decisões estão mais concentradas em preço de entrada ou resultado no fechamento da safra?',
      'Quando compara fornecedores, quais critérios normalmente entram além do preço?',
      'O que mais pesa na sua decisão final?'
    ],
    problema: [
      'Já houve situação em que o produto mais barato não trouxe o resultado esperado?',
      'Onde o barato já saiu caro no seu manejo?',
      'O que acontece quando a solução reduz preço e também reduz performance?'
    ],
    implicacao: [
      'Se a economia inicial gerar perda de produtividade, como isso bate na margem final?',
      'Quanto representam 2, 3 ou 5 sacas a menos por hectare no resultado consolidado?',
      'Qual o impacto de uma decisão baseada só em preço em um ano de margem apertada?'
    ],
    necessidadeSolucao: [
      'Se uma solução custar mais, mas entregar maior retorno líquido, faz sentido comparar nessa lógica?',
      'Se o foco fosse custo por saca produzida e não apenas custo por hectare, mudaria a análise?',
      'Se eu te mostrar uma conta simples de retorno, vale avaliarmos juntos?'
    ]
  },
  {
    id: 'produtor_fiel_concorrente',
    categoria: 'fidelidade_concorrente',
    descricao: 'Produtor que mantém relacionamento histórico com concorrente e evita abertura para novas propostas.',
    situacao: [
      'Há quanto tempo trabalha com esse fornecedor?',
      'O que fez essa parceria durar tanto tempo?',
      'Quais pontos mais valoriza nesse relacionamento atual?'
    ],
    problema: [
      'Existe algo que gostaria que esse parceiro atual entregasse melhor?',
      'Em que situações você sente que ainda há espaço para evolução?',
      'Onde seu fornecedor atual ainda não te surpreende?'
    ],
    implicacao: [
      'Se existir uma alternativa que preserve segurança e aumente resultado, o que você perderia ao não analisar?',
      'Quanto custa deixar de comparar o mercado por excesso de hábito?',
      'Se o concorrente não estiver mais entregando a melhor solução, qual o risco de descobrir isso tarde?'
    ],
    necessidadeSolucao: [
      'Se eu te trouxer dados objetivos, o senhor toparia comparar sem compromisso?',
      'Se fizermos um teste pequeno, isso seria razoável?',
      'Se a proposta for evoluir resultado e não simplesmente trocar fornecedor, faz sentido abrir a conversa?'
    ]
  },
  {
    id: 'produtor_conservador_avesso_risco',
    categoria: 'perfil_conservador',
    descricao: 'Produtor tradicional, conservador e avesso a mudanças.',
    situacao: [
      'O senhor costuma testar tecnologias novas ou prefere trabalhar com o que já conhece?',
      'Como define o momento certo para mudar alguma prática?',
      'O que te dá mais segurança em uma decisão técnica?'
    ],
    problema: [
      'Já aconteceu de deixar de testar algo que depois se mostrou vantajoso?',
      'O que mais te preocupa quando pensa em mudar manejo?',
      'Em quais decisões o medo de errar pesa mais?'
    ],
    implicacao: [
      'Se o mercado evoluir e sua operação não acompanhar, onde pode ficar para trás?',
      'Qual o custo de não testar nada em um cenário de mudanças de clima, solo e genética?',
      'O que acontece quando a busca por segurança vira estagnação?'
    ],
    necessidadeSolucao: [
      'Se montarmos um teste de baixo risco, isso faria sentido?',
      'Se houver uma forma de aprender sem comprometer a área total, você consideraria?',
      'Se a proposta for segurança com evolução, vale a conversa?'
    ]
  },
  {
    id: 'produtor_margem_apertada',
    categoria: 'margem_rentabilidade',
    descricao: 'Produtor pressionado por margem apertada e custos altos.',
    situacao: [
      'Como as margens desta safra estão se comportando para você?',
      'Onde o custo mais apertou sua operação?',
      'Em quais frentes você sente mais pressão hoje?'
    ],
    problema: [
      'Onde você sente que está deixando dinheiro na mesa?',
      'O que mais pesa: fertilizante, defensivo, operação ou perda de potencial produtivo?',
      'Em quais áreas ainda existe ineficiência?'
    ],
    implicacao: [
      'Se a margem já está apertada, qual o efeito de uma decisão técnica abaixo do ideal?',
      'Quanto uma pequena perda de produtividade pesa no fim da conta?',
      'O que acontece com a rentabilidade se a operação continuar reagindo ao custo e não ao retorno?'
    ],
    necessidadeSolucao: [
      'Se uma solução ajudar a proteger margem e aumentar eficiência, vale analisar?',
      'Se conseguirmos melhorar o resultado líquido e não apenas reduzir desembolso, isso entra na sua prioridade?',
      'Se houver espaço para capturar mais resultado por hectare, faz sentido aprofundar?'
    ]
  },
  {
    id: 'produtor_tecnificado_desconfiado',
    categoria: 'tecnificado_cetico',
    descricao: 'Produtor tecnificado, experiente, que exige comprovação forte.',
    situacao: [
      'Quais indicadores você mais acompanha para validar uma solução?',
      'O que você considera evidência confiável hoje?',
      'Como normalmente avalia tecnologias novas?'
    ],
    problema: [
      'O que te faz desconfiar de algumas propostas do mercado?',
      'Onde você sente excesso de promessa e pouca comprovação?',
      'O que costuma faltar nas abordagens comerciais que chegam até você?'
    ],
    implicacao: [
      'Se uma tecnologia boa for descartada por falta de evidência bem apresentada, o que isso pode custar?',
      'Quanto custa tomar decisão com base em percepção incompleta?',
      'O que acontece se o critério de avaliação estiver muito estreito e deixar passar oportunidades reais?'
    ],
    necessidadeSolucao: [
      'Se eu te mostrar dados comparáveis, com contexto técnico e econômico, vale analisar?',
      'Se cruzarmos resultado agronômico com retorno financeiro, isso ajuda?',
      'Se a conversa for técnica, objetiva e sem floreio, podemos aprofundar?'
    ]
  },
  {
    id: 'produtor_ja_testou_nao_gostou',
    categoria: 'experiencia_negativa',
    descricao: 'Produtor que já testou solução parecida e teve frustração anterior.',
    situacao: [
      'Quando você testou essa solução, em que contexto foi?',
      'Qual era o objetivo daquele teste?',
      'Como foi feita aplicação, dose e momento?'
    ],
    problema: [
      'O que exatamente não funcionou como esperado?',
      'A frustração veio por performance, custo, timing ou recomendação?',
      'O que mais te decepcionou naquela experiência?'
    ],
    implicacao: [
      'Se o problema anterior tiver sido ajuste de manejo e não da tecnologia em si, qual o risco de descartar algo útil?',
      'Quanto pode custar generalizar uma experiência isolada?',
      'O que acontece se uma decisão atual for baseada em um teste mal calibrado do passado?'
    ],
    necessidadeSolucao: [
      'Se revisarmos tecnicamente o teste anterior, vale reavaliar?',
      'Se houver uma nova forma de posicionar a solução, você consideraria?',
      'Se conseguirmos aprender com o que não funcionou, faz sentido abrir uma segunda análise?'
    ]
  },
  {
    id: 'produtor_acha_ja_esta_no_maximo',
    categoria: 'autossuficiencia_produtiva',
    descricao: 'Produtor que acredita já operar em teto produtivo.',
    situacao: [
      'Qual tem sido sua média de produtividade nas últimas safras?',
      'Onde você entende que estão hoje seus maiores diferenciais?',
      'Quais áreas já performam mais próximas do que você considera teto?'
    ],
    problema: [
      'Você acredita que ainda existam perdas invisíveis no sistema?',
      'Onde talvez haja espaço para ganho marginal que hoje passa despercebido?',
      'O que faria você reconsiderar a ideia de teto?'
    ],
    implicacao: [
      'Se houver espaço para ganhar 2 ou 3 sacas adicionais com boa eficiência, quanto isso representa em escala?',
      'O que custa assumir que já chegou no limite antes de revisar tudo?',
      'Como fica sua competitividade se outros produtores seguirem evoluindo pequenos detalhes enquanto você estabiliza?'
    ],
    necessidadeSolucao: [
      'Se fizermos uma leitura mais fina de potencial escondido, vale investigar?',
      'Se a proposta for ganho marginal com alto retorno, isso interessa?',
      'Se houver oportunidade sem ruptura do sistema, faz sentido olhar?'
    ]
  },
  {
    id: 'produtor_sem_planejamento_previo',
    categoria: 'gestao_planejamento',
    descricao: 'Produtor pouco organizado, compra no improviso e reage tarde.',
    situacao: [
      'Como você normalmente organiza as decisões da safra?',
      'Com quanta antecedência costuma planejar compra e manejo?',
      'Quem participa das decisões-chave?'
    ],
    problema: [
      'Em quais momentos a falta de planejamento já te prejudicou?',
      'Onde o improviso mais custou caro?',
      'O que acontece quando a decisão fica para a última hora?'
    ],
    implicacao: [
      'Se a compra é feita tarde, como isso afeta custo, disponibilidade, posicionamento e resultado?',
      'Quanto custa decidir no aperto em vez de decidir com estratégia?',
      'O que acontece com sua margem quando a operação trabalha mais reativa do que planejada?'
    ],
    necessidadeSolucao: [
      'Se montarmos um plano simples e antecipado, faria sentido?',
      'Se você conseguir ganhar previsibilidade, isso ajuda na tomada de decisão?',
      'Se o planejamento reduzir risco e melhorar resultado, vale construir junto?'
    ]
  },
  {
    id: 'produtor_pressa_fechar',
    categoria: 'pressao_tempo',
    descricao: 'Produtor apressado e com pouca paciência para conversa longa.',
    situacao: [
      'Como o senhor prefere avaliar esse tipo de proposta: mais técnico, mais direto ou comparativo?',
      'O que precisa ficar claro rapidamente para valer sua atenção?',
      'Quais critérios definem uma boa conversa comercial para você?'
    ],
    problema: [
      'O que costuma fazer você perder interesse em uma conversa de venda?',
      'O que mais te incomoda em abordagens longas ou genéricas?',
      'Onde os fornecedores erram mais com você?'
    ],
    implicacao: [
      'Se uma decisão for tomada rápido demais sem olhar os pontos certos, qual o risco?',
      'Quanto pode custar a velocidade quando ela elimina profundidade?',
      'O que acontece quando a pressa faz comparar só superfície?'
    ],
    necessidadeSolucao: [
      'Se eu resumir em três pontos objetivos com impacto direto no seu resultado, podemos seguir?',
      'Se formos direto para número, risco e retorno, isso ajuda?',
      'Se eu trouxer uma recomendação clara e objetiva, faz sentido avançar?'
    ]
  },
  {
    id: 'produtor_sucessor_jovem',
    categoria: 'perfil_sucessao',
    descricao: 'Sucessor jovem, aberto à inovação, mas sem autonomia total.',
    situacao: [
      'Como você participa hoje das decisões técnicas e comerciais da fazenda?',
      'Quais temas você vem puxando com mais força na operação?',
      'O que você gostaria de modernizar primeiro?'
    ],
    problema: [
      'Onde você sente mais resistência interna quando propõe algo novo?',
      'O que te impede de avançar mais rápido em inovação?',
      'Quais decisões ainda dependem mais da geração anterior?'
    ],
    implicacao: [
      'Se a fazenda demorar para evoluir em tecnologia e gestão, onde isso pode custar competitividade?',
      'O que acontece quando a sucessão ocorre sem atualização real do modelo de decisão?',
      'Como isso impacta o futuro da operação?'
    ],
    necessidadeSolucao: [
      'Se eu te ajudar a estruturar uma proposta técnica e econômica mais convincente, isso facilita a conversa interna?',
      'Se montarmos um piloto bem defendido, faz sentido?',
      'Se você tiver argumentos sólidos para levar à decisão, isso ajuda?'
    ]
  },
  {
    id: 'produtor_endividado_pressao_caixa',
    categoria: 'financeiro_caixa',
    descricao: 'Produtor pressionado por dívida e fluxo de caixa apertado.',
    situacao: [
      'Como está hoje sua pressão de caixa para esta safra?',
      'Quais compromissos financeiros mais pesam na tomada de decisão?',
      'Como você equilibra investimento técnico e restrição financeira?'
    ],
    problema: [
      'Onde a limitação de caixa já fez você adiar ou simplificar manejo?',
      'O que mais te preocupa hoje: desembolso imediato ou retorno insuficiente?',
      'Em quais decisões o caixa está falando mais alto do que a técnica?'
    ],
    implicacao: [
      'Se o aperto de caixa levar a um manejo abaixo do ideal, quanto isso pode piorar a recuperação financeira?',
      'O que custa economizar agora e colher menos depois?',
      'Como a baixa eficiência agrava a pressão sobre endividamento?'
    ],
    necessidadeSolucao: [
      'Se desenharmos uma solução financeiramente mais inteligente, com foco em retorno, isso merece análise?',
      'Se conseguirmos mostrar onde investir com maior alavanca, faz sentido aprofundar?',
      'Se a prioridade for proteger caixa e resultado ao mesmo tempo, vale construir junto?'
    ]
  },
  {
    id: 'produtor_so_compra_na_safra',
    categoria: 'compra_tardia',
    descricao: 'Produtor que decide na boca da safra.',
    situacao: [
      'Como costuma definir o momento de compra?',
      'O que te leva a deixar parte das decisões mais para perto da safra?',
      'Como você avalia risco de disponibilidade e custo nesse modelo?'
    ],
    problema: [
      'Quais problemas já surgiram por decidir tarde?',
      'Onde a compra em cima da hora já limitou sua liberdade de escolha?',
      'O que mais te incomoda quando o mercado aperta perto da safra?'
    ],
    implicacao: [
      'Se a decisão tardia reduzir opções, negociação e ajuste técnico, quanto isso pode custar?',
      'O que acontece quando o calendário comercial toma o lugar do calendário agronômico?',
      'Como isso afeta o resultado final?'
    ],
    necessidadeSolucao: [
      'Se antecipar parte da estratégia aumentar controle e previsibilidade, faz sentido?',
      'Se organizarmos hoje o que não precisa ser decidido no aperto, vale a pena?',
      'Se antecipação for sinônimo de mais resultado e menos risco, podemos avançar?'
    ]
  },
  {
    id: 'produtor_comparador_excessivo',
    categoria: 'comparacao_generica',
    descricao: 'Produtor que nivela propostas diferentes como se fossem iguais.',
    situacao: [
      'Quando você compara propostas, quais critérios entram além do preço?',
      'O que você entende como comparação justa entre soluções?',
      'Como avalia diferença de posicionamento técnico entre produtos?'
    ],
    problema: [
      'Onde você sente dificuldade para comparar coisas realmente diferentes?',
      'O que mais confunde quando vários fornecedores trazem propostas distintas?',
      'Já aconteceu de comparar itens que pareciam equivalentes, mas não eram?'
    ],
    implicacao: [
      'Se comparar soluções desiguais como se fossem iguais, qual o risco para sua decisão?',
      'Quanto custa tomar decisão por tabela e não por adequação técnica?',
      'O que acontece quando a comparação ignora performance, posicionamento e suporte?'
    ],
    necessidadeSolucao: [
      'Se eu organizar uma comparação justa, critério por critério, isso ajuda?',
      'Se montarmos uma análise técnica e econômica lado a lado, faz sentido?',
      'Se a ideia for simplificar sua decisão com clareza, podemos seguir?'
    ]
  },
  {
    id: 'produtor_desconfiado_vendedor',
    categoria: 'relacionamento_confianca',
    descricao: 'Produtor desconfiado de discurso comercial.',
    situacao: [
      'Como você diferencia um vendedor comum de alguém que realmente agrega valor?',
      'O que normalmente te faz confiar em uma recomendação?',
      'Como prefere que uma conversa comercial aconteça?'
    ],
    problema: [
      'O que mais te incomoda na abordagem dos fornecedores?',
      'Em quais situações você sente que estão tentando te empurrar algo?',
      'O que falta para uma conversa comercial fazer sentido para você?'
    ],
    implicacao: [
      'Se boas soluções forem descartadas por excesso de ruído comercial, qual o custo disso?',
      'O que acontece quando a desconfiança bloqueia até conversas úteis?',
      'Como isso limita acesso a novas oportunidades?'
    ],
    necessidadeSolucao: [
      'Se eu conduzir a conversa de forma técnica, objetiva e conectada à sua realidade, faz sentido continuar?',
      'Se o foco for te ajudar a decidir melhor, isso abre espaço?',
      'Se eu provar utilidade antes de falar de produto, vale avançar?'
    ]
  },
  {
    id: 'produtor_valoriza_assistencia',
    categoria: 'servico_suporte',
    descricao: 'Produtor que valoriza presença e acompanhamento técnico.',
    situacao: [
      'Hoje o quanto pesa para você o pós-venda e a presença no campo?',
      'Em quais momentos o suporte do parceiro faz mais diferença?',
      'O que você espera de uma boa assistência técnica?'
    ],
    problema: [
      'Onde seus parceiros atuais ainda deixam a desejar em acompanhamento?',
      'Já houve situação em que faltou proximidade na hora crítica?',
      'O que te frustra mais no pós-venda?'
    ],
    implicacao: [
      'Se o produto for bom, mas o suporte falhar, qual o impacto no resultado?',
      'Quanto custa ficar sozinho justamente quando a decisão mais precisa de ajuste?',
      'Como a ausência de acompanhamento compromete adoção e performance?'
    ],
    necessidadeSolucao: [
      'Se a proposta incluir presença, acompanhamento e revisão de resultado, isso eleva o valor percebido?',
      'Se você tiver um parceiro mais próximo na execução, isso conta?',
      'Se conseguirmos unir tecnologia e suporte forte, vale considerar?'
    ]
  }
];

const SCENARIO_DETECTORS: Array<{ id: string; regex: RegExp }> = [
  { id: 'produtor_focado_preco', regex: /preco|desconto|barato|cotacao/ },
  { id: 'produtor_fiel_concorrente', regex: /concorrente|fornecedor atual|fiel|sempre compro/ },
  { id: 'produtor_conservador_avesso_risco', regex: /conservador|avesso|nao muda|resistente/ },
  { id: 'produtor_tecnificado_desconfiado', regex: /tecnificado|dados|comprovacao|cetic/ },
  { id: 'produtor_ja_testou_nao_gostou', regex: /ja testou|nao gostou|frustracao|nao funcionou/ },
  { id: 'produtor_acha_ja_esta_no_maximo', regex: /ja no maximo|teto|ja esta bom/ },
  { id: 'produtor_sem_planejamento_previo', regex: /sem planejamento|improviso|ultima hora/ },
  { id: 'produtor_pressa_fechar', regex: /pressa|rapido|direto ao ponto|sem tempo/ },
  { id: 'produtor_sucessor_jovem', regex: /sucessor|sucessao|geracao nova|filho|filha/ },
  { id: 'produtor_endividado_pressao_caixa', regex: /divida|caixa|fluxo de caixa|endividado/ },
  { id: 'produtor_so_compra_na_safra', regex: /boca da safra|compra tardia|compra na safra/ },
  { id: 'produtor_comparador_excessivo', regex: /muitas cotacoes|compara tudo|comparador|nivelar propostas/ },
  { id: 'produtor_desconfiado_vendedor', regex: /desconfiado|nao confia no vendedor|empurrar produto/ },
  { id: 'produtor_valoriza_assistencia', regex: /assistencia|pos-venda|suporte tecnico|acompanhamento/ },
  { id: 'produtor_margem_apertada', regex: /margem apertada|rentabilidade|custo alto/ },
  { id: 'produtor_resistente_nova_tecnologia', regex: /resistente.*tecnologia|nao adota|novo manejo/ }
];

export const inferSpinScenarioTemplate = (scenario: string): SpinScenarioTemplate | null => {
  const normalized = normalizeText(scenario);
  const matchedCatalog = inferAgroCatalogScenario(scenario);

  if (matchedCatalog) {
    return SPIN_SCENARIO_LIBRARY.find((item) => item.id === matchedCatalog.spinTemplateId) ?? null;
  }

  const detector = SCENARIO_DETECTORS.find((item) => item.regex.test(normalized));
  if (!detector) return null;
  return SPIN_SCENARIO_LIBRARY.find((item) => item.id === detector.id) ?? null;
};

export const inferAgroScenarioName = (scenario: string): string | null => {
  const matchedCatalog = inferAgroCatalogScenario(scenario);
  return matchedCatalog?.cenarioNome ?? null;
};

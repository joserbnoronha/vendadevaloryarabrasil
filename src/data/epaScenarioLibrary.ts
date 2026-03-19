export interface EpaScenarioTemplate {
  id: string;
  categoria: string;
  descricao: string;
  educarReframe: string[];
  personalizarTailor: string[];
  assumirControleTakeControl: string[];
}

export const EPA_SCENARIO_LIBRARY: EpaScenarioTemplate[] = [
  {
    id: 'produtor_resistente_nova_tecnologia',
    categoria: 'resistencia_inovacao',
    descricao: 'Produtor resistente à adoção de novas tecnologias.',
    educarReframe: [
      'Muitos produtores não perdem resultado por falta de área, e sim por insistirem em modelos que funcionaram no passado.',
      'O maior risco nem sempre é testar algo novo; muitas vezes é continuar igual enquanto o ambiente produtivo mudou.'
    ],
    personalizarTailor: [
      'Na sua realidade, a adoção não precisa ser radical; pode começar em pontos com maior chance de retorno.',
      'Pelo seu perfil, faz mais sentido falar em evolução controlada do que em mudança brusca.'
    ],
    assumirControleTakeControl: [
      'Vamos tirar isso do campo da opinião e colocar no campo da evidência.',
      'Minha proposta é definir área, critério e objetivo claro para validar sem exposição desnecessária.'
    ]
  },
  {
    id: 'produtor_focado_preco',
    categoria: 'pressao_preco',
    descricao: 'Produtor que direciona a conversa para preço.',
    educarReframe: [
      'Preço baixo não garante custo menor por saca produzida.',
      'O produtor moderno ganha dinheiro convertendo melhor cada hectare, não apenas comprando barato.'
    ],
    personalizarTailor: [
      'Na sua operação, uma pequena diferença de performance já desloca totalmente a conta final.',
      'Para o seu cenário, olhar só desembolso inicial esconde o que realmente importa: resultado líquido.'
    ],
    assumirControleTakeControl: [
      'Vamos comparar pela lógica correta: retorno, risco e impacto na margem.',
      'Antes de falar se está caro ou barato, vamos calcular quanto custa produzir e quanto sobra no final.'
    ]
  },
  {
    id: 'produtor_fiel_concorrente',
    categoria: 'fidelidade_concorrente',
    descricao: 'Produtor fiel ao concorrente.',
    educarReframe: [
      'Lealdade comercial é positiva, mas fidelidade sem comparação pode custar caro.',
      'O ponto não é trocar por trocar; é evitar que o hábito impeça evolução.'
    ],
    personalizarTailor: [
      'Como você já tem fornecedor de confiança, a conversa não é sobre ruptura e sim sobre benchmarking real.',
      'Pelo seu perfil, uma abordagem respeitosa e comparativa faz mais sentido do que substituição direta.'
    ],
    assumirControleTakeControl: [
      'Não faz sentido discutir mudança total agora; vamos começar comparando critério, resultado e proposta de valor.',
      'Se houver espaço de ganho, o ideal é descobrir isso com método.'
    ]
  },
  {
    id: 'produtor_conservador_avesso_risco',
    categoria: 'perfil_conservador',
    descricao: 'Produtor conservador e avesso a risco.',
    educarReframe: [
      'No agro, segurança não significa imobilidade.',
      'O risco não está só em mudar; está também em não evoluir.'
    ],
    personalizarTailor: [
      'Para o seu estilo, o caminho adequado é teste bem delimitado, critério claro e risco operacional baixo.',
      'O respeito ao seu perfil passa por construir segurança antes de pedir avanço.'
    ],
    assumirControleTakeControl: [
      'Vamos estruturar para que a decisão fique confortável e controlada.',
      'Não quero que você acredite em mim; quero que enxergue na prática o que faz sentido manter ou descartar.'
    ]
  },
  {
    id: 'produtor_margem_apertada',
    categoria: 'margem_rentabilidade',
    descricao: 'Produtor com margem apertada.',
    educarReframe: [
      'Quando a margem aperta, o erro mais comum é cortar investimento de forma linear.',
      'Precisão vale mais do que economia cega em cenário apertado.'
    ],
    personalizarTailor: [
      'No seu caso, cada decisão técnica pesa muito porque a margem está sensível.',
      'Para sua realidade, faz mais sentido falar de eficiência econômica por hectare do que de simples redução de desembolso.'
    ],
    assumirControleTakeControl: [
      'Vamos olhar essa decisão com lupa de rentabilidade.',
      'Vamos priorizar o que mais protege margem, melhora resposta e evita desperdício.'
    ]
  },
  {
    id: 'produtor_tecnificado_desconfiado',
    categoria: 'tecnificado_cetico',
    descricao: 'Produtor tecnificado e cético.',
    educarReframe: [
      'O diferencial não está em apresentar tecnologia, mas em provar onde, quando e por que ela responde melhor.',
      'Ceticismo técnico é saudável quando ele melhora critério, não quando bloqueia análise.'
    ],
    personalizarTailor: [
      'Como você opera em nível técnico alto, a conversa precisa de dado, comparação justa e leitura econômica consistente.',
      'Para seu perfil, faz sentido aprofundar com objetividade.'
    ],
    assumirControleTakeControl: [
      'Vamos tratar isso como decisão técnica, não como argumento comercial.',
      'Vou mostrar evidência, contexto de uso e limite da solução para você decidir com base sólida.'
    ]
  },
  {
    id: 'produtor_ja_testou_nao_gostou',
    categoria: 'experiencia_negativa',
    descricao: 'Produtor com experiência negativa anterior.',
    educarReframe: [
      'Uma experiência negativa nem sempre invalida a tecnologia.',
      'Muitas vezes o que falhou foi posicionamento, timing, recomendação ou execução.'
    ],
    personalizarTailor: [
      'Antes de falar em nova tentativa, precisamos entender exatamente onde a experiência anterior quebrou.',
      'Isso evita repetir erro e mostra seriedade técnica.'
    ],
    assumirControleTakeControl: [
      'Vamos revisar o teste anterior com honestidade técnica.',
      'Se o problema foi de execução ou contexto, decidimos com mais justiça se vale reabrir.'
    ]
  },
  {
    id: 'produtor_acha_ja_esta_no_maximo',
    categoria: 'autossuficiencia_produtiva',
    descricao: 'Produtor que acredita estar no teto produtivo.',
    educarReframe: [
      'Em operações de alto desempenho, os maiores ganhos muitas vezes vêm de ajustes finos.',
      'Quem já performa bem não precisa de revolução; precisa de precisão.'
    ],
    personalizarTailor: [
      'Para seu patamar, a conversa é sobre ganho marginal altamente rentável.',
      'Isso conversa melhor com seu nível de operação.'
    ],
    assumirControleTakeControl: [
      'Vamos buscar potencial escondido, não promessas exageradas.',
      'Se houver oportunidade de capturar mais resultado com intervenção inteligente, vamos medir com frieza.'
    ]
  },
  {
    id: 'produtor_sem_planejamento_previo',
    categoria: 'gestao_planejamento',
    descricao: 'Produtor sem planejamento prévio.',
    educarReframe: [
      'Boa parte do resultado nasce antes da safra começar.',
      'Planejamento não é burocracia; é alavanca de resultado.'
    ],
    personalizarTailor: [
      'Na sua rotina, faz sentido simplificar o planejamento e transformá-lo em ferramenta prática.',
      'O objetivo é trazer clareza e reduzir correria.'
    ],
    assumirControleTakeControl: [
      'Vamos organizar o mínimo que gera máximo impacto.',
      'Com prioridades, calendário e critérios definidos, a decisão fica mais leve e melhor.'
    ]
  },
  {
    id: 'produtor_pressa_fechar',
    categoria: 'pressao_tempo',
    descricao: 'Produtor apressado.',
    educarReframe: [
      'Velocidade ajuda, mas simplificação excessiva pode eliminar variável importante da decisão.',
      'Decisão boa não é a mais rápida; é a mais clara.'
    ],
    personalizarTailor: [
      'Como você valoriza objetividade, o formato ideal é impacto direto: risco, retorno e decisão.',
      'Vou resumir sem empobrecer os critérios.'
    ],
    assumirControleTakeControl: [
      'Vou direto ao ponto e sem rodeio.',
      'Me dê poucos minutos para mostrar o que realmente muda resultado; depois você decide se vale aprofundar.'
    ]
  },
  {
    id: 'produtor_sucessor_jovem',
    categoria: 'perfil_sucessao',
    descricao: 'Sucessor jovem com abertura à inovação.',
    educarReframe: [
      'A sucessão mais forte não é a que troca pessoas, mas a que atualiza mentalidade e critério de decisão.',
      'Muitas propriedades perdem velocidade porque a nova geração vê o novo, mas não traduz isso em decisão segura.'
    ],
    personalizarTailor: [
      'No seu caso, além de técnica, precisamos construir narrativa sólida para defender proposta internamente.',
      'Seu papel é conectar inovação com segurança.'
    ],
    assumirControleTakeControl: [
      'Vamos estruturar para que sua recomendação fique convincente técnica e economicamente.',
      'Com piloto bem desenhado, lógica e critério, a chance de adesão interna cresce.'
    ]
  },
  {
    id: 'produtor_endividado_pressao_caixa',
    categoria: 'financeiro_caixa',
    descricao: 'Produtor com caixa pressionado.',
    educarReframe: [
      'Em momentos de caixa pressionado, a tentação é cortar justamente o que ajudaria a recuperar eficiência.',
      'O segredo é investir melhor, com foco em alavancas reais.'
    ],
    personalizarTailor: [
      'Para sua situação, toda recomendação precisa respeitar limite financeiro e priorizar maior impacto por real investido.',
      'Sem essa leitura, a conversa perde aderência.'
    ],
    assumirControleTakeControl: [
      'Vamos filtrar o que é essencial, o que é adiável e o que realmente paga a conta.',
      'A decisão precisa proteger caixa sem sacrificar demais o resultado futuro.'
    ]
  },
  {
    id: 'produtor_so_compra_na_safra',
    categoria: 'compra_tardia',
    descricao: 'Produtor que compra na boca da safra.',
    educarReframe: [
      'Quem compra tarde geralmente compra com menos liberdade e mais influência do mercado do que da estratégia.',
      'Quando o calendário comercial atropela o agronômico, o resultado costuma cobrar depois.'
    ],
    personalizarTailor: [
      'No seu caso, não é engessar tudo; é antecipar o que traz mais controle e menos exposição ao aperto.',
      'Isso combina melhor com sua dinâmica.'
    ],
    assumirControleTakeControl: [
      'Vamos separar o que precisa ser decidido agora do que pode ficar para depois.',
      'Com essencial antecipado, você ganha poder de decisão e reduz risco de improviso.'
    ]
  },
  {
    id: 'produtor_comparador_excessivo',
    categoria: 'comparacao_generica',
    descricao: 'Produtor que faz comparação genérica.',
    educarReframe: [
      'Comparar tudo apenas por preço ou rótulo técnico gera falsa sensação de racionalidade.',
      'Comparação boa é a que compara o que realmente é equivalente.'
    ],
    personalizarTailor: [
      'Como você gosta de comparar, o melhor caminho é critério justo: posicionamento, performance, suporte, risco e retorno.',
      'Isso respeita sua forma de decidir e melhora a qualidade da decisão.'
    ],
    assumirControleTakeControl: [
      'Vamos construir uma comparação correta, não só numerosa.',
      'Com base justa, sua decisão fica muito mais forte.'
    ]
  },
  {
    id: 'produtor_desconfiado_vendedor',
    categoria: 'relacionamento_confianca',
    descricao: 'Produtor desconfiado da abordagem comercial.',
    educarReframe: [
      'O problema não é a venda; é a venda vazia.',
      'Valor percebido nasce antes da proposta, na qualidade da conversa.'
    ],
    personalizarTailor: [
      'No seu perfil, preciso construir credibilidade antes de defender solução.',
      'Isso pede menos fala comercial e mais diagnóstico, pergunta e contexto.'
    ],
    assumirControleTakeControl: [
      'Não vou tentar te convencer no grito.',
      'Primeiro provo utilidade; depois, se fizer sentido, avançamos para recomendação concreta.'
    ]
  },
  {
    id: 'produtor_valoriza_assistencia',
    categoria: 'servico_suporte',
    descricao: 'Produtor que valoriza assistência e acompanhamento.',
    educarReframe: [
      'No campo, produto sem acompanhamento muitas vezes vira potencial não capturado.',
      'O valor não está só no que se entrega, mas em como se acompanha até virar resultado.'
    ],
    personalizarTailor: [
      'Para seu perfil, a proposta precisa ir além da tecnologia e mostrar consistência de presença, ajuste e suporte.',
      'Isso conversa com o que você realmente valoriza.'
    ],
    assumirControleTakeControl: [
      'Vamos avaliar não só a solução, mas a capacidade de sustentação dela ao longo do ciclo.',
      'Se a parceria for para gerar resultado, acompanhamento precisa entrar como parte da equação.'
    ]
  }
];

export const getEpaScenarioTemplateById = (id?: string | null): EpaScenarioTemplate | null => {
  if (!id) return null;
  return EPA_SCENARIO_LIBRARY.find((item) => item.id === id) ?? null;
};


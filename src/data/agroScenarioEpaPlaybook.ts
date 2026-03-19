export interface AgroScenarioEpaPlaybook {
  cenarioNome: string;
  educar: string;
  personalizar: string;
  assumirControle: string;
}

export const AGRO_SCENARIO_EPA_PLAYBOOKS: AgroScenarioEpaPlaybook[] = [
  { cenarioNome: 'resistente_tecnologia', educar: 'O ambiente de produção muda todo ano e o manejo precisa acompanhar.', personalizar: 'Na sua área já dá para ver que o sistema não responde igual.', assumirControle: 'Vamos avaliar juntos em pequena área antes de decidir.' },
  { cenarioNome: 'sempre_usou_mesmo', educar: 'O que funcionou anos atrás pode não entregar o mesmo hoje.', personalizar: 'Seu histórico é bom, mas o cenário mudou.', assumirControle: 'Vamos comparar números antes de manter igual.' },
  { cenarioNome: 'nao_acredita_premium', educar: 'Produto mais caro pode ser mais barato por saca produzida.', personalizar: 'Na sua produtividade, qualquer saca faz diferença.', assumirControle: 'Vamos calcular custo por hectare juntos.' },
  { cenarioNome: 'tudo_igual', educar: 'Produtos parecidos no rótulo podem ser diferentes no campo.', personalizar: 'Na sua área já vimos variação de resposta.', assumirControle: 'Vamos comparar resultado real.' },
  { cenarioNome: 'biologico_nao_funciona', educar: 'Biológico depende muito do manejo correto.', personalizar: 'Na sua situação anterior pode ter faltado ajuste.', assumirControle: 'Vamos testar de forma controlada.' },
  { cenarioNome: 'acha_teto_produtivo', educar: 'Muitas áreas parecem no limite, mas ainda têm espaço.', personalizar: 'Na sua produtividade, pequenos ganhos valem muito.', assumirControle: 'Vamos buscar pontos de ajuste.' },
  { cenarioNome: 'nao_gosta_testar', educar: 'Quem não testa fica sempre no mesmo nível.', personalizar: 'Na sua área dá para testar sem risco.', assumirControle: 'Vamos separar uma área pequena.' },
  { cenarioNome: 'decide_experiencia', educar: 'O ambiente muda mais rápido que a experiência.', personalizar: 'Seu histórico é forte, mas o cenário mudou.', assumirControle: 'Vamos olhar dados atuais.' },
  { cenarioNome: 'evita_tecnico', educar: 'Detalhe técnico é o que define resultado hoje.', personalizar: 'Na sua área já vimos diferença por manejo.', assumirControle: 'Deixa eu te mostrar na prática.' },
  { cenarioNome: 'nao_tem_tempo', educar: 'Decisão rápida pode custar caro na colheita.', personalizar: 'Na sua área cada decisão pesa muito.', assumirControle: 'Vamos direto ao ponto.' },
  { cenarioNome: 'so_preco', educar: 'Preço baixo nem sempre é custo baixo.', personalizar: 'Na sua produtividade, perder saca custa caro.', assumirControle: 'Vamos comparar por resultado.' },
  { cenarioNome: 'pede_cotacoes', educar: 'Cotação sem comparar tecnologia engana.', personalizar: 'Na sua área já vimos diferença grande.', assumirControle: 'Vamos comparar certo.' },
  { cenarioNome: 'compara_errado', educar: 'Comparar produto diferente gera erro.', personalizar: 'Na sua condição, o manejo muda tudo.', assumirControle: 'Vamos comparar tecnicamente.' },
  { cenarioNome: 'olha_preco_saco', educar: 'Preço por saco não mostra custo real.', personalizar: 'Na sua área, o custo é por hectare.', assumirControle: 'Vamos fazer a conta completa.' },
  { cenarioNome: 'nao_calcula_hectare', educar: 'Sem custo por hectare não dá para decidir bem.', personalizar: 'Na sua área, a margem depende disso.', assumirControle: 'Vamos calcular juntos.' },
  { cenarioNome: 'nao_calcula_saca', educar: 'O que importa é custo por saca produzida.', personalizar: 'Na sua produtividade, cada saca pesa.', assumirControle: 'Vamos comparar por saca.' },
  { cenarioNome: 'nao_calcula_retorno', educar: 'Investimento tem que ser visto pelo retorno.', personalizar: 'Na sua área dá para ganhar mais com ajuste.', assumirControle: 'Vamos fazer a conta.' },
  { cenarioNome: 'pressiona_preco', educar: 'Desconto não paga perda de produtividade.', personalizar: 'Na sua área já vimos isso acontecer.', assumirControle: 'Vamos comparar resultado.' },
  { cenarioNome: 'troca_por_centavos', educar: 'Centavos na compra viram sacas na colheita.', personalizar: 'Na sua área, a diferença é grande.', assumirControle: 'Vamos olhar sistema completo.' },
  { cenarioNome: 'quer_desconto_antes', educar: 'Preço antes do resultado leva a erro.', personalizar: 'Na sua área, o importante é produzir mais.', assumirControle: 'Vamos ver resultado primeiro.' },
  { cenarioNome: 'fiel_concorrente', educar: 'Parceria é boa, mas resultado é o que paga a conta.', personalizar: 'Na sua área pode haver oportunidade.', assumirControle: 'Vamos comparar sem compromisso.' },
  { cenarioNome: 'amizade_concorrente', educar: 'Confiança é importante, mas número decide.', personalizar: 'Na sua realidade, a margem é apertada.', assumirControle: 'Vamos olhar dados juntos.' },
  { cenarioNome: 'pacote_fechado', educar: 'Planejamento antecipado pode perder oportunidade.', personalizar: 'Na sua próxima safra dá para ajustar.', assumirControle: 'Vamos avaliar antes.' },
  { cenarioNome: 'nao_quer_teste', educar: 'Sem teste não existe evolução.', personalizar: 'Na sua área dá para testar sem risco.', assumirControle: 'Vamos fazer pequeno.' },
  { cenarioNome: 'concorrente_presente', educar: 'Quem traz dado traz confiança.', personalizar: 'Na sua área, o resultado fala mais.', assumirControle: 'Vamos olhar números.' },
  { cenarioNome: 'contrato_antecipado', educar: 'Contrato não pode travar resultado.', personalizar: 'Na sua próxima decisão dá para melhorar.', assumirControle: 'Vamos analisar antes.' },
  { cenarioNome: 'compra_cooperativa', educar: 'Comprar no mesmo lugar não garante melhor resultado.', personalizar: 'Na sua área pode haver ganho extra.', assumirControle: 'Vamos testar parcial.' },
  { cenarioNome: 'parceria_financeira', educar: 'Condição ajuda, mas não garante produtividade.', personalizar: 'Na sua safra, o resultado paga a conta.', assumirControle: 'Vamos comparar margem.' },
  { cenarioNome: 'sempre_deu_certo', educar: 'O solo muda, o clima muda e a genética muda.', personalizar: 'Na sua área já dá sinais disso.', assumirControle: 'Vamos revisar manejo.' },
  { cenarioNome: 'nao_compara', educar: 'Quem não compara pode ficar para trás.', personalizar: 'Na sua região já há produtores mudando.', assumirControle: 'Vamos analisar juntos.' },
  { cenarioNome: 'margem_apertada', educar: 'Quando a margem aperta, quem decide melhor o manejo ganha dinheiro.', personalizar: 'Na sua área cada detalhe pesa no resultado.', assumirControle: 'Vamos revisar onde investir certo.' },
  { cenarioNome: 'endividado', educar: 'Em momento apertado, investir certo vale mais que investir menos.', personalizar: 'Na sua safra escolher errado custa caro.', assumirControle: 'Vamos priorizar o que dá retorno.' },
  { cenarioNome: 'caixa_ruim', educar: 'Cortar custo sem critério reduz produtividade.', personalizar: 'Na sua área já vimos isso acontecer.', assumirControle: 'Vamos equilibrar custo e resultado.' },
  { cenarioNome: 'medo_investir', educar: 'Decidir só pelo medo trava o resultado.', personalizar: 'Na sua realidade o risco maior pode ser não investir.', assumirControle: 'Vamos calcular antes de decidir.' },
  { cenarioNome: 'quer_cortar_custo', educar: 'Reduzir custo no lugar errado sai caro.', personalizar: 'Na sua área o manejo precisa ser equilibrado.', assumirControle: 'Vamos olhar o sistema inteiro.' },
  { cenarioNome: 'cortou_tecnologia', educar: 'Redução de tecnologia aparece na colheita.', personalizar: 'Na sua última safra já deu sinal disso.', assumirControle: 'Vamos ajustar o manejo.' },
  { cenarioNome: 'prejuizo_anterior', educar: 'Depois de prejuízo, a tendência é errar pelo medo.', personalizar: 'Na sua situação é preciso decidir com número.', assumirControle: 'Vamos analisar safra passada.' },
  { cenarioNome: 'medo_mercado', educar: 'O mercado oscila, mas a produtividade depende do manejo.', personalizar: 'Na sua área o que controla é o sistema.', assumirControle: 'Vamos focar no que está na porteira.' },
  { cenarioNome: 'so_curto_prazo', educar: 'Decidir só safra a safra prejudica o solo.', personalizar: 'Na sua área dá para ver efeito acumulado.', assumirControle: 'Vamos pensar em mais de um ano.' },
  { cenarioNome: 'sem_planejamento', educar: 'Quem planeja antes erra menos durante a safra.', personalizar: 'Na sua rotina muita coisa é decidida depois.', assumirControle: 'Vamos organizar antes.' },
  { cenarioNome: 'quer_rapido', educar: 'Decisão rápida sem número aumenta risco.', personalizar: 'Na sua área cada escolha pesa muito.', assumirControle: 'Vamos olhar o essencial.' },
  { cenarioNome: 'nao_ouve', educar: 'Filtrar informação demais pode esconder oportunidade.', personalizar: 'Na sua região já tem gente evoluindo.', assumirControle: 'Vamos ver se faz sentido.' },
  { cenarioNome: 'desconfiado', educar: 'Hoje confiança vem de dado e resultado.', personalizar: 'Na sua área o número mostra a verdade.', assumirControle: 'Vamos trabalhar com dados.' },
  { cenarioNome: 'acha_comissao', educar: 'Venda boa é quando o produtor ganha mais.', personalizar: 'Na sua produtividade isso fica claro.', assumirControle: 'Vamos olhar o resultado final.' },
  { cenarioNome: 'quer_prazo', educar: 'Prazo ajuda no caixa, mas não paga perda de produção.', personalizar: 'Na sua safra o resultado é o que fecha conta.', assumirControle: 'Vamos comparar margem final.' },
  { cenarioNome: 'quer_desconto', educar: 'Desconto não compensa queda de rendimento.', personalizar: 'Na sua área cada saca vale muito.', assumirControle: 'Vamos comparar por hectare.' },
  { cenarioNome: 'muda_decisao', educar: 'Mudar sem critério gera insegurança.', personalizar: 'Na sua decisão precisa ter número.', assumirControle: 'Vamos definir parâmetros.' },
  { cenarioNome: 'pede_sem_info', educar: 'Proposta sem diagnóstico aumenta erro.', personalizar: 'Na sua área cada detalhe muda tudo.', assumirControle: 'Vamos entender primeiro.' },
  { cenarioNome: 'vai_pensar', educar: 'Decisão boa precisa clareza de resultado.', personalizar: 'Na sua situação falta comparar números.', assumirControle: 'Vamos organizar a conta.' },
  { cenarioNome: 'nao_fecha', educar: 'Quando trava é porque falta segurança.', personalizar: 'Na sua área precisamos mostrar resultado.', assumirControle: 'Vamos revisar juntos.' },
  { cenarioNome: 'sucessor_jovem', educar: 'Quem entra novo costuma buscar mais tecnologia.', personalizar: 'Na sua fazenda dá para evoluir sem risco.', assumirControle: 'Vamos avaliar juntos.' },
  { cenarioNome: 'pai_resiste', educar: 'Experiência é valiosa, mas o cenário mudou.', personalizar: 'Na sua área o sistema pode melhorar.', assumirControle: 'Vamos testar pequeno.' },
  { cenarioNome: 'grande_produtor', educar: 'Área grande transforma detalhe em muito dinheiro.', personalizar: 'Na sua fazenda qualquer ganho multiplica.', assumirControle: 'Vamos calcular no total.' },
  { cenarioNome: 'tecnificado', educar: 'Quanto mais tecnificado, mais precisa ajuste fino.', personalizar: 'Na sua área detalhe define resultado.', assumirControle: 'Vamos personalizar manejo.' },
  { cenarioNome: 'quer_dado', educar: 'Hoje decisão forte vem de número real.', personalizar: 'Na sua área temos dados suficientes.', assumirControle: 'Vamos comparar.' },
  { cenarioNome: 'quer_comparar', educar: 'Comparação correta mostra onde ganhar mais.', personalizar: 'Na sua situação a diferença aparece rápido.', assumirControle: 'Vamos montar lado a lado.' },
  { cenarioNome: 'quer_pacote', educar: 'Sistema integrado produz mais que produto isolado.', personalizar: 'Na sua área o conjunto faz diferença.', assumirControle: 'Vamos montar manejo completo.' },
  { cenarioNome: 'quer_solucao', educar: 'Fornecedor bom melhora resultado, não só vende.', personalizar: 'Na sua lavoura precisamos olhar o todo.', assumirControle: 'Vamos construir juntos.' },
  { cenarioNome: 'quer_acompanhamento', educar: 'Resultado vem do manejo durante a safra.', personalizar: 'Na sua área acompanhamento faz diferença.', assumirControle: 'Vamos trabalhar junto.' },
  { cenarioNome: 'quer_parceria', educar: 'Parceria de verdade melhora safra após safra.', personalizar: 'Na sua fazenda dá para evoluir mais.', assumirControle: 'Vamos planejar juntos.' }
];

export const getAgroScenarioEpaPlaybook = (cenarioNome?: string | null): AgroScenarioEpaPlaybook | null => {
  if (!cenarioNome) return null;
  return AGRO_SCENARIO_EPA_PLAYBOOKS.find((item) => item.cenarioNome === cenarioNome) ?? null;
};

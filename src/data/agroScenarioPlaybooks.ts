export interface AgroScenarioPlaybook {
  cenarioNome: string;
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidade: string[];
  opcProcesso?: string;
  epaEducar?: string;
  epaPersonalizar?: string;
  epaControle?: string;
}

export const AGRO_SCENARIO_PLAYBOOKS: AgroScenarioPlaybook[] = [
  {
    cenarioNome: 'resistente_tecnologia',
    situacao: ['Como o senhor costuma avaliar quando chega a hora de mudar alguma coisa no manejo da fazenda?'],
    problema: ['Em quais situações o senhor tem sentido que o sistema atual já não responde como respondia alguns anos atrás?'],
    implicacao: ['Se o ambiente de produção muda e o manejo continua igual, onde normalmente começa a aparecer perda sem perceber?'],
    necessidade: ['Se fosse possível testar uma alternativa de forma segura e em área controlada, faria sentido avaliar?'],
    opcProcesso: 'Conduzir com teste controlado, meta clara por hectare e leitura objetiva de resultado.',
    epaEducar: 'Mostre que o maior risco pode ser manter o modelo antigo em ambiente que já mudou.',
    epaPersonalizar: 'Trate evolução como processo gradual, sem ruptura brusca de manejo.',
    epaControle: 'Feche com área piloto, critério de sucesso e data de revisão.'
  },
  {
    cenarioNome: 'sempre_usou_mesmo',
    situacao: ['Esse manejo que o senhor utiliza hoje já vem sendo usado há quantas safras?'],
    problema: ['O que o senhor tem observado de diferente nas últimas safras mesmo mantendo praticamente o mesmo padrão?'],
    implicacao: ['Quando a gente repete o mesmo manejo por muitos anos, onde normalmente começam a aparecer limitações de produtividade?'],
    necessidade: ['Se existisse uma forma de evoluir o sistema sem aumentar o risco da safra, o senhor estaria disposto a testar em parte da área?'],
    opcProcesso: 'Respeitar histórico e construir benchmarking técnico antes de propor mudança.',
    epaEducar: 'Evolução de manejo não é romper com o passado; é proteger o resultado futuro.',
    epaPersonalizar: 'Use exemplos próximos da realidade da fazenda para reduzir resistência.',
    epaControle: 'Defina comparação simples entre manejo atual e alternativa.'
  },
  {
    cenarioNome: 'nao_acredita_premium',
    situacao: ['Quando o senhor avalia um insumo, o que costuma pesar mais na decisão: o custo na compra ou o resultado na colheita?'],
    problema: ['Já teve situação em que a opção mais barata não entregou o desempenho que o senhor esperava?'],
    implicacao: ['Quando a decisão é feita olhando só preço por saco, onde normalmente aparece o impacto no resultado final?'],
    necessidade: ['Se a gente colocar na ponta do lápis o custo por hectare e por saca produzida, faz sentido comparar?'],
    opcProcesso: 'Reposicionar conversa para custo por resultado e retorno líquido final.',
    epaEducar: 'Preço de entrada não define valor; o que vale é quanto sobra no final.',
    epaPersonalizar: 'Traduza proposta em impacto por hectare no contexto real da operação.',
    epaControle: 'Formalize critério de decisão: retorno, risco e execução.'
  },
  {
    cenarioNome: 'tudo_igual',
    situacao: ['Na sua visão, o que realmente diferencia um fertilizante ou um defensivo do outro no campo?'],
    problema: ['Já aconteceu de dois produtos parecerem iguais no papel, mas entregarem resultados diferentes na lavoura?'],
    implicacao: ['Quando a escolha é feita só por formulação ou preço, onde normalmente aparecem as surpresas?'],
    necessidade: ['Se analisarmos resultado real de campo e não só a etiqueta, o senhor acha válido comparar?'],
    opcProcesso: 'Estruturar comparação técnica justa por posicionamento, performance e resultado econômico.',
    epaEducar: 'Solução “igual” no rótulo pode gerar resultado muito diferente no campo.',
    epaPersonalizar: 'Ajuste comparação ao ambiente e fase da cultura da área em discussão.',
    epaControle: 'Conduza para matriz de decisão com critérios acordados.'
  },
  {
    cenarioNome: 'biologico_nao_funciona',
    situacao: ['O senhor já teve alguma experiência usando biológicos na área?'],
    problema: ['O que aconteceu naquela situação que fez o senhor ficar desconfiado desse tipo de tecnologia?'],
    implicacao: ['Na sua opinião, quando uma tecnologia não funciona, normalmente está mais ligado ao produto ou ao manejo como um todo?'],
    necessidade: ['Se conseguirmos avaliar o cenário e testar de forma mais ajustada, o senhor estaria aberto a olhar novamente?'],
    opcProcesso: 'Revisar histórico de uso e definir protocolo validável antes de nova recomendação.',
    epaEducar: 'Muitas falhas em biológicos vêm de posicionamento e execução, não da tecnologia em si.',
    epaPersonalizar: 'Comece por área e fase com maior chance de resposta consistente.',
    epaControle: 'Feche com protocolo simples e critério de validação.'
  },
  {
    cenarioNome: 'acha_teto_produtivo',
    situacao: ['Hoje qual produtividade média o senhor tem conseguido nessa área?'],
    problema: ['Em que pontos o senhor acredita que ainda existe espaço para melhorar, mesmo que seja pouco?'],
    implicacao: ['Quando a gente acha que chegou no limite, às vezes onde estão escondidas as perdas que não aparecem?'],
    necessidade: ['Se uma pequena mudança pudesse trazer alguns sacos a mais por hectare, faria sentido avaliar?']
  },
  {
    cenarioNome: 'nao_gosta_testar',
    situacao: ['O senhor costuma fazer área de teste quando aparece alguma tecnologia nova?'],
    problema: ['O que normalmente faz o senhor evitar colocar algo diferente na lavoura?'],
    implicacao: ['Sem testar, como o senhor costuma validar se realmente está usando a melhor opção?'],
    necessidade: ['Se fosse um teste pequeno, sem comprometer a área toda, o senhor considera válido?']
  },
  {
    cenarioNome: 'decide_experiencia',
    situacao: ['Hoje suas decisões são mais baseadas na experiência ou o senhor costuma olhar bastante dados de campo também?'],
    problema: ['Já aconteceu de uma experiência passada não se repetir nas condições atuais?'],
    implicacao: ['Quando o ambiente muda e a decisão continua baseada no passado, onde isso pode impactar?'],
    necessidade: ['Se analisarmos números atuais da sua realidade, o senhor acha válido revisar algumas escolhas?']
  },
  {
    cenarioNome: 'evita_tecnico',
    situacao: ['O senhor prefere trabalhar com manejos mais simples ou gosta de entrar mais no detalhe técnico quando precisa?'],
    problema: ['Já deixou de usar alguma tecnologia por falta de explicação clara de como ela funcionava?'],
    implicacao: ['Quando a gente não aprofunda no manejo, onde normalmente aparecem as perdas sem perceber?'],
    necessidade: ['Se eu conseguir te mostrar de forma prática, direto no resultado, vale a conversa?']
  },
  {
    cenarioNome: 'nao_tem_tempo',
    situacao: ['Sei que o dia a dia na fazenda é corrido, como o senhor costuma tomar decisão quando aparece algo novo?'],
    problema: ['Já aconteceu de decidir rápido e depois perceber que poderia ter analisado melhor?'],
    implicacao: ['Quando a decisão é feita muito na correria, onde normalmente aparecem os erros?'],
    necessidade: ['Se eu for direto ao ponto e mostrar só o que impacta no resultado, vale alguns minutos?']
  },
  {
    cenarioNome: 'so_preco',
    situacao: ['Hoje quando o senhor vai fechar uma compra, o que pesa mais: preço do produto ou custo final da lavoura?'],
    problema: ['Já teve situação em que economizou na compra e depois perdeu em produtividade?'],
    implicacao: ['Quando a gente olha só o preço por saco, onde costuma aparecer a diferença no resultado?'],
    necessidade: ['Se a gente comparar pelo custo por hectare ou por saca colhida, faz sentido avaliar?']
  },
  {
    cenarioNome: 'pede_cotacoes',
    situacao: ['O senhor costuma pedir várias cotações antes de decidir?'],
    problema: ['Quando os preços são parecidos, o que normalmente faz o senhor escolher um ou outro?'],
    implicacao: ['Quando a comparação fica só no preço, onde pode estar ficando a diferença de resultado?'],
    necessidade: ['Se compararmos pelo retorno na colheita, o senhor acha justo analisar assim?']
  },
  {
    cenarioNome: 'compara_errado',
    situacao: ['Quando o senhor compara dois produtos, o que normalmente o senhor leva em consideração?'],
    problema: ['Já aconteceu de comparar produtos parecidos no nome mas diferentes no desempenho?'],
    implicacao: ['Quando a comparação não considera manejo e tecnologia, onde isso pode levar a erro?'],
    necessidade: ['Se fizermos uma comparação mais técnica e olhando resultado final, vale a pena?']
  },
  {
    cenarioNome: 'olha_preco_saco',
    situacao: ['Normalmente o senhor olha mais o preço por saco ou o custo total por hectare?'],
    problema: ['Já fez a conta de quanto cada decisão pesa na produtividade final?'],
    implicacao: ['Quando a análise fica só no valor da compra, onde pode estar o prejuízo escondido?'],
    necessidade: ['Se colocarmos tudo na conta por saca produzida, o senhor acha válido comparar?']
  },
  {
    cenarioNome: 'nao_calcula_hectare',
    situacao: ['Hoje o senhor costuma calcular custo por hectare ou decide mais pelo valor do produto?'],
    problema: ['Sem essa conta, como o senhor avalia se realmente foi uma boa decisão?'],
    implicacao: ['Pode acontecer de economizar na compra e perder no resultado sem perceber?'],
    necessidade: ['Se fizermos a conta completa do sistema, o senhor acha que ajuda na decisão?']
  },
  {
    cenarioNome: 'nao_calcula_saca',
    situacao: ['Quando o senhor avalia um manejo ou um insumo, como costuma fazer a conta para saber se realmente valeu a pena?'],
    problema: ['Já teve situação em que o custo parecia bom na compra mas o resultado na colheita não acompanhou?'],
    implicacao: ['Quando a análise fica só no valor por saco e não no resultado por saca produzida, onde normalmente a margem começa a escapar?'],
    necessidade: ['Se a gente fizer essa conta juntos em cima da sua realidade, o senhor acha válido comparar?']
  },
  {
    cenarioNome: 'nao_calcula_retorno',
    situacao: ['Na hora de escolher entre duas opções, como o senhor costuma avaliar qual delas realmente deixa mais dinheiro no final da safra?'],
    problema: ['Já aconteceu de economizar na compra e depois perceber que a produtividade caiu mais do que o esperado?'],
    implicacao: ['Quando a decisão é feita olhando só o custo e não o retorno por hectare, onde normalmente aparece a diferença?'],
    necessidade: ['Se a gente analisar o investimento junto com o resultado esperado, o senhor considera importante?']
  },
  {
    cenarioNome: 'pressiona_preco',
    situacao: ['Quando chega o momento de fechar a compra, como o senhor costuma equilibrar preço, resultado e segurança da safra?'],
    problema: ['Já teve situação em que conseguiu um bom desconto mas depois sentiu que o desempenho da lavoura não foi o mesmo?'],
    implicacao: ['Quando a negociação fica muito focada no preço, onde isso costuma aparecer lá na colheita?'],
    necessidade: ['Se a gente comparar as opções pensando no resultado final da área, o senhor acha justo analisar assim?']
  },
  {
    cenarioNome: 'troca_por_centavos',
    situacao: ['Quando a diferença de preço entre fornecedores é pequena, o que normalmente pesa mais na sua decisão?'],
    problema: ['Já aconteceu de trocar por pouca diferença e depois perceber que o resultado não foi igual?'],
    implicacao: ['Quando a escolha é feita por centavos na compra, onde isso pode virar sacas na colheita?'],
    necessidade: ['Se a gente olhar o sistema completo e não só o preço do produto, o senhor considera uma comparação válida?']
  },
  {
    cenarioNome: 'quer_desconto_antes',
    situacao: ['Quando alguém te apresenta uma proposta nova, o senhor prefere começar pelo preço ou entender primeiro como aquilo funciona na lavoura?'],
    problema: ['Já teve situação em que olhar o preço antes fez parecer que não valia, mas depois viu que entregava mais?'],
    implicacao: ['Quando a decisão começa pelo valor e não pelo resultado, onde isso pode levar a erro?'],
    necessidade: ['Se eu te mostrar primeiro o impacto no campo e depois falamos de preço, o senhor acha justo?']
  },
  {
    cenarioNome: 'fiel_concorrente',
    situacao: ['Imagino que o senhor já tenha uma parceria antiga com o fornecedor atual, o que fez essa relação se manter por tanto tempo?'],
    problema: ['Mesmo trabalhando há anos com a mesma tecnologia, existe algum ponto que o senhor sente que ainda poderia melhorar?'],
    implicacao: ['Quando a gente permanece muito tempo no mesmo manejo, onde podem surgir perdas que passam despercebidas?'],
    necessidade: ['Se for para comparar sem compromisso, só olhando resultado, o senhor vê problema?']
  },
  {
    cenarioNome: 'amizade_concorrente',
    situacao: ['Vejo que existe confiança com quem já te atende hoje, o que normalmente faz o senhor continuar com o mesmo fornecedor?'],
    problema: ['Já teve situação em que a relação era boa, mas o resultado poderia ter sido melhor?'],
    implicacao: ['Quando a decisão fica muito baseada na confiança e pouco nos números, onde isso pode pesar?'],
    necessidade: ['Se a gente olhar os dados da sua área sem mexer no que já funciona, o senhor considera válido?']
  },
  {
    cenarioNome: 'pacote_fechado',
    situacao: ['O senhor costuma definir o pacote da safra com bastante antecedência ou vai ajustando ao longo do tempo?'],
    problema: ['Depois que o pacote está fechado, costuma aparecer coisa nova que daria vontade de testar?'],
    implicacao: ['Quando o planejamento é feito cedo demais, existe risco de perder alguma oportunidade?'],
    necessidade: ['Se for para avaliar pensando na próxima safra ou em parte da área, faz sentido conversar?']
  },
  {
    cenarioNome: 'nao_quer_teste',
    situacao: ['Na sua forma de trabalhar, o senhor prefere manter o que já conhece ou costuma testar alguma coisa diferente de vez em quando?'],
    problema: ['Já aconteceu de ver outro produtor testar algo e ter resultado melhor?'],
    implicacao: ['Sem fazer algum tipo de comparação em campo, como o senhor costuma validar se está no melhor manejo?'],
    necessidade: ['Se for um teste pequeno, sem comprometer a safra inteira, o senhor considera?']
  },
  {
    cenarioNome: 'concorrente_presente',
    situacao: ['Hoje o senhor recebe bastante visita de diferentes fornecedores aqui na fazenda?'],
    problema: ['Com tanta informação chegando, o que normalmente faz o senhor confiar em uma recomendação?'],
    implicacao: ['Quando todo mundo fala parecido, onde fica difícil enxergar a diferença real?'],
    necessidade: ['Se eu te mostrar números da sua própria área, o senhor acha que ajuda na decisão?']
  },
  {
    cenarioNome: 'contrato_antecipado',
    situacao: ['Quando o senhor trava compras antecipadas, o que normalmente pesa mais nessa decisão?'],
    problema: ['Depois que o contrato está feito, já aconteceu de aparecer tecnologia que parecia melhor?'],
    implicacao: ['Quando o cenário muda e o planejamento já está fechado, onde isso pode limitar o resultado?'],
    necessidade: ['Se for para analisar antes da próxima decisão, o senhor acha importante comparar mais opções?']
  },
  {
    cenarioNome: 'compra_cooperativa',
    situacao: ['O senhor costuma concentrar a maior parte das compras na cooperativa?'],
    problema: ['Já chegou a comparar resultados diferentes usando manejos distintos dentro da mesma área?'],
    implicacao: ['Quando a gente compra tudo no mesmo lugar, existe o risco de deixar de enxergar alternativa?'],
    necessidade: ['Se for para complementar e não para substituir, o senhor considera avaliar?']
  },
  {
    cenarioNome: 'parceria_financeira',
    situacao: ['Quando o fornecedor também entra com condição financeira, como o senhor equilibra isso com o resultado técnico?'],
    problema: ['Já teve situação em que a condição ajudou no caixa mas o desempenho no campo não foi o esperado?'],
    implicacao: ['Quando a decisão passa muito pela parte financeira, onde isso pode limitar a produtividade?'],
    necessidade: ['Se a gente comparar pensando na margem final da safra, o senhor acha válido analisar?']
  },
  {
    cenarioNome: 'sempre_deu_certo',
    situacao: ['Esse manejo que o senhor usa hoje já vem dando resultado há várias safras, certo?'],
    problema: ['Nos últimos anos o senhor percebeu alguma mudança no comportamento da área mesmo fazendo tudo parecido?'],
    implicacao: ['Quando o ambiente muda e o manejo continua igual, onde costumam aparecer as primeiras perdas?'],
    necessidade: ['Se a gente olhar o que mudou no solo, no clima e na genética, o senhor considera revisar?']
  },
  {
    cenarioNome: 'nao_compara',
    situacao: ['Hoje o senhor costuma olhar o que tem de diferente no mercado ou prefere manter o que já conhece?'],
    problema: ['Já aconteceu de descobrir depois que existia uma alternativa que poderia ter dado mais resultado?'],
    implicacao: ['Quando a gente não compara, como ter certeza que está no melhor custo-benefício?'],
    necessidade: ['Se eu te trouxer comparativos reais de campo, o senhor acha válido analisar juntos?']
  },
  {
    cenarioNome: 'margem_apertada',
    situacao: ['Com a margem cada vez mais apertada nas últimas safras, como o senhor tem feito para decidir onde vale investir mais e onde prefere economizar?'],
    problema: ['Em quais momentos o senhor já percebeu que cortar custo em um ponto acabou pesando mais no resultado final?'],
    implicacao: ['Quando a decisão é tomada olhando só o valor investido e não o retorno por hectare, onde normalmente a margem começa a escapar?'],
    necessidade: ['Se a gente conseguir identificar pontos onde investir um pouco mais pode proteger ou aumentar a margem, o senhor acha válido analisar?']
  },
  {
    cenarioNome: 'endividado',
    situacao: ['Com o cenário financeiro mais pressionado, como o senhor tem priorizado os investimentos dentro da safra?'],
    problema: ['Já teve situação em que, por segurança, acabou escolhendo a opção mais barata e depois sentiu no resultado?'],
    implicacao: ['Quando a decisão é guiada só pelo caixa do momento, onde isso pode comprometer o desempenho da lavoura?'],
    necessidade: ['Se a gente olhar junto onde realmente vale colocar dinheiro para garantir resultado, o senhor considera essa análise importante?']
  },
  {
    cenarioNome: 'caixa_ruim',
    situacao: ['Quando o fluxo de caixa fica mais apertado, como o senhor decide o que manter e o que cortar no manejo?'],
    problema: ['Já aconteceu de reduzir investimento e depois perceber que a perda na produtividade foi maior do que a economia?'],
    implicacao: ['Quando o ajuste é feito só pensando no custo imediato, onde isso costuma aparecer lá na colheita?'],
    necessidade: ['Se a gente conseguir montar um manejo mais equilibrado entre custo e resultado, faz sentido avaliar?']
  },
  {
    cenarioNome: 'medo_investir',
    situacao: ['Depois de safras mais difíceis, como o senhor tem se sentido na hora de decidir se vale a pena investir em tecnologia?'],
    problema: ['Já aconteceu de ficar mais conservador e depois perceber que poderia ter ido melhor?'],
    implicacao: ['Quando o receio de errar leva a decisões mais defensivas, onde isso costuma limitar o resultado?'],
    necessidade: ['Se a gente conseguir avaliar juntos o risco e o retorno antes de decidir, o senhor acha que ajuda na segurança da decisão?']
  },
  {
    cenarioNome: 'quer_cortar_custo',
    situacao: ['Hoje, com os custos altos, como o senhor tem definido o que realmente pode ser reduzido sem comprometer a produtividade?'],
    problema: ['Já teve situação em que cortar um item parecia economia, mas depois pesou no rendimento?'],
    implicacao: ['Quando o corte é feito sem olhar o sistema como um todo, onde normalmente aparece a conta mais cara?'],
    necessidade: ['Se a gente analisar o manejo completo pensando no resultado por hectare, o senhor acha válido revisar alguns pontos?']
  },
  {
    cenarioNome: 'cortou_tecnologia',
    situacao: ['Nas últimas safras o senhor chegou a reduzir alguma tecnologia para tentar equilibrar custo?'],
    problema: ['O que o senhor percebeu de diferença no comportamento da lavoura depois disso?'],
    implicacao: ['Quando o nível tecnológico cai um pouco, onde normalmente começam a aparecer as perdas que nem sempre são fáceis de enxergar?'],
    necessidade: ['Se a gente conseguir identificar onde vale retomar investimento para recuperar resultado, o senhor considera analisar?']
  },
  {
    cenarioNome: 'prejuizo_anterior',
    situacao: ['Depois de uma safra com resultado abaixo do esperado, como o senhor tem pensado o planejamento da próxima?'],
    problema: ['O que o senhor acredita que mais pesou naquele resultado que não veio como esperado?'],
    implicacao: ['Quando a gente tenta reagir só cortando custo, onde existe o risco de repetir o problema?'],
    necessidade: ['Se a gente fizer uma análise mais fria do que realmente impacta produtividade, o senhor acha válido rever o manejo?']
  },
  {
    cenarioNome: 'medo_mercado',
    situacao: ['Com tanta variação de preço de soja, milho e insumos, como o senhor tem tomado decisão de investimento?'],
    problema: ['Já teve situação em que a insegurança do mercado fez o senhor segurar investimento e depois faltou resultado?'],
    implicacao: ['Quando a decisão fica muito travada pelo cenário externo, onde isso pode limitar o potencial da área?'],
    necessidade: ['Se a gente separar o que é risco de mercado do que é manejo dentro da porteira, o senhor acha que ajuda?']
  },
  {
    cenarioNome: 'so_curto_prazo',
    situacao: ['Hoje o senhor costuma planejar mais safra a safra ou pensa também no resultado de médio prazo da área?'],
    problema: ['Já percebeu situações em que economizar em uma safra acabou prejudicando as próximas?'],
    implicacao: ['Quando a decisão fica muito focada no curto prazo, onde isso pode comprometer fertilidade, sanidade ou produtividade?'],
    necessidade: ['Se a gente olhar o manejo pensando em mais de uma safra, o senhor considera uma análise importante?']
  },
  {
    cenarioNome: 'sem_planejamento',
    situacao: ['Normalmente o senhor consegue planejar o manejo com antecedência ou muita coisa acaba sendo decidida durante a safra?'],
    problema: ['Quando as decisões vão sendo tomadas no meio do caminho, onde costuma ficar mais difícil manter o resultado?'],
    implicacao: ['Já aconteceu de faltar tempo para avaliar melhor e depois perceber que poderia ter feito diferente?'],
    necessidade: ['Se a gente conseguir organizar algumas decisões antes da safra, o senhor acha que ajuda no resultado?']
  },
  {
    cenarioNome: 'quer_rapido',
    situacao: ['Quando aparece uma decisão para tomar na fazenda, o senhor prefere resolver rápido ou gosta de olhar com mais calma?'],
    problema: ['Já teve situação em que decidir muito rápido acabou não sendo a melhor escolha?'],
    implicacao: ['Quando a decisão é acelerada pela correria do dia a dia, onde normalmente aparecem os erros?'],
    necessidade: ['Se eu conseguir te mostrar de forma objetiva só o que impacta no resultado, vale parar alguns minutos?']
  },
  {
    cenarioNome: 'nao_ouve',
    situacao: ['Com tanta gente oferecendo produto hoje, como o senhor costuma filtrar o que realmente vale a pena ouvir?'],
    problema: ['Já teve situação em que quase não deu atenção e depois viu que poderia ter sido interessante?'],
    implicacao: ['Quando a gente fecha a conversa muito cedo, existe o risco de deixar passar alguma oportunidade?'],
    necessidade: ['Se eu for direto no ponto e falar só do que impacta na sua área, o senhor acha válido escutar?']
  },
  {
    cenarioNome: 'desconfiado',
    situacao: ['Hoje com tanta oferta no mercado, o que faz o senhor confiar ou não em uma recomendação?'],
    problema: ['Já teve experiência em que a promessa foi boa mas o resultado não veio?'],
    implicacao: ['Quando a confiança fica baixa, como o senhor costuma decidir mesmo assim?'],
    necessidade: ['Se a gente trabalhar em cima de dados da sua área e não só de conversa, o senhor se sente mais seguro?']
  },
  {
    cenarioNome: 'acha_comissao',
    situacao: ['Na sua visão, o que diferencia um vendedor que quer só vender de alguém que realmente quer ajudar no resultado?'],
    problema: ['Já teve situação em que sentiu que a recomendação não estava alinhada com o que era melhor para a lavoura?'],
    implicacao: ['Quando a decisão é tomada sem ter segurança na recomendação, onde isso pode custar?'],
    necessidade: ['Se a gente basear tudo em número de campo e resultado por hectare, o senhor acha justo avaliar?']
  },
  {
    cenarioNome: 'quer_prazo',
    situacao: ['Hoje na hora de fechar negócio, quanto pesa a condição de pagamento na decisão?'],
    problema: ['Já teve situação em que a condição era boa, mas o resultado do produto não acompanhou?'],
    implicacao: ['Quando a escolha é feita mais pelo prazo do que pela performance, onde isso pode aparecer na colheita?'],
    necessidade: ['Se a gente comparar pensando na margem final da safra e não só no prazo, o senhor acha válido?']
  },
  {
    cenarioNome: 'quer_desconto',
    situacao: ['Quando chega na fase final da negociação, como o senhor costuma decidir se vale mais insistir em desconto ou garantir o melhor resultado?'],
    problema: ['Já teve situação em que o desconto parecia bom na hora, mas depois o desempenho da lavoura não acompanhou?'],
    implicacao: ['Quando a escolha é feita mais pelo preço do que pela performance, onde isso costuma aparecer no resultado final?'],
    necessidade: ['Se a gente comparar pensando na margem da safra inteira e não só no valor da compra, o senhor acha justo analisar?']
  },
  {
    cenarioNome: 'muda_decisao',
    situacao: ['Quando o senhor está avaliando uma compra importante, o que normalmente faz mudar de ideia no meio do processo?'],
    problema: ['Já aconteceu de mudar a decisão na última hora e depois ficar na dúvida se foi a melhor escolha?'],
    implicacao: ['Quando a decisão muda sem ter todos os números na mesa, onde pode estar o risco?'],
    necessidade: ['Se a gente conseguir estruturar a comparação de forma mais clara, o senhor acha que ajuda na segurança?']
  },
  {
    cenarioNome: 'pede_sem_info',
    situacao: ['Quando o senhor pede uma proposta, o que normalmente precisa ter claro para conseguir decidir com segurança?'],
    problema: ['Já teve situação em que recebeu preço rápido, mas depois faltou informação para ter certeza da escolha?'],
    implicacao: ['Quando a decisão é feita sem analisar todo o manejo, onde isso pode impactar no resultado?'],
    necessidade: ['Se antes da proposta a gente entender bem a realidade da área, o senhor acha que ajuda na decisão?']
  },
  {
    cenarioNome: 'vai_pensar',
    situacao: ['Quando o senhor diz que precisa pensar mais antes de decidir, o que normalmente ainda fica faltando analisar?'],
    problema: ['Já aconteceu de deixar para decidir depois e acabar fechando sem ter tanta convicção?'],
    implicacao: ['Quando a decisão fica em aberto por muito tempo, onde isso pode atrapalhar o planejamento da safra?'],
    necessidade: ['Se a gente organizar juntos os pontos mais importantes da decisão, o senhor acha que facilita?']
  },
  {
    cenarioNome: 'nao_fecha',
    situacao: ['Quando uma negociação não avança, o que normalmente pesa mais para o senhor segurar a decisão?'],
    problema: ['Já teve situação em que a proposta parecia boa, mas faltou segurança para fechar?'],
    implicacao: ['Quando fica alguma dúvida no manejo ou no resultado esperado, onde isso costuma travar a decisão?'],
    necessidade: ['Se a gente conseguir esclarecer os números e o impacto na área, o senhor considera retomar a conversa?']
  },
  {
    cenarioNome: 'sucessor_jovem',
    situacao: ['Hoje quem mais participa das decisões técnicas na fazenda, o senhor ou a nova geração?'],
    problema: ['Já percebeu diferença na forma como cada geração avalia tecnologia e investimento?'],
    implicacao: ['Quando existe visão diferente dentro da fazenda, onde isso costuma dificultar a decisão?'],
    necessidade: ['Se a gente conseguir analisar juntos com todos os envolvidos, o senhor acha que ajuda a alinhar?']
  },
  {
    cenarioNome: 'pai_resiste',
    situacao: ['Quando aparecem ideias novas na fazenda, como normalmente vocês decidem se vale a pena mudar?'],
    problema: ['Já aconteceu de alguém querer testar algo diferente e a decisão acabar ficando mais conservadora?'],
    implicacao: ['Quando a mudança demora a acontecer, onde isso pode limitar o crescimento da produtividade?'],
    necessidade: ['Se a gente trouxer números da própria área para discutir juntos, o senhor considera válido?']
  },
  {
    cenarioNome: 'grande_produtor',
    situacao: ['Em uma operação maior como a sua, o que normalmente pesa mais na decisão: custo por hectare, resultado total ou risco?'],
    problema: ['Já teve situação em que uma pequena diferença por hectare virou um valor grande no total da área?'],
    implicacao: ['Quando o manejo não é ajustado para o tamanho da operação, onde isso pode impactar mais?'],
    necessidade: ['Se a gente fizer a conta pensando no resultado da fazenda inteira, o senhor acha importante?']
  },
  {
    cenarioNome: 'tecnificado',
    situacao: ['Como o senhor costuma validar se uma tecnologia nova realmente faz sentido para o seu sistema?'],
    problema: ['Já aconteceu de um produto funcionar bem em média, mas não entregar no seu nível de produtividade?'],
    implicacao: ['Quando a recomendação não considera as condições específicas da área, onde pode aparecer erro?'],
    necessidade: ['Se a gente analisar dados da sua realidade e não só média de mercado, o senhor acha válido?']
  },
  {
    cenarioNome: 'quer_dado',
    situacao: ['Na hora de decidir, que tipo de informação realmente te dá segurança para avançar?'],
    problema: ['Já teve situação em que os números apresentados não refletiam o que acontece na sua área?'],
    implicacao: ['Quando os dados são genéricos demais, onde fica difícil confiar na recomendação?'],
    necessidade: ['Se a gente trabalhar com números próximos da sua realidade, o senhor considera mais justo?']
  },
  {
    cenarioNome: 'quer_comparar',
    situacao: ['Quando o senhor compara duas tecnologias, o que precisa estar claro para ter segurança na escolha?'],
    problema: ['Já teve situação em que parecia tudo parecido, mas no campo o resultado foi diferente?'],
    implicacao: ['Quando a comparação não considera manejo completo, onde pode estar o erro?'],
    necessidade: ['Se a gente comparar pensando no sistema inteiro e não só no produto, o senhor acha válido?']
  },
  {
    cenarioNome: 'quer_pacote',
    situacao: ['Hoje o senhor prefere trabalhar com soluções completas ou avaliar produto por produto?'],
    problema: ['Já percebeu que quando o manejo não conversa entre si, o resultado pode não aparecer?'],
    implicacao: ['Quando cada decisão é tomada isolada, onde isso pode reduzir eficiência?'],
    necessidade: ['Se a gente montar o manejo como um sistema integrado, o senhor acha que faz sentido?']
  },
  {
    cenarioNome: 'quer_solucao',
    situacao: ['Quando o senhor procura um fornecedor, espera mais preço ou ajuda para melhorar resultado?'],
    problema: ['Já teve situação em que recebeu produto, mas faltou acompanhamento no manejo?'],
    implicacao: ['Quando a recomendação não considera o sistema inteiro, onde isso pode limitar produtividade?'],
    necessidade: ['Se a gente trabalhar pensando no resultado da área e não só na venda, o senhor considera?']
  },
  {
    cenarioNome: 'quer_acompanhamento',
    situacao: ['Na sua experiência, quanto pesa ter acompanhamento técnico ao longo da safra?'],
    problema: ['Já teve situação em que o produto era bom, mas faltou ajuste no manejo?'],
    implicacao: ['Quando a decisão é feita só na compra e não no acompanhamento, onde isso pode custar?'],
    necessidade: ['Se a gente trabalhar junto durante a safra, o senhor acha que aumenta a segurança?']
  },
  {
    cenarioNome: 'quer_parceria',
    situacao: ['Quando o senhor pensa em parceria com um fornecedor, o que mais pesa para manter essa relação?'],
    problema: ['Já teve situação em que a parceria era boa, mas o resultado poderia ter sido melhor?'],
    implicacao: ['Quando a relação fica só comercial e não técnica, onde isso pode limitar o potencial?'],
    necessidade: ['Se a gente construir um trabalho olhando resultado safra após safra, o senhor considera?']
  }
];

export const getAgroScenarioPlaybook = (cenarioNome?: string | null): AgroScenarioPlaybook | null => {
  if (!cenarioNome) return null;
  return AGRO_SCENARIO_PLAYBOOKS.find((item) => item.cenarioNome === cenarioNome) ?? null;
};

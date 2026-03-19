export interface AgroScenarioOpcPlaybook {
  cenarioNome: string;
  objetivo: string;
  processo: string;
  compromisso: string;
}

export const AGRO_SCENARIO_OPC_PLAYBOOKS: AgroScenarioOpcPlaybook[] = [
  { cenarioNome: 'resistente_tecnologia', objetivo: 'Abrir espaço para avaliar nova tecnologia sem confronto.', processo: 'Explorar manejo atual, identificar limites, mostrar mudança do ambiente e propor teste pequeno e seguro.', compromisso: 'Aceitar analisar dados, aceitar teste parcial e marcar retorno.' },
  { cenarioNome: 'sempre_usou_mesmo', objetivo: 'Levar o produtor a questionar o padrão atual.', processo: 'Investigar histórico, mostrar mudanças no sistema, comparar resultados e propor evolução gradual.', compromisso: 'Aceitar comparar números e avaliar alternativa.' },
  { cenarioNome: 'nao_acredita_premium', objetivo: 'Mudar decisão de preço para resultado.', processo: 'Explorar critério de compra, calcular custo por hectare, calcular custo por saca e mostrar retorno.', compromisso: 'Aceitar fazer conta e avaliar proposta.' },
  { cenarioNome: 'tudo_igual', objetivo: 'Mostrar diferença real entre tecnologias.', processo: 'Explorar como compara hoje, mostrar diferenças técnicas e mostrar impacto no campo.', compromisso: 'Aceitar comparar dados e aceitar análise técnica.' },
  { cenarioNome: 'biologico_nao_funciona', objetivo: 'Reabrir conversa sobre biológicos.', processo: 'Entender experiência anterior, identificar falha, mostrar nova abordagem e propor teste.', compromisso: 'Aceitar revisar cenário e aceitar teste.' },
  { cenarioNome: 'acha_teto_produtivo', objetivo: 'Mostrar que ainda há espaço para ganho.', processo: 'Explorar produtividade atual, identificar gargalos e mostrar dados de referência.', compromisso: 'Aceitar avaliar ajuste de manejo.' },
  { cenarioNome: 'nao_gosta_testar', objetivo: 'Abrir espaço para teste controlado.', processo: 'Explorar histórico, mostrar risco de não testar e propor área pequena.', compromisso: 'Aceitar teste parcial e marcar avaliação.' },
  { cenarioNome: 'decide_experiencia', objetivo: 'Levar decisão para dados e números.', processo: 'Explorar experiência, mostrar mudanças do ambiente e comparar resultados.', compromisso: 'Aceitar analisar números.' },
  { cenarioNome: 'evita_tecnico', objetivo: 'Gerar interesse por entender manejo.', processo: 'Conversar de forma simples, mostrar impacto prático e conectar com resultado.', compromisso: 'Aceitar ouvir explicação e aceitar análise.' },
  { cenarioNome: 'nao_tem_tempo', objetivo: 'Conseguir atenção para decisão importante.', processo: 'Ser direto, focar no resultado e mostrar impacto econômico.', compromisso: 'Aceitar conversar alguns minutos.' },
  { cenarioNome: 'so_preco', objetivo: 'Mudar foco de preço para custo final.', processo: 'Explorar forma de compra, calcular custo por hectare e calcular custo por saca.', compromisso: 'Aceitar comparar por resultado.' },
  { cenarioNome: 'pede_cotacoes', objetivo: 'Diferenciar sem entrar na guerra de preço.', processo: 'Entender critérios, mostrar diferença técnica e mostrar impacto no campo.', compromisso: 'Aceitar comparar tecnicamente.' },
  { cenarioNome: 'compara_errado', objetivo: 'Ensinar a comparar corretamente.', processo: 'Explorar comparação atual, mostrar diferenças e mostrar efeito no resultado.', compromisso: 'Aceitar nova comparação.' },
  { cenarioNome: 'olha_preco_saco', objetivo: 'Levar análise para custo por hectare.', processo: 'Explorar forma de cálculo e mostrar impacto no resultado.', compromisso: 'Aceitar fazer conta completa.' },
  { cenarioNome: 'nao_calcula_hectare', objetivo: 'Introduzir análise econômica correta.', processo: 'Mostrar custo por hectare, custo por saca e retorno.', compromisso: 'Aceitar calcular junto.' },
  { cenarioNome: 'nao_calcula_saca', objetivo: 'Levar decisão para margem por saca.', processo: 'Explorar cálculo atual e mostrar diferença na colheita.', compromisso: 'Aceitar comparar por saca.' },
  { cenarioNome: 'nao_calcula_retorno', objetivo: 'Mostrar importância do retorno.', processo: 'Explorar decisão atual, calcular retorno e mostrar cenário.', compromisso: 'Aceitar avaliar retorno.' },
  { cenarioNome: 'pressiona_preco', objetivo: 'Evitar guerra de preço.', processo: 'Reconhecer negociação, mostrar impacto no resultado e comparar margem.', compromisso: 'Aceitar comparar por resultado.' },
  { cenarioNome: 'troca_por_centavos', objetivo: 'Mostrar risco de decidir por preço.', processo: 'Explorar histórico e mostrar diferença na lavoura.', compromisso: 'Aceitar avaliar sistema completo.' },
  { cenarioNome: 'quer_desconto_antes', objetivo: 'Segurar preço e mostrar valor primeiro.', processo: 'Entender expectativa, mostrar resultado e depois preço.', compromisso: 'Aceitar analisar antes do preço.' },
  { cenarioNome: 'fiel_concorrente', objetivo: 'Abrir espaço sem atacar concorrente.', processo: 'Reconhecer parceria, mostrar oportunidade e comparar resultado.', compromisso: 'Aceitar comparar dados.' },
  { cenarioNome: 'amizade_concorrente', objetivo: 'Entrar sem confronto.', processo: 'Valorizar relação, mostrar números e propor análise.', compromisso: 'Aceitar avaliar alternativa.' },
  { cenarioNome: 'pacote_fechado', objetivo: 'Manter porta aberta para futuro.', processo: 'Entender planejamento e mostrar oportunidade futura.', compromisso: 'Aceitar revisar próxima safra.' },
  { cenarioNome: 'nao_quer_teste', objetivo: 'Convencer a testar pequeno.', processo: 'Mostrar risco de não testar e propor área pequena.', compromisso: 'Aceitar teste.' },
  { cenarioNome: 'concorrente_presente', objetivo: 'Diferenciar pela técnica.', processo: 'Evitar falar de preço, mostrar resultado e mostrar dados.', compromisso: 'Aceitar analisar números.' },
  { cenarioNome: 'contrato_antecipado', objetivo: 'Preparar próxima decisão.', processo: 'Entender contrato e mostrar melhoria futura.', compromisso: 'Aceitar avaliar antes da próxima compra.' },
  { cenarioNome: 'compra_cooperativa', objetivo: 'Entrar como complemento.', processo: 'Respeitar cooperativa e mostrar ganho adicional.', compromisso: 'Aceitar testar parcial.' },
  { cenarioNome: 'parceria_financeira', objetivo: 'Levar decisão para margem.', processo: 'Reconhecer condição e mostrar impacto no resultado.', compromisso: 'Aceitar comparar margem.' },
  { cenarioNome: 'sempre_deu_certo', objetivo: 'Mostrar mudança do ambiente.', processo: 'Explorar histórico e mostrar mudança de cenário.', compromisso: 'Aceitar revisar manejo.' },
  { cenarioNome: 'nao_compara', objetivo: 'Estimular comparação.', processo: 'Mostrar risco de não comparar e trazer dados.', compromisso: 'Aceitar analisar alternativas.' },
  { cenarioNome: 'margem_apertada', objetivo: 'Proteger margem aumentando eficiência.', processo: 'Explorar custo atual, identificar perdas e mostrar pontos de ganho.', compromisso: 'Aceitar revisar manejo.' },
  { cenarioNome: 'endividado', objetivo: 'Priorizar investimento com retorno.', processo: 'Entender situação financeira e mostrar onde investir melhor.', compromisso: 'Aceitar analisar retorno.' },
  { cenarioNome: 'caixa_ruim', objetivo: 'Equilibrar custo e produtividade.', processo: 'Explorar cortes feitos e mostrar impacto na lavoura.', compromisso: 'Aceitar reavaliar manejo.' },
  { cenarioNome: 'medo_investir', objetivo: 'Reduzir medo mostrando números.', processo: 'Entender receio, calcular risco e retorno.', compromisso: 'Aceitar avaliar cenário.' },
  { cenarioNome: 'quer_cortar_custo', objetivo: 'Evitar corte errado.', processo: 'Explorar onde quer cortar e mostrar impacto.', compromisso: 'Aceitar analisar sistema completo.' },
  { cenarioNome: 'cortou_tecnologia', objetivo: 'Recuperar nível tecnológico.', processo: 'Entender redução e mostrar perda de eficiência.', compromisso: 'Aceitar ajustar manejo.' },
  { cenarioNome: 'prejuizo_anterior', objetivo: 'Evitar repetir erro.', processo: 'Analisar safra passada e identificar causa.', compromisso: 'Aceitar planejar diferente.' },
  { cenarioNome: 'medo_mercado', objetivo: 'Separar risco de mercado e manejo.', processo: 'Conversar sobre preços e focar no que controla.', compromisso: 'Aceitar focar na produtividade.' },
  { cenarioNome: 'so_curto_prazo', objetivo: 'Levar visão para mais de uma safra.', processo: 'Explorar planejamento e mostrar efeito no solo.', compromisso: 'Aceitar pensar médio prazo.' },
  { cenarioNome: 'sem_planejamento', objetivo: 'Organizar decisão antes da safra.', processo: 'Entender rotina e mostrar vantagem de planejar.', compromisso: 'Aceitar planejar antes.' },
  { cenarioNome: 'quer_rapido', objetivo: 'Conseguir tempo para decisão melhor.', processo: 'Ir direto ao resultado e mostrar impacto.', compromisso: 'Aceitar analisar rapidamente.' },
  { cenarioNome: 'nao_ouve', objetivo: 'Ganhar atenção com relevância.', processo: 'Falar da realidade dele e mostrar dados.', compromisso: 'Aceitar ouvir.' },
  { cenarioNome: 'desconfiado', objetivo: 'Gerar confiança com números.', processo: 'Evitar promessa e mostrar dados reais.', compromisso: 'Aceitar avaliar dados.' },
  { cenarioNome: 'acha_comissao', objetivo: 'Mostrar foco no resultado.', processo: 'Conversar sobre produtividade e mostrar conta.', compromisso: 'Aceitar analisar números.' },
  { cenarioNome: 'quer_prazo', objetivo: 'Levar decisão para margem final.', processo: 'Reconhecer prazo e mostrar impacto no resultado.', compromisso: 'Aceitar comparar margem.' },
  { cenarioNome: 'quer_desconto', objetivo: 'Evitar desconto sem análise.', processo: 'Mostrar diferença de resultado e comparar custo.', compromisso: 'Aceitar comparar por hectare.' },
  { cenarioNome: 'muda_decisao', objetivo: 'Trazer segurança na escolha.', processo: 'Organizar dados e comparar cenários.', compromisso: 'Aceitar definir critério.' },
  { cenarioNome: 'pede_sem_info', objetivo: 'Diagnosticar antes de propor.', processo: 'Entender área e depois montar proposta.', compromisso: 'Aceitar responder perguntas.' },
  { cenarioNome: 'vai_pensar', objetivo: 'Avançar na decisão.', processo: 'Entender dúvida e esclarecer números.', compromisso: 'Aceitar próxima etapa.' },
  { cenarioNome: 'nao_fecha', objetivo: 'Descobrir trava real.', processo: 'Explorar motivo e mostrar impacto.', compromisso: 'Aceitar rever proposta.' },
  { cenarioNome: 'sucessor_jovem', objetivo: 'Alinhar gerações.', processo: 'Ouvir ambos e mostrar dados.', compromisso: 'Aceitar decisão conjunta.' },
  { cenarioNome: 'pai_resiste', objetivo: 'Convencer com números.', processo: 'Respeitar experiência e mostrar resultado.', compromisso: 'Aceitar testar.' },
  { cenarioNome: 'grande_produtor', objetivo: 'Mostrar impacto no total da área.', processo: 'Calcular ganho total e mostrar escala.', compromisso: 'Aceitar analisar fazenda inteira.' },
  { cenarioNome: 'tecnificado', objetivo: 'Personalizar recomendação.', processo: 'Usar dados da área e ajustar manejo.', compromisso: 'Aceitar validar.' },
  { cenarioNome: 'quer_dado', objetivo: 'Decidir baseado em números.', processo: 'Trazer dados reais e comparar.', compromisso: 'Aceitar analisar.' },
  { cenarioNome: 'quer_comparar', objetivo: 'Comparar de forma correta.', processo: 'Montar cenário lado a lado.', compromisso: 'Aceitar avaliar.' },
  { cenarioNome: 'quer_pacote', objetivo: 'Mostrar vantagem do sistema completo.', processo: 'Conectar produtos e mostrar sinergia.', compromisso: 'Aceitar analisar pacote.' },
  { cenarioNome: 'quer_solucao', objetivo: 'Posicionar como consultor.', processo: 'Entender sistema e propor ajuste.', compromisso: 'Aceitar construir manejo.' },
  { cenarioNome: 'quer_acompanhamento', objetivo: 'Fortalecer relação técnica.', processo: 'Oferecer acompanhamento e mostrar ganho.', compromisso: 'Aceitar visitas.' },
  { cenarioNome: 'quer_parceria', objetivo: 'Construir relação de longo prazo.', processo: 'Conversar sobre resultado safra a safra.', compromisso: 'Aceitar trabalhar junto.' }
];

export const getAgroScenarioOpcPlaybook = (cenarioNome?: string | null): AgroScenarioOpcPlaybook | null => {
  if (!cenarioNome) return null;
  return AGRO_SCENARIO_OPC_PLAYBOOKS.find((item) => item.cenarioNome === cenarioNome) ?? null;
};

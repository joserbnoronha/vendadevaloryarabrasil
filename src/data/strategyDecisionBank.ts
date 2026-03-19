import type { ScenarioAnalysis } from '../types';

export type MeetingDifficulty =
  | 'easy'
  | 'normal'
  | 'complex'
  | 'high resistance'
  | 'strategic account'
  | 'recovery meeting'
  | 'competitive meeting'
  | 'price pressure meeting'
  | 'technical meeting'
  | 'decision meeting';

export type SalesApproachMode =
  | 'SPIN mode'
  | 'Challenger mode'
  | 'Consultative mode'
  | 'Technical mode'
  | 'Relationship mode'
  | 'Recovery mode'
  | 'Closing mode';

export type ConversationPathKey =
  | 'Path A — collaborative dialogue'
  | 'Path B — reframe and provoke'
  | 'Path C — technical proof'
  | 'Path D — value comparison'
  | 'Path E — risk discussion'
  | 'Path F — ROI discussion'
  | 'Path G — decision guidance';

export type CommunicationLevel =
  | 'simple'
  | 'technical'
  | 'very technical'
  | 'business oriented'
  | 'strategic'
  | 'provocative'
  | 'educational';

type StrategyDecisionContext = {
  farmerProfiles: string[];
  objections: Array<{ label: string; responseStrategy: string }>;
  fieldScenarioKeys: string[];
  problemType: string;
  seasonMoment: string;
};

export const buildStrategyDecisionContext = (
  analysis: ScenarioAnalysis,
  normalizedScenario: string,
  decisionContext: StrategyDecisionContext
) => {
  const hasPricePressure =
    analysis.foco === 'preco' ||
    decisionContext.problemType === 'price_discussion' ||
    /preco|desconto|cotacao|barato/.test(normalizedScenario);
  const hasHighResistance =
    decisionContext.farmerProfiles.some((item) => /skeptical|risk averse|loyal to competitor|price driven/.test(item)) ||
    decisionContext.objections.length >= 2;
  const isStrategicAccount =
    decisionContext.farmerProfiles.some((item) => /large farm professional|highly technical/.test(item)) ||
    analysis.stakeholders === 'multiplos';
  const isRecoveryMeeting =
    decisionContext.fieldScenarioKeys.some((item) => /bad_previous_season|lost_customer/.test(item)) ||
    /problema no passado|prejuizo|voltou para concorrente|cliente perdido/.test(normalizedScenario);
  const isTechnicalMeeting =
    decisionContext.farmerProfiles.some((item) => /highly technical|technology adopter/.test(item)) ||
    analysis.machineTechTerms.length >= 2;
  const isDecisionMeeting =
    /fechar|decidir|aprovar|compromisso|pedido|validar/.test(normalizedScenario);
  const isCompetitiveMeeting =
    analysis.prioridade === 'competicao' ||
    decisionContext.fieldScenarioKeys.some((item) => /strong_competitor_present|farmer_loyal_to_cooperative/.test(item));

  let difficultyLevel: MeetingDifficulty = 'normal';
  if (hasPricePressure) difficultyLevel = 'price pressure meeting';
  if (isCompetitiveMeeting) difficultyLevel = 'competitive meeting';
  if (isTechnicalMeeting) difficultyLevel = 'technical meeting';
  if (isDecisionMeeting) difficultyLevel = 'decision meeting';
  if (isRecoveryMeeting) difficultyLevel = 'recovery meeting';
  if (isStrategicAccount) difficultyLevel = 'strategic account';
  if (hasHighResistance) difficultyLevel = 'high resistance';
  if (
    isStrategicAccount &&
    (hasHighResistance || isCompetitiveMeeting || isRecoveryMeeting || hasPricePressure)
  ) {
    difficultyLevel = 'complex';
  }
  if (!hasHighResistance && !isStrategicAccount && !isCompetitiveMeeting && !hasPricePressure && !isDecisionMeeting) {
    difficultyLevel = analysis.etapa === 'primeiro_contato' ? 'easy' : 'normal';
  }

  let recommendedApproach: SalesApproachMode = 'Consultative mode';
  if (hasHighResistance || decisionContext.problemType === 'commodity_mentality') recommendedApproach = 'Challenger mode';
  if (isTechnicalMeeting) recommendedApproach = 'Technical mode';
  if (isRecoveryMeeting) recommendedApproach = 'Recovery mode';
  if (analysis.etapa === 'relacionamento') recommendedApproach = 'Relationship mode';
  if (isDecisionMeeting) recommendedApproach = 'Closing mode';
  if (!hasHighResistance && !isTechnicalMeeting && !isRecoveryMeeting && !isDecisionMeeting) {
    recommendedApproach = 'SPIN mode';
  }

  const conversationPath: ConversationPathKey[] = [];
  conversationPath.push('Path A — collaborative dialogue');
  if (hasHighResistance) conversationPath.push('Path B — reframe and provoke');
  if (isTechnicalMeeting) conversationPath.push('Path C — technical proof');
  if (hasPricePressure || decisionContext.problemType === 'false_economy') conversationPath.push('Path D — value comparison');
  if (/risk_exposure|lack_of_planning/.test(decisionContext.problemType) || /climate_uncertainty|credit_limitation/.test(decisionContext.fieldScenarioKeys.join(' '))) {
    conversationPath.push('Path E — risk discussion');
  }
  if (/price_discussion|low_efficiency|false_economy/.test(decisionContext.problemType) || decisionContext.farmerProfiles.some((item) => /margin focused|cost focused/.test(item))) {
    conversationPath.push('Path F — ROI discussion');
  }
  if (isDecisionMeeting || hasHighResistance || decisionContext.objections.length > 0) {
    conversationPath.push('Path G — decision guidance');
  }

  const riskAlert = [
    hasPricePressure ? 'Risco alto de a conversa voltar para preço cedo demais.' : 'Monitorar se a conversa desvia do valor para condição comercial.',
    decisionContext.objections.length > 0 ? 'Há risco real de objeções travarem o avanço se a implicação não ficar forte.' : 'Objeções podem surgir se faltar clareza de critério de decisão.',
    /late_planting|lack_of_planning/.test(`${decisionContext.fieldScenarioKeys.join(' ')} ${decisionContext.problemType}`) ? 'Risco de atraso e perda de janela operacional.' : 'Reduzir risco de postergação com próximo passo claro.',
    isCompetitiveMeeting ? 'Risco de concorrente capturar a decisão se o valor não ficar tangível.' : 'Risco competitivo moderado; manter diferenciação por valor.',
    hasHighResistance ? 'Credibilidade precisa ser construída antes de defender solução premium.' : 'Credibilidade deve ser reforçada com lógica técnica e econômica simples.'
  ];

  const opportunityAlert = [
    analysis.etapa === 'expansao' ? 'Existe oportunidade concreta de ampliação de escopo na conta.' : 'Buscar espaço de valor, não apenas entrada transacional.',
    decisionContext.farmerProfiles.some((item) => /technology adopter|innovation seeker/.test(item)) ? 'Há abertura para upgrade tecnológico e posicionamento premium.' : 'Identificar se existe espaço para premiumização gradual com prova prática.',
    decisionContext.farmerProfiles.some((item) => /margin focused|large farm professional/.test(item)) ? 'Conta com potencial para programa de longo prazo orientado a ROI.' : 'Explorar programa de longo prazo se a primeira validação avançar.',
    decisionContext.fieldScenarioKeys.some((item) => /upsell_opportunity|cross_sell_opportunity/.test(item)) ? 'Upsell/cross sell possível se a primeira dor for bem conectada ao negócio.' : 'Usar a dor principal para abrir futura expansão com coerência.',
    isCompetitiveMeeting ? 'Existe oportunidade de reposicionamento contra concorrente via valor e previsibilidade.' : 'Há espaço para reforçar posicionamento técnico e estratégico.'
  ];

  let communicationLevel: CommunicationLevel = 'educational';
  if (isTechnicalMeeting) communicationLevel = 'very technical';
  else if (isStrategicAccount) communicationLevel = 'strategic';
  else if (hasPricePressure) communicationLevel = 'business oriented';
  else if (hasHighResistance) communicationLevel = 'provocative';
  else if (decisionContext.farmerProfiles.some((item) => /small traditional|risk averse/.test(item))) communicationLevel = 'simple';
  else if (decisionContext.farmerProfiles.some((item) => /highly technical/.test(item))) communicationLevel = 'technical';

  const decisionPlans = [
    `Plano A — colaborativo: abrir ouvindo, validar a dor e construir o critério de decisão com segurança.`,
    `Plano B — nova perspectiva: trazer um novo olhar sobre o problema para tirar a conversa do preço e mostrar custo oculto.`,
    `Plano C — prova técnica: fechar com demonstração técnica de campo ou prova econômica simples para decidir o avanço.`
  ];

  const meetingStrategy = [
    `Classifique esta reunião como ${difficultyLevel}.`,
    `Conduza com ${recommendedApproach}, usando comunicação ${communicationLevel}.`,
    `Use como caminho principal ${conversationPath.slice(0, 3).join(' -> ')}.`
  ];

  return {
    difficultyLevel,
    recommendedApproach,
    conversationPath: Array.from(new Set(conversationPath)),
    riskAlert,
    opportunityAlert,
    communicationLevel,
    decisionPlans,
    meetingStrategy
  };
};

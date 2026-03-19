import type { ScenarioAnalysis } from '../types';

export type MeetingContinuityType =
  | 'first meeting'
  | 'follow-up meeting'
  | 'recovery meeting'
  | 'negotiation meeting'
  | 'technical visit'
  | 'closing visit'
  | 'post-sale visit';

export type RelationshipLevel =
  | 'new customer'
  | 'prospect'
  | 'active customer'
  | 'strategic customer'
  | 'lost customer'
  | 'loyal to competitor'
  | 'high potential'
  | 'low potential';

export interface MemoryObject {
  farmerName: string | null;
  farmName: string | null;
  region: string | null;
  crop: string | null;
  meetingType: MeetingContinuityType;
  previousMeetingNotes: string[];
  previousObjection: string | null;
  previousSolutionProposed: string | null;
  previousResult: string | null;
  competitorPresence: string | null;
  technologyLevel: string | null;
  relationshipLevel: RelationshipLevel;
  farmProfile: {
    farmSize: string | null;
    technologyLevel: string | null;
    riskTolerance: string | null;
    decisionStyle: string | null;
    priceSensitivity: string | null;
    innovationLevel: string | null;
  };
  seasonMemory: {
    previousCrop: string | null;
    previousYield: string | null;
    previousProblem: string | null;
    previousDecision: string | null;
    previousInputUsed: string | null;
  };
  competitorMemory: {
    mainCompetitor: string | null;
    cooperative: string | null;
    distributor: string | null;
    brandUsed: string | null;
    loyaltyLevel: string | null;
  };
}

const extractFirst = (text: string, patterns: RegExp[]): string | null => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return null;
};

export const buildScenarioMemory = (scenario: string, analysis: ScenarioAnalysis): MemoryObject => {
  const normalized = scenario.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const lower = normalized.toLowerCase();

  const farmerName = extractFirst(normalized, [
    /produtor\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç]+){0,2})/,
    /cliente\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç]+){0,2})/
  ]);
  const farmName = extractFirst(normalized, [
    /fazenda\s+([A-Z0-9][A-Za-z0-9\s-]{2,40})/,
    /sitio\s+([A-Z0-9][A-Za-z0-9\s-]{2,40})/
  ]);
  const region = extractFirst(normalized, [
    /regiao\s+de\s+([A-Za-z\s-]{3,40})/i,
    /em\s+([A-Z][A-Za-z\s-]{2,30}\/[A-Z]{2})/
  ]);

  let meetingType: MeetingContinuityType = 'follow-up meeting';
  if (/primeira visita|primeiro contato|prospeccao/.test(lower)) meetingType = 'first meeting';
  else if (/follow[- ]?up|retorno|segunda reuniao/.test(lower)) meetingType = 'follow-up meeting';
  else if (/recuperar|recovery|reconstruir confianca/.test(lower)) meetingType = 'recovery meeting';
  else if (/negociacao|preco|desconto/.test(lower)) meetingType = 'negotiation meeting';
  else if (/visita tecnica|avaliacao tecnica|diagnostico tecnico/.test(lower)) meetingType = 'technical visit';
  else if (/fechar|aprovacao|closing|pedido/.test(lower)) meetingType = 'closing visit';
  else if (/pos-venda|post sale|implantacao|acompanhamento/.test(lower)) meetingType = 'post-sale visit';

  let relationshipLevel: RelationshipLevel = 'prospect';
  if (/novo cliente|prospeccao|primeira visita/.test(lower)) relationshipLevel = 'new customer';
  else if (/cliente ativo|ja compra|conta ativa/.test(lower)) relationshipLevel = 'active customer';
  else if (/estrategico|conta estrategica|grande conta/.test(lower)) relationshipLevel = 'strategic customer';
  else if (/cliente perdido|perdido|voltou para concorrente/.test(lower)) relationshipLevel = 'lost customer';
  else if (/fiel.*concorrente|cooperativa|loyal/.test(lower)) relationshipLevel = 'loyal to competitor';
  else if (/alto potencial|potencial grande/.test(lower)) relationshipLevel = 'high potential';
  else if (/baixo potencial/.test(lower)) relationshipLevel = 'low potential';

  const previousMeetingNotes = [
    extractFirst(normalized, [/ultima reuniao[:\s]+([^.;]+)/i]),
    extractFirst(normalized, [/na reuniao anterior[:\s]+([^.;]+)/i]),
    extractFirst(normalized, [/historico[:\s]+([^.;]+)/i])
  ].filter((value): value is string => Boolean(value));

  const previousObjection = extractFirst(normalized, [
    /objecao anterior[:\s]+([^.;]+)/i,
    /da outra vez disse que[:\s]+([^.;]+)/i,
    /na reuniao anterior falou que[:\s]+([^.;]+)/i
  ]);
  const previousSolutionProposed = extractFirst(normalized, [
    /solucao anterior[:\s]+([^.;]+)/i,
    /foi proposto[:\s]+([^.;]+)/i,
    /proposta anterior[:\s]+([^.;]+)/i
  ]);
  const previousResult = extractFirst(normalized, [
    /resultado anterior[:\s]+([^.;]+)/i,
    /resultado foi[:\s]+([^.;]+)/i,
    /deu errado porque[:\s]+([^.;]+)/i,
    /aceitou premium antes[:\s]+([^.;]+)/i
  ]);

  const technologyLevel =
    /alto nivel tecnologico|isobus|telemetria|rtk|taxa variavel|fertirrigacao/.test(lower)
      ? 'high'
      : /monitor|mapa|piloto automatico/.test(lower)
        ? 'medium'
        : 'low';

  const farmSize = extractFirst(normalized, [/\b(\d{1,5}(?:[.,]\d+)?)\s*ha\b/i]);
  const riskTolerance =
    /nao quer arriscar|conservador|medo/.test(lower) ? 'low' : /inovador|gosta de testar/.test(lower) ? 'high' : 'medium';
  const decisionStyle =
    /sozinho|centralizado/.test(lower) ? 'centralized' : /familia|socios|compras|financeiro/.test(lower) ? 'shared' : 'practical';
  const priceSensitivity =
    analysis.foco === 'preco' || /preco|desconto|barato/.test(lower) ? 'high' : /orcamento|caixa/.test(lower) ? 'medium' : 'low';
  const innovationLevel =
    /inovacao|nova tecnologia|digital|alto desempenho/.test(lower) ? 'high' : /tradicional|sempre fez assim/.test(lower) ? 'low' : 'medium';

  const previousYield = extractFirst(normalized, [
    /colheu\s+(\d{1,3}(?:[.,]\d+)?)\s*(?:sc|sacas|@|t)\s*\/?\s*ha/i,
    /produtividade anterior[:\s]+([^.;]+)/i
  ]);
  const previousCrop = extractFirst(normalized, [/safra anterior[:\s]+([^.;]+)/i, /cultura anterior[:\s]+([^.;]+)/i]) ?? analysis.cultura;
  const previousProblem = extractFirst(normalized, [/problema anterior[:\s]+([^.;]+)/i, /teve problema com[:\s]+([^.;]+)/i]);
  const previousDecision = extractFirst(normalized, [/decisao anterior[:\s]+([^.;]+)/i, /decidiu[:\s]+([^.;]+)/i]);
  const previousInputUsed = extractFirst(normalized, [/usou[:\s]+([^.;]+)/i, /insumo anterior[:\s]+([^.;]+)/i]);

  const mainCompetitor = extractFirst(normalized, [/concorrente principal[:\s]+([^.;]+)/i, /usa\s+(Yara|Corteva|Bayer|Syngenta|Mosaic|ICL|cooperativa|distribuidor)\b/i]);
  const cooperative = /cooperativa/.test(lower) ? 'cooperative present' : null;
  const distributor = /distribuidor|revenda/.test(lower) ? 'distributor present' : null;
  const brandUsed = extractFirst(normalized, [/marca usada[:\s]+([^.;]+)/i, /usa a marca[:\s]+([^.;]+)/i]);
  const loyaltyLevel =
    /fiel|sempre compra|nao quer mudar/.test(lower) ? 'high' : /testa mercado|compara/.test(lower) ? 'medium' : 'low';

  return {
    farmerName,
    farmName,
    region,
    crop: analysis.cultura,
    meetingType,
    previousMeetingNotes,
    previousObjection,
    previousSolutionProposed,
    previousResult,
    competitorPresence: cooperative ?? distributor ?? mainCompetitor,
    technologyLevel,
    relationshipLevel,
    farmProfile: {
      farmSize,
      technologyLevel,
      riskTolerance,
      decisionStyle,
      priceSensitivity,
      innovationLevel
    },
    seasonMemory: {
      previousCrop,
      previousYield,
      previousProblem,
      previousDecision,
      previousInputUsed
    },
    competitorMemory: {
      mainCompetitor,
      cooperative,
      distributor,
      brandUsed,
      loyaltyLevel
    }
  };
};

export const buildMemoryLearningGuidance = (memory: MemoryObject) => {
  const guidance: string[] = [];

  if (memory.previousObjection) {
    guidance.push(`Já houve objeção anterior ("${memory.previousObjection}"); não repetir a mesma linha de argumentação sem novo critério de valor.`);
  }
  if (memory.previousResult && /nao|falhou|deu errado|sem resultado|resistencia/.test(memory.previousResult.toLowerCase())) {
    guidance.push('A solução ou abordagem anterior não consolidou avanço; mudar o caminho da conversa e reduzir risco percebido.');
  }
  if (memory.previousResult && /aceitou premium|deu certo|funcionou|avancou/.test(memory.previousResult.toLowerCase())) {
    guidance.push('Há histórico favorável a valor agregado; pode subir o nível da proposta com mais segurança econômica.');
  }
  if (memory.meetingType === 'recovery meeting') {
    guidance.push('Esta reunião pede reconstrução de confiança antes de defender expansão ou premiumização.');
  }
  if (memory.relationshipLevel === 'strategic customer') {
    guidance.push('Conta estratégica: conduzir com visão de programa de longo prazo, não de venda isolada.');
  }

  return guidance;
};

export const buildMemoryContextSummary = (memory: MemoryObject): string => {
  const parts = [
    memory.farmerName ? `produtor ${memory.farmerName}` : null,
    memory.farmName ? `fazenda ${memory.farmName}` : null,
    memory.region ? `região ${memory.region}` : null,
    memory.crop ? `cultura ${memory.crop}` : null,
    `tipo de reunião ${memory.meetingType}`,
    `relacionamento ${memory.relationshipLevel}`
  ].filter(Boolean);

  return parts.join(', ');
};

export const buildNextStepEngine = (memory: MemoryObject): string[] => {
  return [
    memory.meetingType === 'first meeting'
      ? 'Próxima visita: diagnóstico com dados de área, histórico e critério econômico.'
      : 'Próxima visita: retomar o ponto validado e mover para decisão objetiva.',
    'Próximo tema: aprofundar a dor que mais afeta margem, produtividade ou previsibilidade.',
    'Próximo argumento: custo oculto versus valor capturado por hectare.',
    'Próximo teste: área piloto com métrica técnica e econômica simples.',
    'Próxima proposta: solução posicionada como resposta ao problema, não como catálogo.',
    'Próxima decisão: fechar responsável, prazo e regra clara de avanço.'
  ];
};

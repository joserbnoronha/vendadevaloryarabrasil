export interface OpcBlock {
  objetivo: string[];
  processo: string[];
  compromisso: string[];
}

export interface SpinBlock {
  situacao: string[];
  problema: string[];
  implicacao: string[];
  necessidadeSolucao: string[];
}

export interface EpaBlock {
  educar: string[];
  personalizar: string[];
  assumirControle: string[];
}

export interface ValueSineStep {
  id: number;
  titulo: string;
  resumo: string;
  explicacao: string;
  guiaTatico: string[];
  sugestaoPersonalizada: string;
}

export interface ValueSineMap {
  titulo: string;
  subtitulo: string;
  steps: ValueSineStep[];
  fases: Array<{ nome: 'Gancho' | 'Impacto' | 'Solução'; etapas: [number, number] }>;
}

export interface PreparationResult {
  tituloFicha: string;
  cenarioOriginal: string;
  engineInsights: {
    scenarioUnderstanding: string;
    memoryContext: string;
    relationshipLevel: string;
    meetingContinuity: string;
    memoryLearning: string[];
    meetingStrategy: string[];
    riskAlert: string[];
    opportunityAlert: string[];
    recommendedApproach: string;
    conversationPath: string[];
    communicationLevel: string;
    difficultyLevel: string;
    farmerProfile: string[];
    fieldSituations: string[];
    objectionsDetected: string[];
    objectionStrategies: string[];
    seasonMoment: string;
    problemType: string;
    analiseCenario: string;
    hipotesePrincipal: string;
    problemasOcultos: string[];
    impactoAgronomico: string[];
    impactoEconomico: string[];
    leituraPerfilProdutor: string;
    estrategiaAbordagem: string;
    valueNarrative: string[];
    agronomicArgument: string[];
    riskNarrative: string[];
    productivityNarrative: string[];
    profitabilityNarrative: string[];
    roiNarrative: string[];
    conversationGuidance: string[];
    decisionPlans: string[];
    nextStepEngine: string[];
    senoideVendaValor: {
      cenario: string;
      problema: string;
      reframe: string;
      impacto: string;
      solucao: string;
      compromisso: string;
    };
    reframeChallenger: string;
    solucoesPremiumRecomendadas: string[];
    logicaRoi: {
      cenarioConservador: string;
      cenarioModerado: string;
      cenarioAgressivo: string;
    };
    proximosPassos: string[];
  };
  opc: OpcBlock;
  spin: SpinBlock;
  epa: EpaBlock;
  valueSineMap: ValueSineMap;
  dicasPraticas: string[];
  proximoPasso: string;
  metadata: {
    generatedAt: string;
    tags: string[];
    primaryTheme: ScenarioAnalysis['primaryTheme'];
    specificTerms: string[];
    machineTechTerms: string[];
    competitiveDifferentiationFocus: string;
    missingScenarioDetails: string[];
    fabricantesCitados: string[];
    referenciasFabricantes: Array<{ fabricante: string; fonte: string }>;
    referenciasSetoriais: Array<{ fabricante: string; focoConversa: string; fonte: string }>;
    produtosReferenciados: ProductReference[];
    trilhasPesquisaProdutos: Array<{ termo: string; sugestoes: string[] }>;
    desafiosAgro: Array<{
      titulo: string;
      contexto: string;
      comoUsarNaConversa: string;
      perguntaAberta: string;
      fontes: string[];
    }>;
    prioridade: 'margem' | 'expansao' | 'retencao' | 'competicao' | 'diagnostico';
    farmerProfiles?: string[];
    objectionsDetected?: string[];
    seasonMoment?: string;
    problemType?: string;
    fieldScenarioKeys?: string[];
    meetingDifficulty?: string;
    recommendedApproach?: string;
    conversationPaths?: string[];
    communicationLevel?: string;
    memoryContext?: string;
    relationshipLevel?: string;
    meetingContinuity?: string;
    previousObjection?: string;
    previousSolutionProposed?: string;
    previousResult?: string;
  };
}

export interface ScenarioAnalysis {
  normalized: string;
  tags: string[];
  themes: Array<'adubo' | 'defensivo' | 'semente' | 'biologico' | 'irrigacao' | 'maquinario' | 'servicos' | 'geral'>;
  primaryTheme: 'adubo' | 'defensivo' | 'semente' | 'biologico' | 'irrigacao' | 'maquinario' | 'servicos' | 'geral';
  specificTerms: string[];
  machineTechTerms: string[];
  cultura: 'soja' | 'milho' | 'algodao' | 'cafe' | 'cana' | 'trigo' | 'feijao' | 'pastagem' | 'frutas' | 'vegetais' | 'pecuaria' | 'geral';
  etapa: 'primeiro_contato' | 'expansao' | 'negociacao' | 'relacionamento' | 'pos_venda';
  foco: 'preco' | 'valor' | 'misto';
  stakeholders: 'simples' | 'multiplos';
  fabricantes: string[];
  prioridade: PreparationResult['metadata']['prioridade'];
}

export interface ProductReference {
  produto: string;
  fabricante: string;
  propostaValorCurta: string;
  fortalezasCompetitivas: string[];
  cuidadosDePosicionamento: string[];
  fontes: string[];
  atualizadoEm: string;
}

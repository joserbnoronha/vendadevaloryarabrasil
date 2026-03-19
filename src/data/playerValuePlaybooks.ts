export interface PlayerValuePlaybook {
  fabricante: string;
  linhas: Array<{ linha: string; papel: string; usoTipico: string }>;
  hooks: {
    opcProcess: string[];
    spinNeed: string[];
    epaEducar: string[];
    tips: string[];
    roiHooks: string[];
  };
}

export const PLAYER_VALUE_PLAYBOOKS: PlayerValuePlaybook[] = [
  {
    fabricante: 'Yara',
    linhas: [
      { linha: 'YaraMila', papel: 'base premium de alta eficiência', usoTipico: 'plantio tecnificado, definição de teto produtivo e uniformidade de arranque' },
      { linha: 'YaraVita', papel: 'nutrição foliar para ajuste fino', usoTipico: 'fases críticas, florada, enchimento, recuperação pós-estresse e qualidade' },
      { linha: 'YaraAmplix', papel: 'bioestímulo, resiliência e eficiência nutricional', usoTipico: 'lavouras de alto risco, estresse climático e abertura de safra' },
      { linha: 'YaraTera', papel: 'fertirrigação e precisão máxima', usoTipico: 'irrigado, fertirrigação, HF, café, frutas e hortaliças' },
      { linha: 'YaraLiva', papel: 'qualidade, vigor e padrão comercial', usoTipico: 'culturas de alto valor e foco em qualidade final' }
    ],
    hooks: {
      opcProcess: [
        'No contexto Yara, conduza por valor de sistema: produtividade, rentabilidade, eficiência nutricional e redução de risco por hectare.',
        'Conecte cada recomendação à ciência agronômica, à estratégia de sustentabilidade do sistema e a um indicador econômico simples.',
        'Posicione Yara como parceira de nutrição premium, agricultura regenerativa, execução em campo e evolução tecnológica da fazenda.'
      ],
      spinNeed: [
        'Qual combinação de ganho agronômico e retorno financeiro precisa ficar comprovada para você avançar com esta recomendação?',
        'Que fase crítica da cultura precisa melhorar para essa decisão ser defendida internamente com segurança?',
        'Que ganho em previsibilidade, produtividade ou margem por hectare faria essa decisão ser vista como investimento e não como custo?'
      ],
      epaEducar: [
        'Destaque que o diferencial está em eficiência de manejo, previsibilidade de safra e captura de valor por hectare, não em preço por tonelada ou litro.',
        'Mostre que nutrição premium bem posicionada reduz risco, melhora conversão do investimento e sustenta produtividade com mais consistência.',
        'Traga a conversa para produtividade, margem, sanidade do sistema, qualidade e adoção de tecnologia.'
      ],
      tips: [
        'Use a lógica Yara por linha: Mila (base premium), Vita (fase crítica), Amplix (resiliência), Tera (precisão/fertirrigação), Liva (qualidade).',
        'Quando houver pressão por preço, reposicione para eficiência de uso, retorno do manejo, menor variabilidade e maior previsibilidade do sistema.'
      ],
      roiHooks: [
        'Na defesa de ROI, compare por hectare: custo atual versus valor capturado com o ajuste de manejo Yara.',
        'Inclua no ROI o valor do risco evitado, da produtividade estabilizada e da qualidade comercial preservada.'
      ]
    }
  },
  {
    fabricante: 'Corteva',
    linhas: [
      { linha: 'Sementes (Pioneer/Brevant)', papel: 'genética para retorno por área', usoTipico: 'escolha por ambiente e meta de produtividade' },
      { linha: 'Biotecnologia (Enlist/PowerCore/Conkesta)', papel: 'proteção e estabilidade', usoTipico: 'áreas com maior pressão de daninhas e pragas' },
      { linha: 'Herbicidas', papel: 'controle de daninhas e manejo de resistência', usoTipico: 'limpeza de área e proteção de teto produtivo' },
      { linha: 'Inseticidas/Fungicidas', papel: 'redução de perdas produtivas', usoTipico: 'fases críticas com pressão de pragas e doenças' },
      { linha: 'Tratamento de sementes e biológicos', papel: 'arranque e consistência de sistema', usoTipico: 'início de ciclo e manejo integrado' }
    ],
    hooks: {
      opcProcess: [
        'No contexto Corteva, conduza por performance de sistema: genética + proteção + execução para proteger margem.',
        'Evite defender item isolado; conecte proposta a risco evitado, perda reduzida e ganho de consistência no ciclo.'
      ],
      spinNeed: [
        'Que validação em campo te dá segurança para avançar com essa recomendação sem aumentar risco operacional?',
        'Qual critério de decisão precisa ficar claro para sair da conversa por preço e entrar em resultado?'
      ],
      epaEducar: [
        'Destaque a decisão por estabilidade de resultado, manejo integrado e janela operacional, não por custo de entrada.',
        'Mostre o custo da inação em fases críticas do ciclo produtivo.'
      ],
      tips: [
        'Em Corteva, conecte a tese a desempenho no talhão, risco evitado e impacto econômico do sistema por hectare.'
      ],
      roiHooks: [
        'No ROI, traga risco evitado, produtividade protegida e previsibilidade de colheita por fase do manejo.'
      ]
    }
  },
  {
    fabricante: 'Syngenta',
    linhas: [
      { linha: 'Inseticidas/Fungicidas/Herbicidas', papel: 'controle e redução de risco', usoTipico: 'pressão de praga/doença/daninha' },
      { linha: 'Sementes', papel: 'desempenho por ambiente', usoTipico: 'planejamento de safra e estabilidade' },
      { linha: 'Tratamento de sementes', papel: 'proteção inicial', usoTipico: 'arranque e estabelecimento' }
    ],
    hooks: {
      opcProcess: [
        'No contexto Syngenta, conduza por manejo de risco e estabilidade de resultado no ciclo.',
        'Para pragas e doenças, ancore a conversa em monitoramento, timing e impacto em margem.'
      ],
      spinNeed: [
        'Que nível de controle e estabilidade precisa ficar comprovado para você avançar no ajuste de programa?',
        'Qual condição mínima de resultado no talhão te permite defender essa decisão internamente?'
      ],
      epaEducar: [
        'Destaque que o valor aparece no programa de manejo bem posicionado, não em preço isolado por aplicação.',
        'Mostre que atraso de decisão em pragas/doenças custa margem e previsibilidade.'
      ],
      tips: [
        'Em cenários Syngenta, transforme “controle” em número de negócio: risco evitado, retrabalho evitado e produtividade protegida.'
      ],
      roiHooks: [
        'No ROI, compare custo do programa versus custo da falha de controle no fechamento da safra.'
      ]
    }
  },
  {
    fabricante: 'Bayer',
    linhas: [
      { linha: 'Proteção de cultivos', papel: 'controle com consistência', usoTipico: 'programas de manejo por fase' },
      { linha: 'Sementes (DEKALB/Monsoy)', papel: 'genética e estabilidade', usoTipico: 'escolha por ambiente e meta econômica' },
      { linha: 'Tecnologia de manejo', papel: 'execução com segurança', usoTipico: 'operações com alta pressão competitiva' }
    ],
    hooks: {
      opcProcess: [
        'No contexto Bayer, eleve para custo total da decisão e estabilidade do ciclo.',
        'Conecte recomendação a risco evitado e retorno por hectare, e não a atributo isolado.'
      ],
      spinNeed: [
        'Que evidência de campo e negócio precisa ficar clara para aprovar esse ajuste de manejo?',
        'Qual regra de decisão vamos acordar para evitar retorno à guerra de preço?'
      ],
      epaEducar: [
        'Destaque que o valor está na consistência do programa e no impacto econômico final da safra.',
        'Mostre diferença entre economia de compra e eficiência de resultado.'
      ],
      tips: [
        'Em Bayer, use linguagem simples de campo + indicador de negócio para sustentar a recomendação.'
      ],
      roiHooks: [
        'No ROI, leve comparativo por hectare com cenário atual versus cenário corrigido.'
      ]
    }
  },
  {
    fabricante: 'Mosaic',
    linhas: [
      { linha: 'Nutrição de alta performance', papel: 'eficiência de uso de nutrientes', usoTipico: 'áreas com resposta irregular' },
      { linha: 'Mosaic Performa', papel: 'estabilidade produtiva', usoTipico: 'manejo de base em alto potencial' }
    ],
    hooks: {
      opcProcess: [
        'No contexto Mosaic, conduza por eficiência nutricional e retorno por hectare.',
        'Mostre como o ajuste de base reduz desperdício e melhora previsibilidade.'
      ],
      spinNeed: [
        'Que ganho de eficiência precisa ficar claro para você avançar com o ajuste de adubação?',
        'Qual indicador econômico vai sustentar essa decisão de manejo?'
      ],
      epaEducar: [
        'Destaque valor por eficiência de uso e resposta do sistema, não por preço unitário do insumo.'
      ],
      tips: [
        'Traga comparação simples: mesmo investimento com maior eficiência versus menor investimento com baixa conversão.'
      ],
      roiHooks: [
        'No ROI, destaque resposta por hectare e estabilidade da produção.'
      ]
    }
  },
  {
    fabricante: 'ICL',
    linhas: [
      { linha: 'Fertilizantes especiais', papel: 'precisão nutricional', usoTipico: 'sistemas de alto nível técnico' },
      { linha: 'Soluções de performance', papel: 'estabilidade e qualidade', usoTipico: 'ambientes de maior exigência' }
    ],
    hooks: {
      opcProcess: [
        'No contexto ICL, conduza por precisão de manejo e eficiência econômica no ciclo.',
        'Conecte a solução ao problema real da área e ao indicador de valor para decisão.'
      ],
      spinNeed: [
        'Que condição de eficiência e retorno precisa ficar clara para você aprovar a mudança?',
        'Como estruturamos a validação para te dar segurança de escala?'
      ],
      epaEducar: [
        'ICL: deslocar conversa de preço para performance de sistema e previsibilidade de resultado.'
      ],
      tips: [
        'Em ICL, evite discurso técnico solto: sempre traduzir para risco, margem e produtividade.'
      ],
      roiHooks: [
        'No ROI, compare custo da decisão atual versus custo total corrigido com o novo manejo.'
      ]
    }
  },
];

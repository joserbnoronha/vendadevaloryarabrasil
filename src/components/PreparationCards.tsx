import type { PreparationResult } from '../types';
import { ValueSellingSineWaveChart } from './ValueSellingSineWaveChart';

interface PreparationCardsProps {
  result: PreparationResult;
}

const normalizeListItem = (item: string): string =>
  item.replace(/\s*\n+\s*/g, ' ').replace(/\s+/g, ' ').trim();

const renderList = (items: string[], emptyFallback: string) => {
  const cleanItems = items.map(normalizeListItem).filter((item) => item.length > 0);

  if (!cleanItems.length) {
    return <p className="card__empty">{emptyFallback}</p>;
  }

  return (
    <ul className="card__list">
      {cleanItems.map((item, index) => (
        <li key={`${item.slice(0, 28)}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const translatePriority = (priority: PreparationResult['metadata']['prioridade']): string => {
  const map: Record<PreparationResult['metadata']['prioridade'], string> = {
    margem: 'Prioridade: Margem',
    expansao: 'Prioridade: Expansão',
    retencao: 'Prioridade: Retenção',
    competicao: 'Prioridade: Competição',
    diagnostico: 'Prioridade: Diagnóstico'
  };

  return map[priority];
};

const translateTheme = (theme: PreparationResult['metadata']['primaryTheme']): string => {
  const map: Record<PreparationResult['metadata']['primaryTheme'], string> = {
    adubo: 'Tema-chave: Adubação/Fertilizantes',
    defensivo: 'Tema-chave: Defensivos',
    semente: 'Tema-chave: Sementes',
    biologico: 'Tema-chave: Biológicos',
    irrigacao: 'Tema-chave: Irrigação',
    maquinario: 'Tema-chave: Máquinas/Implementos',
    servicos: 'Tema-chave: Serviços técnicos',
    geral: 'Tema-chave: Estratégia comercial geral'
  };

  return map[theme];
};

export const PreparationCards = ({ result }: PreparationCardsProps) => {
  const generatedAt = new Date(result.metadata.generatedAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section className="results" aria-live="polite">
      <div className="results__heading animate-in">
        <h2>{result.tituloFicha}</h2>
        <p>Cenário analisado: {result.cenarioOriginal}</p>
        <div className="results__meta">
          <span>{generatedAt}</span>
          <span>{translatePriority(result.metadata.prioridade)}</span>
          <span>{translateTheme(result.metadata.primaryTheme)}</span>
          {result.metadata.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="results__tag">
              {tag.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      <article className="card animate-in">
        <div className="card__title-row">
          <h3>OPC</h3>
          <p className="card__kicker">Estratégia da Conversa</p>
        </div>
        <div className="card__section">
          <h4>Objetivo Central da Conversa</h4>
          {renderList(result.opc.objetivo, 'Sem objetivos sugeridos para este cenário.')}
        </div>
        <div className="card__section">
          <h4>Processo de Condução</h4>
          {renderList(result.opc.processo, 'Sem recomendações de processo para este cenário.')}
        </div>
        <div className="card__section">
          <h4>Compromisso ao Final</h4>
          {renderList(result.opc.compromisso, 'Sem compromissos sugeridos para este cenário.')}
        </div>
      </article>

      <article className="card animate-in">
        <div className="card__title-row">
          <h3>SPIN Selling</h3>
          <p className="card__kicker">Perguntas que movem a decisão (Entender para Atender)</p>
        </div>
        <div className="card__grid">
          <div className="card__section">
            <h4>Situação</h4>
            {renderList(result.spin.situacao, 'Sem perguntas de situação.')}
          </div>
          <div className="card__section">
            <h4>Problema</h4>
            {renderList(result.spin.problema, 'Sem perguntas de problema.')}
          </div>
          <div className="card__section">
            <h4>Implicação</h4>
            {renderList(result.spin.implicacao, 'Sem perguntas de implicação.')}
          </div>
          <div className="card__section">
            <h4>Necessidade de Solução</h4>
            {renderList(result.spin.necessidadeSolucao, 'Sem perguntas de necessidade de solução.')}
          </div>
        </div>
      </article>

      <article className="card animate-in">
        <div className="card__title-row">
          <h3>EPA / Challenger</h3>
          <p className="card__kicker">Provocações de Valor</p>
        </div>
        <div className="card__grid card__grid--thirds">
          <div className="card__section">
            <h4>Educar</h4>
            {renderList(result.epa.educar, 'Sem provocações de educação para este cenário.')}
          </div>
          <div className="card__section">
            <h4>Personalizar</h4>
            {renderList(result.epa.personalizar, 'Sem orientações de personalização para este cenário.')}
          </div>
          <div className="card__section">
            <h4>Assumir o Controle</h4>
            {renderList(result.epa.assumirControle, 'Sem orientações de controle para este cenário.')}
          </div>
        </div>
      </article>

      <ValueSellingSineWaveChart map={result.valueSineMap} />
    </section>
  );
};

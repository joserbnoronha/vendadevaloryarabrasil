import type { ValueSineMap } from '../types';

interface ValueSellingSineWaveChartProps {
  map: ValueSineMap;
}

type StepTone = 'hook' | 'impact' | 'solution';

const stepVisual: Record<number, { x: number; y: number; tone: StepTone }> = {
  1: { x: 12, y: 62, tone: 'hook' },
  2: { x: 28, y: 30, tone: 'hook' },
  3: { x: 44, y: 58, tone: 'impact' },
  4: { x: 60, y: 74, tone: 'impact' },
  5: { x: 76, y: 50, tone: 'solution' },
  6: { x: 92, y: 26, tone: 'solution' }
};

const phaseClasses: Record<string, string> = {
  Gancho: 'sine-phase sine-phase--hook',
  Impacto: 'sine-phase sine-phase--impact',
  Solução: 'sine-phase sine-phase--solution'
};

export const ValueSellingSineWaveChart = ({ map }: ValueSellingSineWaveChartProps) => {
  return (
    <section className="sine-map card animate-in" aria-label={map.titulo}>
      <header className="sine-map__header">
        <h3>{map.titulo}</h3>
        <p>{map.subtitulo}</p>
      </header>

      <div className="sine-map__board">
        <aside className="sine-map__axis" aria-hidden="true">
          <span className="sine-map__axis-level sine-map__axis-level--positive">Positivo</span>
          <span className="sine-map__axis-title">Nível de Excitação do Cliente</span>
          <span className="sine-map__axis-level sine-map__axis-level--neutral">Neutro</span>
          <span className="sine-map__axis-level sine-map__axis-level--negative">Negativo</span>
        </aside>

        <div className="sine-map__stage-wrap">
          <div className="sine-map__stage">
            <svg viewBox="0 0 100 100" className="sine-map__svg" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="curveArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#3e4f47" />
                </marker>
              </defs>
              <line x1="4" y1="12" x2="4" y2="90" className="sine-map__axis-line" />
              <line x1="4" y1="50" x2="98" y2="50" className="sine-map__mid-line" />
              <path
                d="M 12 62 C 18 44, 22 26, 28 30 C 34 35, 38 52, 44 58 C 50 64, 54 77, 60 74 C 66 70, 71 54, 76 50 C 82 44, 87 30, 92 26"
                className="sine-map__curve"
                markerEnd="url(#curveArrow)"
              />
            </svg>

            {map.steps.map((step) => {
              const visual = stepVisual[step.id];
              return (
                <article
                  key={step.id}
                  className={`sine-card sine-card--${visual.tone}`}
                  style={{ left: `${visual.x}%`, top: `${visual.y}%` }}
                >
                  <span className="sine-card__index">{step.id}</span>
                  <h4>{step.titulo}</h4>
                  <p>{step.resumo}</p>
                  <p className="sine-card__tip">{step.guiaTatico[0]}</p>
                </article>
              );
            })}
          </div>

          <div className="sine-map__phases">
            {map.fases.map((fase) => (
              <div key={fase.nome} className={phaseClasses[fase.nome]}>
                <strong>{fase.nome}</strong>
                <span>
                  Etapas {fase.etapas[0]} e {fase.etapas[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="sine-map__details">
        <h4>Guia tático por etapa</h4>
        <div className="sine-map__details-grid">
          {map.steps.map((step) => (
            <details key={step.id} className="sine-detail" open>
              <summary>
                <span>{step.id} — {step.titulo}</span>
                <small>{step.resumo}</small>
              </summary>
              <p>{step.explicacao}</p>
              <ul className="card__list">
                {step.guiaTatico.map((dica, index) => (
                  <li key={`${step.id}-${index}`}>{dica}</li>
                ))}
              </ul>
              <p className="sine-detail__suggestion">Dicas Práticas: {step.sugestaoPersonalizada}</p>
            </details>
          ))}
        </div>
      </section>

    </section>
  );
};

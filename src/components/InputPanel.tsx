interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export const InputPanel = ({ value, onChange }: InputPanelProps) => {
  const charCount = value.trim().length;

  return (
    <section className="panel panel--input">
      <div className="panel__heading-row">
        <label htmlFor="scenario-input" className="panel__label">
          Descreva o cenário da reunião
        </label>
        <span className="panel__counter">{charCount} caracteres úteis</span>
      </div>
      <textarea
        id="scenario-input"
        className="panel__textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Exemplo: Renegociação com produtor de soja (2.800 ha).
Cliente focado em preço por hectare.
Temos evidência de ganho em estabilidade produtiva.
Participam produtor, gerente financeiro e agrônomo.`}
      />
      <p className="panel__helper">
        Inclua contexto da fazenda, decisor, safra, pressão competitiva e objetivo do encontro. Quanto mais detalhes você trouxer, melhor será a preparação.
      </p>
    </section>
  );
};

interface ActionButtonsProps {
  loading: boolean;
  canExport: boolean;
  onGenerate: () => void;
  onClear: () => void;
  onExportPdf: () => void;
}

export const ActionButtons = ({ loading, canExport, onGenerate, onClear, onExportPdf }: ActionButtonsProps) => {
  return (
    <div className="actions">
      <button type="button" className="btn btn--primary" onClick={onGenerate} disabled={loading}>
        {loading ? 'Gerando ficha executiva...' : 'Gerar preparação'}
      </button>
      <button type="button" className="btn btn--secondary" onClick={onExportPdf} disabled={!canExport || loading}>
        Exportar PDF executivo
      </button>
      <button type="button" className="btn btn--ghost" onClick={onClear} disabled={loading}>
        Limpar cenário
      </button>
    </div>
  );
};

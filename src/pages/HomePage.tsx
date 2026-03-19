import { ActionButtons } from '../components/ActionButtons';
import { Header } from '../components/Header';
import { InputPanel } from '../components/InputPanel';
import { PreparationCards } from '../components/PreparationCards';
import { StatusBanner } from '../components/StatusBanner';
import { usePreparation } from '../hooks/usePreparation';

export const HomePage = () => {
  const { scenario, setScenario, result, loading, error, notice, generate, clear, exportPdf, canExport } = usePreparation();

  return (
    <main className="page-shell">
      <div className="page-shell__bg page-shell__bg--top" />
      <div className="page-shell__bg page-shell__bg--bottom" />

      <div className="container">
        <Header />

        <InputPanel value={scenario} onChange={setScenario} />

        <ActionButtons
          loading={loading}
          canExport={canExport}
          onGenerate={generate}
          onClear={clear}
          onExportPdf={exportPdf}
        />

        {loading && (
          <StatusBanner
            tone="loading"
            title="Preparando sua ficha estratégica"
            message="Estamos estruturando OPC, SPIN e EPA/Challenger com foco em resultado de negócio para o contexto descrito."
          />
        )}

        {!loading && error && <StatusBanner tone="error" title="Não foi possível gerar agora" message={error} />}

        {!loading && notice && <StatusBanner tone="success" title="Atualização" message={notice} />}

        {!loading && result && <PreparationCards result={result} />}

        <footer className="site-footer">
          © 2026 Yara Brasil | Paixão por Vendas | José Ricardo Noronha®
          <br />
          Inteligência aplicada à Venda de Valor no Agro | Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
};

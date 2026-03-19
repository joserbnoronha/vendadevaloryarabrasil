import { useMemo, useState } from 'react';
import { exportPreparationToPdf } from '../services/pdfService';
import { preparationService } from '../services/preparationService';
import type { PreparationResult } from '../types';

interface UsePreparationState {
  scenario: string;
  setScenario: (value: string) => void;
  result: PreparationResult | null;
  loading: boolean;
  error: string | null;
  notice: string | null;
  generate: () => Promise<void>;
  clear: () => void;
  exportPdf: () => void;
  canExport: boolean;
}

const MIN_SCENARIO_LENGTH = 35;

export const usePreparation = (): UsePreparationState => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<PreparationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const generate = async (): Promise<void> => {
    const cleanScenario = scenario.trim();

    if (!cleanScenario) {
      setError('Escreva o cenário da reunião para gerar sua preparação estratégica.');
      setNotice(null);
      return;
    }

    if (cleanScenario.length < MIN_SCENARIO_LENGTH) {
      setError('Detalhe um pouco mais o cenário (cliente, contexto e objetivo) para receber recomendações mais úteis.');
      setNotice(null);
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const generated = await preparationService.generate(cleanScenario);
      setResult(generated);
      setNotice('Ficha gerada com sucesso. Revise os blocos e exporte para levar à reunião.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível gerar sua ficha agora. Tente novamente em instantes.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clear = (): void => {
    setScenario('');
    setResult(null);
    setError(null);
    setNotice(null);
  };

  const exportPdf = (): void => {
    if (!result) {
      setError('Gere uma ficha antes de exportar o PDF.');
      setNotice(null);
      return;
    }

    exportPreparationToPdf(result);
    setNotice('PDF exportado. Arquivo pronto para uso em reunião.');
    setError(null);
  };

  const canExport = useMemo(() => Boolean(result), [result]);

  return {
    scenario,
    setScenario,
    result,
    loading,
    error,
    notice,
    generate,
    clear,
    exportPdf,
    canExport
  };
};

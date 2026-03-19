import type { PreparationResult } from '../types';
import { generatePreparation } from './preparationEngine';

export interface PreparationProvider {
  generate: (scenario: string) => Promise<PreparationResult>;
}

class LocalPreparationProvider implements PreparationProvider {
  async generate(scenario: string): Promise<PreparationResult> {
    return generatePreparation(scenario);
  }
}

// Futuro: ApiPreparationProvider com chamada para IA real.
const provider: PreparationProvider = new LocalPreparationProvider();

export const preparationService = {
  generate: (scenario: string) => provider.generate(scenario)
};

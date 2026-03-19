export const normalizeText = (text: string): string =>
  text
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const capitalize = (text: string): string =>
  text.length ? text.charAt(0).toUpperCase() + text.slice(1) : text;

export const unique = <T>(values: T[]): T[] => Array.from(new Set(values));

export const pick = <T>(arr: T[], amount: number): T[] => arr.slice(0, amount);

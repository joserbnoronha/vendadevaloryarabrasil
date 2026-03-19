import jsPDF from 'jspdf';
import { APP_NAME } from '../data/knowledgeBase';
import type { PreparationResult } from '../types';

const palette = {
  forest: '#003DA6',
  forestSoft: '#1D58C7',
  graphite: '#102241',
  slate: '#3F5888',
  line: '#C3D3F3',
  paper: '#EDF3FF',
  white: '#FFFFFF'
};

const COPYRIGHT_LINE_1 = '© 2026 Yara Brasil | Paixão por Vendas | José Ricardo Noronha®';
const COPYRIGHT_LINE_2 = 'Inteligência aplicada à Venda de Valor no Agro | Todos os direitos reservados.';

const A4_HEIGHT = 297;
const CONTENT_BOTTOM = 280;

const slugify = (value: string): string =>
  value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeListItem = (item: string): string =>
  item.replace(/\s*\n+\s*/g, ' ').replace(/\s+/g, ' ').trim();

const addPageHeader = (doc: jsPDF, generatedAt: string): void => {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(palette.forest);
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(palette.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(APP_NAME, 16, 11.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.8);
  doc.text('Planejador de Reuniões de Alta Performance', 16, 18);
  doc.text(`Gerado em ${generatedAt}`, pageWidth - 16, 18, { align: 'right' });
};

const addPageFooter = (doc: jsPDF): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(palette.line);
    doc.line(16, A4_HEIGHT - 14, pageWidth - 16, A4_HEIGHT - 14);

    doc.setTextColor(palette.graphite);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.text(COPYRIGHT_LINE_1, 16, A4_HEIGHT - 9.8);
    doc.text(COPYRIGHT_LINE_2, 16, A4_HEIGHT - 6.2);
    doc.text(`Página ${page}/${totalPages}`, pageWidth - 16, A4_HEIGHT - 6.2, { align: 'right' });
  }
};

const ensureSpace = (doc: jsPDF, cursorY: number, needed: number, generatedAt: string): number => {
  if (cursorY + needed <= CONTENT_BOTTOM) {
    return cursorY;
  }

  doc.addPage();
  addPageHeader(doc, generatedAt);
  return 34;
};

const drawSectionTitle = (doc: jsPDF, title: string, cursorY: number, generatedAt: string): number => {
  const pageWidth = doc.internal.pageSize.getWidth();
  let nextY = ensureSpace(doc, cursorY, 16, generatedAt);

  doc.setFillColor(palette.paper);
  doc.roundedRect(16, nextY - 4.5, pageWidth - 32, 9, 2, 2, 'F');

  doc.setTextColor(palette.forest);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.8);
  doc.text(title, 19, nextY + 1.5);

  doc.setDrawColor(palette.line);
  doc.setLineWidth(0.24);
  doc.line(18, nextY + 6.9, pageWidth - 18, nextY + 6.9);

  return nextY + 12;
};

const drawParagraph = (
  doc: jsPDF,
  text: string,
  cursorY: number,
  generatedAt: string,
  indent = 18,
  bullet = false
): number => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - indent - 16;
  const contentText = bullet ? `• ${text}` : text;
  const lines = doc.splitTextToSize(contentText, contentWidth);
  const lineHeight = bullet ? 4.35 : 4.7;
  const afterSpacing = bullet ? 0.4 : 1.1;

  let nextY = ensureSpace(doc, cursorY, lines.length * lineHeight + afterSpacing + 0.6, generatedAt);

  doc.setTextColor(palette.graphite);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);
  doc.text(lines, indent, nextY);

  return nextY + lines.length * lineHeight + afterSpacing;
};

const drawSubheading = (doc: jsPDF, text: string, cursorY: number, generatedAt: string): number => {
  let nextY = ensureSpace(doc, cursorY, 8, generatedAt);

  doc.setTextColor(palette.forest);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.6);
  doc.text(text, 18, nextY);

  return nextY + 5.2;
};

const drawItemGroup = (doc: jsPDF, items: string[], cursorY: number, generatedAt: string): number => {
  let nextY = cursorY;

  items
    .map(normalizeListItem)
    .filter((item) => item.length > 0)
    .forEach((item) => {
    if (item.endsWith(':')) {
      nextY = drawSubheading(doc, item.replace(/:$/, ''), nextY, generatedAt);
      return;
    }

    nextY = drawParagraph(doc, item, nextY, generatedAt, 21, true);
    });

  return nextY + 1.8;
};

const drawImportantNote = (doc: jsPDF, cursorY: number, generatedAt: string): number => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const boxX = 16;
  const boxW = pageWidth - 32;
  const textX = boxX + 4;
  const paragraphTopGap = 8.5;
  const lineHeight = 4.4;
  const bottomPadding = 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.4);
  const noteLines = doc.splitTextToSize(
    'Este material foi gerado com apoio de Inteligência Artificial e pode conter imprecisões. Serve como apoio à preparação, mas não substitui o estudo individual nem a participação ativa nos Treinamentos e Simuladas de Venda de Valor.',
    boxW - 8
  );
  const boxH = paragraphTopGap + noteLines.length * lineHeight + bottomPadding;
  let nextY = ensureSpace(doc, cursorY + 2, boxH + 2, generatedAt);

  doc.setFillColor(palette.paper);
  doc.setDrawColor(palette.forest);
  doc.setLineWidth(0.35);
  doc.roundedRect(boxX, nextY, boxW, boxH, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(palette.graphite);
  doc.text(noteLines.join(' '), textX, nextY + paragraphTopGap, {
    maxWidth: boxW - 8,
    align: 'justify'
  });

  return nextY + boxH + 2;
};

const drawValueSineChart = (doc: jsPDF, result: PreparationResult, generatedAt: string): void => {
  doc.addPage();
  addPageHeader(doc, generatedAt);

  const pageWidth = doc.internal.pageSize.getWidth();
  const left = 18;
  const right = pageWidth - 18;
  const chartTop = 54;
  const chartBottom = 180;

  doc.setTextColor(palette.forest);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(result.valueSineMap.titulo, left, 36);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.7);
  doc.setTextColor(palette.slate);
  const subtitle = doc.splitTextToSize(result.valueSineMap.subtitulo, pageWidth - 36);
  doc.text(subtitle, left, 42);

  doc.setDrawColor('#1F4DAA');
  doc.setLineWidth(0.4);
  doc.line(left, chartTop, left, chartBottom);

  doc.setTextColor(palette.graphite);
  doc.setFontSize(8.6);
  doc.text('Positivo', left - 2, chartTop + 2, { align: 'right' });
  doc.text('Neutro', left - 2, (chartTop + chartBottom) / 2 + 1, { align: 'right' });
  doc.text('Negativo', left - 2, chartBottom - 1, { align: 'right' });

  doc.setDrawColor('#9FB6E4');
  doc.setLineWidth(0.2);
  doc.setLineDashPattern([1.2, 1.2], 0);
  doc.line(left, (chartTop + chartBottom) / 2, right, (chartTop + chartBottom) / 2);
  doc.setLineDashPattern([], 0);

  const points = [
    { x: 32, y: 118 },
    { x: 60, y: 84 },
    { x: 89, y: 121 },
    { x: 118, y: 138 },
    { x: 147, y: 113 },
    { x: 176, y: 86 }
  ];

  doc.setDrawColor('#1F4DAA');
  doc.setLineWidth(0.45);
  doc.lines(
    [
      [10, -20, 18, -35, 28, -34],
      [10, 6, 18, 20, 29, 37],
      [10, 8, 18, 16, 29, 17],
      [10, 0, 18, -20, 29, -25],
      [10, -5, 18, -20, 29, -27]
    ],
    points[0].x,
    points[0].y
  );

  doc.setFillColor('#003DA6');
  points.forEach((point, index) => {
    doc.circle(point.x, point.y, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor('#0F2F73');
    doc.text(String(index + 1), point.x, point.y - 3.2, { align: 'center' });
  });

  const colors = ['#c9e88e', '#c9e88e', '#ffd25b', '#ffd25b', '#6fcdf8', '#6fcdf8'];
  const boxW = 28;
  const boxH = 24;
  const boxTopByStep = [102, 70, 108, 128, 102, 72];

  points.forEach((point, index) => {
    const boxX = point.x - boxW / 2;
    const boxY = boxTopByStep[index];
    const step = result.valueSineMap.steps[index];
    doc.setFillColor(colors[index]);
    doc.roundedRect(boxX, boxY, boxW, boxH, 2, 2, 'F');
    doc.setDrawColor('#b5c8bb');
    doc.roundedRect(boxX, boxY, boxW, boxH, 2, 2);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor('#0F2F73');
    doc.text(doc.splitTextToSize(step.titulo, boxW - 3), boxX + 1.5, boxY + 4.5);
  });

  const phaseY = 191;
  const phaseW = (right - left - 4) / 3;
  const phases = [
    { name: 'Gancho', color: '#c8e88b' },
    { name: 'Impacto', color: '#ffd05a' },
    { name: 'Solução', color: '#6ccbf7' }
  ];

  phases.forEach((phase, index) => {
    const x = left + index * (phaseW + 2);
    doc.setFillColor(phase.color);
    doc.roundedRect(x, phaseY, phaseW, 10, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(palette.graphite);
    doc.text(phase.name, x + phaseW / 2, phaseY + 6.6, { align: 'center' });
  });

  let y = 207;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(palette.forest);
  doc.text('Sugestões personalizadas por etapa', left, y);
  y += 4.8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.7);
  doc.setTextColor(palette.graphite);

  result.valueSineMap.steps.forEach((step) => {
    const line = `${step.id}. ${step.sugestaoPersonalizada}`;
    const text = doc.splitTextToSize(line, pageWidth - 36);
    if (y + text.length * 4 > 280) {
      doc.addPage();
      addPageHeader(doc, generatedAt);
      y = 35;
    }
    doc.text(text, left, y);
    y += text.length * 4 + 1;
  });

  drawImportantNote(doc, y + 1, generatedAt);
};

export const exportPreparationToPdf = (result: PreparationResult): void => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const generatedAt = new Date(result.metadata.generatedAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  addPageHeader(doc, generatedAt);

  let cursorY = 35;

  cursorY = drawSectionTitle(doc, 'Cenário informado', cursorY, generatedAt);
  cursorY = drawParagraph(doc, result.cenarioOriginal, cursorY, generatedAt, 18);

  cursorY = drawSectionTitle(doc, '1. OPC | Estratégia da Conversa', cursorY, generatedAt);
  cursorY = drawSubheading(doc, 'Objetivos sugeridos', cursorY, generatedAt);
  cursorY = drawItemGroup(doc, result.opc.objetivo, cursorY, generatedAt);
  cursorY = drawSubheading(doc, 'Processo de condução', cursorY, generatedAt);
  cursorY = drawItemGroup(doc, result.opc.processo, cursorY, generatedAt);
  cursorY = drawSubheading(doc, 'Compromissos sugeridos', cursorY, generatedAt);
  cursorY = drawItemGroup(doc, result.opc.compromisso, cursorY, generatedAt);

  cursorY = drawSectionTitle(doc, '2. Perguntas que movem a decisão (Entender para Atender)', cursorY, generatedAt);
  cursorY = drawItemGroup(
    doc,
    [
      'Perguntas de Situação:',
      ...result.spin.situacao,
      'Perguntas de Problema:',
      ...result.spin.problema,
      'Perguntas de Implicação:',
      ...result.spin.implicacao,
      'Perguntas de Necessidade de Solução:',
      ...result.spin.necessidadeSolucao
    ],
    cursorY,
    generatedAt
  );

  cursorY = drawSectionTitle(doc, '3. Provocações de Valor', cursorY, generatedAt);
  cursorY = drawItemGroup(
    doc,
    ['Educar:', ...result.epa.educar, 'Personalizar:', ...result.epa.personalizar, 'Assumir o Controle:', ...result.epa.assumirControle],
    cursorY,
    generatedAt
  );

  drawValueSineChart(doc, result, generatedAt);

  addPageFooter(doc);

  const filename = `ficha-${slugify(APP_NAME)}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};

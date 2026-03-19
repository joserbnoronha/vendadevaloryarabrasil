# Yara Way of Selling

Aplicativo web para preparação estratégica de reuniões comerciais consultivas no Agro brasileiro.
O usuário descreve o cenário em texto livre e recebe uma ficha executiva com roteiro de condução, perguntas estratégicas e próximos passos de avanço.

## Proposta de valor

Yara Way of Selling ajuda times comerciais a migrar de conversas centradas em preço/produto para conversas de negócio centradas em resultado:

- margem e produtividade
- previsibilidade operacional
- custo total da decisão
- risco de inércia
- compromisso concreto de próximo passo

## Nome do app

10 nomes propostos:

1. Vantta
2. AgroNexo
3. StratAgro
4. SafraCore
5. ValorRural
6. AgroPacto
7. Vértice Agro
8. DealSafra
9. Criterium Agro
10. Pivô de Valor

Nome escolhido: **Yara Way of Selling**.

Justificativa: comunica de forma direta o posicionamento consultivo, o foco no Agro e a assinatura da marca.

## Stack

- React 18
- Vite 5
- TypeScript 5
- CSS moderno (design system próprio)
- jsPDF (exportação de PDF no front-end)

## Arquitetura

Abordagem híbrida para MVP com evolução para IA real:

- `src/services/preparationEngine.ts`
  Motor local com regras + templates consultivos específicos para Agro.
- `src/services/preparationService.ts`
  Camada de provider para desacoplar UI e facilitar troca do motor local por API externa.
- `src/services/pdfService.ts`
  Camada dedicada de exportação PDF com layout executivo.

Essa separação permite evoluir sem refatorar componentes de interface.

## Estrutura de pastas

```txt
src/
  components/      # Componentes visuais (header, input, estados, cards)
  pages/           # Composição de tela
  services/        # Motor de conteúdo, service layer e PDF
  hooks/           # Estado e fluxo da aplicação
  data/            # Base conceitual, tags e contexto Agro
  types/           # Tipos de domínio
  utils/           # Utilitários de texto
  styles/          # Sistema visual global
```

## Funcionalidades

- Entrada de cenário comercial em texto livre
- Geração automática dos blocos:
  - Análise estratégica da oportunidade (cenário, problema oculto, impacto agronômico/econômico e estimativa de ROI)
  - OPC (Objetivo, Processo, Compromisso)
  - SPIN Selling
  - EPA / Challenger
  - Mapa Estratégico da Conversa (Senoide da Venda de Valor)
  - Desafios atuais do Agro conectados ao cenário
  - Inteligência pública por produto citado (ex.: Gapper/Corteva)
  - Estrutura de ROI do manejo sugerido (premissas, fórmula, narrativa e compromisso)
  - Dicas práticas de condução
  - Próximo passo sugerido
- Conteúdo em PT-BR com foco em venda consultiva no Agro
- Loading, validações, estados vazios e mensagens de erro/sucesso
- Interface premium responsiva (desktop, tablet e mobile)
- Exportação PDF executiva com paginação

## Base de contexto Agro (fontes públicas)

O motor local usa sinais de contexto de mercado para enriquecer a conversa de valor (clima, crédito, tecnologia embarcada e pressão de margem), com base em fontes públicas como:

- Conab: [Perspectivas para a Agropecuária](https://www.conab.gov.br/perspectivas-para-a-agropecuaria)
- Embrapa: [alerta sobre riscos do clima na produção de alimentos](https://www.embrapa.br/busca-de-noticias/-/noticia/96704773/embrapa-faz-alerta-sobre-riscos-do-clima-na-producao-de-alimentos)
- Gov.br (MAPA/MCTI): [programa rumo a 100% de internet no campo](https://www.gov.br/agricultura/pt-br/assuntos/noticias/mcti-e-mapa-lancam-programa-rumo-a-100-de-cobertura-de-internet-no-campo)
- Agência Gov: [ampliação de crédito rural](https://agenciagov.ebc.com.br/noticias/202602/governo-federal-amplia-credito-rural)

Além disso, a aplicação mantém uma base setorial de referências públicas de grandes players do Agro (ex.: Yara, Corteva, Syngenta, Bayer, Monsanto legado, Mosaic, ICL, Ihara, Pioneer, Brevant, DEKALB, NK, KWS e cooperativas como Coamo, Cocamar e Copacol), usada para enriquecer a preparação e os argumentos de diferenciação por valor.

## UX/UI (versão refinada)

- visual corporativo premium, sem aparência de template
- hierarquia de leitura forte com cards estruturados
- microcopy revisada para clareza e ação
- melhor contraste, espaçamento e legibilidade
- estados de interface mais úteis (empty/loading/error/success)
- responsividade mobile reforçada

## Instalação

Pré-requisito: Node.js 20+ e npm.

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Build

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

## Publicação no GitHub

```bash
git init
git add .
git commit -m "feat: vantta v1 refinada"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

## Deploy no Cloudflare Pages

1. Garanta que o projeto esteja publicado em um repositório no GitHub.
2. No Cloudflare Pages, clique em `Create a project` e escolha `Connect to Git`.
3. Selecione o provedor GitHub e importe o repositório deste projeto.
4. Na etapa de build, configure:
- Build command: `npm run build`
- Build output directory (Vite): `dist`
5. Confirme que a branch principal (`main`) está selecionada para publicação.
6. Clique em `Save and Deploy` para publicar a branch principal.

Deploy opcional por CLI:

```bash
npm run build
npx wrangler pages deploy dist
```

## Melhorias futuras

- integração com API real de IA
- autenticação e gestão de permissões
- histórico de fichas por usuário
- persistência em banco de dados
- perfis por segmento (soja, milho, cana, pecuária, cooperativa)
- white-label por organização
- versionamento de fichas
- compartilhamento por link
- exportações avançadas (templates por marca, anexos e resumo executivo)

## Observações técnicas

O projeto está pronto para deploy estático em Cloudflare Pages.
A camada de provider já permite substituir o motor local por integração de IA real em etapa futura.

## Assinatura institucional

© 2026 Yara Brasil | Paixão por Vendas | José Ricardo Noronha®

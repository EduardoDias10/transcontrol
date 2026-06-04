# TransControl

Sistema web de gestão para transportadora, criado como protótipo funcional em React + Vite + Tailwind CSS.

## Funcionalidades

- Dashboard com indicadores da operação.
- Cadastro e controle de caminhões.
- Controle de viagens.
- Registro de abastecimentos de diesel.
- Controle de manutenções e alertas.
- Gastos extras.
- Relatórios com filtros e exportação CSV.
- Dados mockados persistidos em `localStorage`.
- Plugin local para gerar o protótipo editável no Figma.

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

Depois acesse o endereço exibido no terminal, normalmente:

```text
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Figma

O gerador editável para Figma está em:

```text
figma-plugin/
```

No Figma Desktop, importe o arquivo `figma-plugin/manifest.json` em `Plugins > Development > Import plugin from manifest...`.

# TransControl — Gerador Editável para Figma

Este plugin de desenvolvimento cria uma versão nativa e editável do TransControl:

- textos continuam como camadas de texto;
- fontes, cores, bordas e sombras podem ser alteradas;
- cards, filtros, tabelas e painéis são frames editáveis;
- as sete telas ficam organizadas em um único canvas;
- a execução pode ser repetida sem apagar conteúdo criado manualmente.

## Como importar no Figma

1. Abra o aplicativo desktop do Figma.
2. Acesse `Plugins` > `Development` > `Import plugin from manifest...`.
3. Selecione o arquivo `figma-plugin/manifest.json`.
4. Abra o arquivo do TransControl no Figma.
5. Acesse `Plugins` > `Development` > `TransControl — Gerador Editável`.

O plugin criará a página `TransControl — Editável`.

## Observação

Quando executado novamente, o plugin substitui apenas a seção gerada anteriormente por ele. Camadas criadas manualmente fora dessa seção são preservadas.

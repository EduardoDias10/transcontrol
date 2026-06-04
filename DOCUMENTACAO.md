# TransControl — Sistema de Gestão para Transportadora

## Sobre o Projeto

O **TransControl** é um protótipo funcional de sistema web criado para ajudar donos e gestores de transportadoras a controlar a operação da frota de forma simples, visual e organizada.

O sistema foi desenvolvido como uma aplicação moderna em **React + Vite**, com interface responsiva, visual profissional e dados demonstrativos salvos temporariamente no navegador por meio de `localStorage`.

O objetivo principal é centralizar informações importantes da transportadora, como viagens, caminhões, abastecimentos, manutenções, gastos extras e relatórios operacionais.

## Objetivo do Sistema

O TransControl foi criado para facilitar o acompanhamento da rotina de uma transportadora, permitindo registrar e consultar informações essenciais para a gestão da frota.

Com ele, a empresa consegue:

- controlar caminhões cadastrados;
- acompanhar viagens realizadas ou agendadas;
- registrar abastecimentos de diesel;
- monitorar manutenções realizadas e futuras;
- controlar gastos extras da operação;
- visualizar indicadores financeiros e operacionais;
- gerar uma visão geral da situação da frota.

## Tecnologias Utilizadas

- **React**: biblioteca principal para criação da interface.
- **Vite**: ferramenta de build e desenvolvimento rápido.
- **Tailwind CSS**: estilização moderna e responsiva.
- **Lucide React**: biblioteca de ícones.
- **localStorage**: armazenamento temporário dos dados no navegador.
- **Figma Plugin**: gerador local para criar uma versão editável do layout no Figma.

## Estrutura Principal

O projeto está organizado em pastas para facilitar manutenção e evolução:

```text
src/
  components/
  data/
  hooks/
  pages/
  App.jsx
  main.jsx
  index.css
```

Também existe a pasta:

```text
figma-plugin/
```

Essa pasta contém o plugin usado para gerar uma versão editável do layout no Figma.

## Funcionalidades

### 1. Dashboard

A tela inicial apresenta uma visão geral da operação da transportadora.

Ela mostra:

- total de viagens no mês;
- gasto total com diesel;
- gasto total com manutenções;
- gastos extras;
- quantidade de caminhões cadastrados;
- próximas manutenções;
- últimas viagens registradas;
- alertas de manutenção.

Também há cards visuais e gráficos simples para facilitar a leitura dos custos por categoria.

### 2. Cadastro de Caminhões

Permite cadastrar, listar, editar, visualizar e excluir caminhões da frota.

Campos principais:

- placa;
- modelo;
- ano;
- motorista responsável;
- quilometragem atual;
- capacidade do caminhão;
- status;
- observações.

Os status disponíveis são:

- disponível;
- em viagem;
- em manutenção.

### 3. Controle de Viagens

Permite registrar e acompanhar viagens da transportadora.

Campos principais:

- data da viagem;
- caminhão utilizado;
- motorista;
- origem;
- destino;
- quilometragem inicial;
- quilometragem final;
- distância percorrida;
- tipo de carga;
- valor do frete;
- status da viagem;
- observações.

O sistema calcula automaticamente a distância quando a quilometragem inicial e final são preenchidas.

### 4. Controle de Abastecimentos

Permite registrar abastecimentos de diesel de cada caminhão.

Campos principais:

- data do abastecimento;
- caminhão;
- motorista;
- posto ou local;
- litros abastecidos;
- valor por litro;
- valor total;
- quilometragem no momento do abastecimento;
- forma de pagamento;
- nota fiscal anexada;
- observações.

O valor total é calculado automaticamente com base em:

```text
litros abastecidos x valor por litro
```

### 5. Controle de Manutenções

Permite registrar manutenções feitas nos caminhões e acompanhar próximas revisões.

Campos principais:

- data da manutenção;
- caminhão;
- tipo de manutenção;
- oficina ou local;
- descrição do serviço realizado;
- valor gasto;
- quilometragem atual;
- data da próxima manutenção;
- quilometragem da próxima manutenção;
- nota fiscal anexada;
- observações.

A tela destaca manutenções futuras e exibe alertas para revisões próximas.

### 6. Gastos Extras

Permite registrar despesas adicionais da operação.

Categorias disponíveis:

- mecânica;
- pedágio;
- multas;
- lavagem;
- peças;
- alimentação;
- hospedagem;
- outros.

Campos principais:

- data do gasto;
- caminhão relacionado;
- categoria;
- local;
- descrição;
- valor;
- nota fiscal anexada;
- observações.

### 7. Relatórios

A tela de relatórios consolida os principais dados financeiros e operacionais.

Filtros disponíveis:

- período;
- caminhão;
- tipo de registro;
- motorista.

Indicadores exibidos:

- total gasto com diesel;
- total gasto com manutenção;
- total de gastos extras;
- total geral;
- total de viagens;
- média de gasto por caminhão;
- histórico consolidado dos registros.

Também existe um botão para exportar relatório em CSV.

## Recursos de Interface

O sistema possui:

- sidebar lateral de navegação;
- topbar com busca e usuário;
- cards de resumo;
- tabelas organizadas;
- filtros por módulo;
- botões de ação para visualizar, editar e excluir;
- modais de cadastro e edição;
- badges de status;
- layout responsivo para desktop e celular.

## Armazenamento dos Dados

Atualmente, o TransControl não possui backend.

Os dados são:

- mockados para demonstração;
- salvos temporariamente no `localStorage`;
- mantidos no navegador do usuário;
- perdidos caso o armazenamento local seja limpo.

Para uma versão final em produção, o ideal seria integrar o sistema a um backend com banco de dados.

## Possíveis Melhorias Futuras

Algumas melhorias recomendadas para próximas versões:

- autenticação de usuários;
- banco de dados real;
- cadastro de motoristas;
- histórico completo por caminhão;
- controle de pneus;
- controle de documentos dos veículos;
- vencimento de CNH e licenças;
- emissão de relatórios em PDF;
- dashboard financeiro avançado;
- integração com APIs de frete, mapas ou rastreamento;
- permissões por tipo de usuário.

## Conclusão

O TransControl é uma base inicial para um sistema de gestão de transportadora. Ele já apresenta uma estrutura funcional, organizada e visualmente profissional, permitindo demonstrar como a empresa poderá controlar viagens, caminhões, abastecimentos, manutenções e gastos.

Mesmo sendo um protótipo, o sistema já possui navegação, formulários, filtros, tabelas, cálculos automáticos e persistência local, servindo como uma ótima base para evolução futura com backend e banco de dados.

const COLORS = {
  ink: '#0B1629',
  inkSoft: '#15233A',
  ocean: '#1B64F2',
  oceanDark: '#1552C8',
  mist: '#F4F7FB',
  white: '#FFFFFF',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  emerald: '#10B981',
  emeraldSoft: '#ECFDF5',
  amber: '#F59E0B',
  amberSoft: '#FFFBEB',
  violet: '#7C3AED',
  violetSoft: '#F5F3FF',
  red: '#EF4444',
  redSoft: '#FEF2F2',
}

const FONT = {
  regular: { family: 'Inter', style: 'Regular' },
  medium: { family: 'Inter', style: 'Medium' },
  semibold: { family: 'Inter', style: 'Semi Bold' },
  bold: { family: 'Inter', style: 'Bold' },
}

const NAV = [
  ['Visão geral', 'G'],
  ['Caminhões', 'C'],
  ['Viagens', 'V'],
  ['Abastecimentos', 'A'],
  ['Manutenções', 'M'],
  ['Gastos extras', '$'],
  ['Relatórios', 'R'],
]

const SCREEN_DATA = [
  { name: '01 — Dashboard', title: 'Visão geral da operação', subtitle: 'Acompanhe os principais indicadores da frota e tome decisões com mais agilidade.', active: 0, kind: 'dashboard' },
  { name: '02 — Caminhões', title: 'Caminhões', subtitle: 'Cadastre os veículos, acompanhe a disponibilidade e centralize o histórico da frota.', active: 1, kind: 'trucks' },
  { name: '03 — Viagens', title: 'Controle de viagens', subtitle: 'Registre rotas, motoristas, quilometragens e valores de frete.', active: 2, kind: 'trips' },
  { name: '04 — Abastecimentos', title: 'Abastecimentos', subtitle: 'Acompanhe consumo, preços praticados e comprovantes de cada abastecimento.', active: 3, kind: 'fuel' },
  { name: '05 — Manutenções', title: 'Manutenções', subtitle: 'Organize serviços realizados e antecipe as próximas paradas de cada veículo.', active: 4, kind: 'maintenance' },
  { name: '06 — Gastos extras', title: 'Gastos extras', subtitle: 'Registre os custos adicionais de cada viagem e veículo sem perder comprovantes.', active: 5, kind: 'expenses' },
  { name: '07 — Relatórios', title: 'Relatórios', subtitle: 'Cruze custos e atividades para entender melhor o desempenho da sua frota.', active: 6, kind: 'reports' },
]

function rgb(hex) {
  const value = hex.replace('#', '')
  return {
    r: parseInt(value.slice(0, 2), 16) / 255,
    g: parseInt(value.slice(2, 4), 16) / 255,
    b: parseInt(value.slice(4, 6), 16) / 255,
  }
}

function solid(hex, opacity = 1) {
  return { type: 'SOLID', color: rgb(hex), opacity }
}

function shadow(opacity = 0.08, y = 8, blur = 24) {
  const color = rgb(COLORS.ink)
  return [{
    type: 'DROP_SHADOW',
    color: { r: color.r, g: color.g, b: color.b, a: opacity },
    offset: { x: 0, y },
    radius: blur,
    visible: true,
    blendMode: 'NORMAL',
  }]
}

function append(parent, node) {
  parent.appendChild(node)
  return node
}

function makeFrame(parent, name, x, y, width, height, fill = null, radius = 0) {
  const node = figma.createFrame()
  node.name = name
  node.resize(width, height)
  node.x = x
  node.y = y
  node.clipsContent = false
  node.fills = fill ? [solid(fill)] : []
  if (radius) node.cornerRadius = radius
  append(parent, node)
  return node
}

function makeRect(parent, name, x, y, width, height, fill, radius = 0, strokeColor = null) {
  const node = figma.createRectangle()
  node.name = name
  node.resize(width, height)
  node.x = x
  node.y = y
  node.fills = fill ? [solid(fill)] : []
  if (radius) node.cornerRadius = radius
  if (strokeColor) {
    node.strokes = [solid(strokeColor)]
    node.strokeWeight = 1
  }
  append(parent, node)
  return node
}

function makeLine(parent, name, x, y, width, color = COLORS.slate200) {
  const node = figma.createLine()
  node.name = name
  node.x = x
  node.y = y
  node.resize(width, 0)
  node.strokes = [solid(color)]
  node.strokeWeight = 1
  append(parent, node)
  return node
}

function makeText(parent, name, characters, x, y, size = 14, color = COLORS.slate700, weight = 'regular', width = null, align = 'LEFT') {
  const node = figma.createText()
  node.name = name
  node.fontName = FONT[weight]
  node.fontSize = size
  node.characters = characters
  node.fills = [solid(color)]
  node.x = x
  node.y = y
  node.textAlignHorizontal = align
  node.lineHeight = { unit: 'AUTO' }
  if (width) {
    node.resize(width, node.height)
    node.textAutoResize = 'HEIGHT'
  } else {
    node.textAutoResize = 'WIDTH_AND_HEIGHT'
  }
  append(parent, node)
  return node
}

function makePill(parent, text, x, y, tone = 'blue') {
  const tones = {
    blue: [COLORS.ocean, '#EFF6FF'],
    green: ['#047857', COLORS.emeraldSoft],
    amber: ['#B45309', COLORS.amberSoft],
    slate: [COLORS.slate600, COLORS.slate100],
    red: ['#B91C1C', COLORS.redSoft],
  }
  const [textColor, bg] = tones[tone]
  const width = Math.max(70, text.length * 7 + 24)
  const pill = makeFrame(parent, `Badge / ${text}`, x, y, width, 26, bg, 13)
  makeText(pill, 'Label', text, 12, 6, 11, textColor, 'semibold')
  return pill
}

function makeButton(parent, label, x, y, primary = true, width = null) {
  const buttonWidth = width || Math.max(124, label.length * 8 + 42)
  const button = makeFrame(parent, `Button / ${label}`, x, y, buttonWidth, 44, primary ? COLORS.ocean : COLORS.white, 11)
  if (!primary) {
    button.strokes = [solid(COLORS.slate200)]
    button.strokeWeight = 1
  }
  makeText(button, 'Icon', '+', 14, 10, 18, primary ? COLORS.white : COLORS.slate600, 'regular')
  makeText(button, 'Label', label, 38, 13, 13, primary ? COLORS.white : COLORS.slate700, 'semibold')
  button.effects = primary ? shadow(0.12, 5, 12) : []
  return button
}

function makeIconBox(parent, label, x, y, tone = 'blue', size = 42) {
  const tones = {
    blue: [COLORS.ocean, '#EFF6FF'],
    green: [COLORS.emerald, COLORS.emeraldSoft],
    amber: [COLORS.amber, COLORS.amberSoft],
    violet: [COLORS.violet, COLORS.violetSoft],
    slate: [COLORS.slate600, COLORS.slate100],
    red: [COLORS.red, COLORS.redSoft],
  }
  const [fg, bg] = tones[tone]
  const box = makeFrame(parent, `Icon / ${label}`, x, y, size, size, bg, 11)
  const t = makeText(box, 'Glyph', label, 0, 0, 14, fg, 'bold', size, 'CENTER')
  t.y = Math.round((size - t.height) / 2)
  return box
}

function makePanel(parent, name, x, y, width, height, fill = COLORS.white) {
  const panel = makeFrame(parent, name, x, y, width, height, fill, 18)
  panel.strokes = [solid(COLORS.slate200)]
  panel.strokeWeight = 1
  panel.effects = shadow(0.035, 8, 20)
  return panel
}

function makeStatCard(parent, x, y, width, label, value, tone, icon, trend = '') {
  const card = makePanel(parent, `Card / ${label}`, x, y, width, 132)
  makeText(card, 'Label', label, 20, 20, 12, COLORS.slate500, 'medium')
  makeText(card, 'Value', value, 20, 50, 22, COLORS.ink, 'bold')
  makeIconBox(card, icon, width - 62, 20, tone, 42)
  if (trend) makeText(card, 'Trend', trend, 20, 101, 10, trend.startsWith('↓') ? COLORS.red : COLORS.emerald, 'medium')
  return card
}

function buildSidebar(screen, active) {
  const sidebar = makeFrame(screen, 'Sidebar', 0, 0, 244, 1000, COLORS.ink)
  const logo = makeFrame(sidebar, 'Logo', 20, 24, 42, 42, COLORS.ocean, 12)
  makeText(logo, 'Logo glyph', 'T', 0, 9, 18, COLORS.white, 'bold', 42, 'CENTER')
  makeRect(logo, 'Orange accent', 0, 38, 42, 4, COLORS.amber, 2)
  makeText(sidebar, 'Brand', 'TransControl', 76, 26, 17, COLORS.white, 'bold')
  makeText(sidebar, 'Brand subtitle', 'GESTÃO DE TRANSPORTES', 76, 50, 8, COLORS.slate400, 'semibold')
  makeText(sidebar, 'Section label', 'OPERAÇÃO', 22, 104, 9, COLORS.slate400, 'semibold')

  NAV.forEach(([label, glyph], index) => {
    const item = makeFrame(sidebar, `Nav / ${label}`, 12, 128 + index * 54, 220, 46, index === active ? COLORS.ocean : null, 11)
    if (index !== active) item.fills = []
    makeIconBox(item, glyph, 10, 9, index === active ? 'blue' : 'slate', 28)
    if (index === active) item.children[0].fills = [solid(COLORS.oceanDark)]
    makeText(item, 'Label', label, 49, 14, 13, index === active ? COLORS.white : COLORS.slate400, 'medium')
    if (label === 'Manutenções') {
      const alert = makeFrame(item, 'Alert count', 190, 12, 22, 22, COLORS.amber, 11)
      makeText(alert, 'Count', '2', 0, 5, 10, COLORS.ink, 'bold', 22, 'CENTER')
    }
  })

  const footer = makeFrame(sidebar, 'Environment notice', 12, 892, 220, 88, COLORS.inkSoft, 15)
  footer.strokes = [solid(COLORS.slate700)]
  footer.strokeWeight = 1
  makeText(footer, 'Title', 'Central da frota', 14, 14, 11, COLORS.slate300, 'semibold')
  makeText(footer, 'Description', 'Dados salvos neste dispositivo.\nAmbiente de demonstração.', 14, 38, 9, COLORS.slate400, 'regular', 190)
}

function buildTopbar(screen, pageName) {
  const topbar = makeFrame(screen, 'Topbar', 244, 0, 1196, 70, COLORS.white)
  makeLine(topbar, 'Bottom border', 0, 69, 1196, COLORS.slate200)
  makeText(topbar, 'Page name', pageName, 28, 19, 12, COLORS.ink, 'bold')
  makeText(topbar, 'Date', 'Quinta-feira, 04 de junho', 28, 39, 9, COLORS.slate400, 'regular')
  const search = makeFrame(topbar, 'Search field', 188, 12, 384, 46, COLORS.slate50, 12)
  search.strokes = [solid(COLORS.slate200)]
  search.strokeWeight = 1
  makeText(search, 'Search icon', '⌕', 15, 12, 18, COLORS.slate400, 'regular')
  makeText(search, 'Placeholder', 'Buscar caminhão, motorista...', 42, 15, 12, COLORS.slate400, 'regular')
  makeIconBox(topbar, '!', 964, 14, 'slate', 42)
  const avatar = makeFrame(topbar, 'Avatar', 1020, 15, 38, 38, COLORS.ocean, 12)
  makeText(avatar, 'Initials', 'LM', 0, 12, 10, COLORS.white, 'bold', 38, 'CENTER')
  makeText(topbar, 'User name', 'Lucas Martins', 1070, 19, 10, COLORS.ink, 'bold')
  makeText(topbar, 'User role', 'Administrador', 1070, 38, 8, COLORS.slate400, 'regular')
}

function buildHeading(screen, title, subtitle, buttonLabel, eyebrow) {
  const x = 276
  makeText(screen, 'Eyebrow', eyebrow, x, 103, 10, COLORS.ocean, 'bold')
  makeText(screen, 'Page title', title, x, 128, 27, COLORS.ink, 'bold')
  makeText(screen, 'Page description', subtitle, x, 167, 12, COLORS.slate500, 'regular', 720)
  if (buttonLabel) makeButton(screen, buttonLabel, 1240, 120, true, 168)
}

function makeFilterBar(screen, y, filters) {
  const bar = makePanel(screen, 'Filters', 276, y, 1132, 76)
  const search = makeFrame(bar, 'Search', 16, 15, 330, 46, COLORS.white, 11)
  search.strokes = [solid(COLORS.slate200)]
  search.strokeWeight = 1
  makeText(search, 'Icon', '⌕', 14, 12, 17, COLORS.slate400, 'regular')
  makeText(search, 'Placeholder', 'Buscar em todos os registros...', 40, 15, 11, COLORS.slate400, 'regular')
  filters.forEach((label, index) => {
    const width = 168
    const field = makeFrame(bar, `Filter / ${label}`, 366 + index * (width + 10), 15, width, 46, COLORS.white, 11)
    field.strokes = [solid(COLORS.slate200)]
    field.strokeWeight = 1
    makeText(field, 'Label', label, 14, 15, 10, COLORS.slate500, 'medium')
    makeText(field, 'Caret', '⌄', width - 22, 13, 12, COLORS.slate400, 'regular')
  })
}

function makeTable(screen, y, title, columns, rows, height = 570) {
  const table = makePanel(screen, `Table / ${title}`, 276, y, 1132, height)
  makeText(table, 'Title', title, 20, 18, 15, COLORS.ink, 'bold')
  makeText(table, 'Summary', `${rows.length} registros exibidos`, 20, 42, 10, COLORS.slate400, 'regular')
  makeLine(table, 'Header separator', 0, 68, 1132)
  makeRect(table, 'Header background', 0, 69, 1132, 44, COLORS.slate50)
  const colWidth = 1092 / columns.length
  columns.forEach((column, index) => makeText(table, `Column / ${column}`, 20 + index * colWidth, 85, 9, COLORS.slate400, 'bold'))
  rows.forEach((row, rowIndex) => {
    const rowY = 113 + rowIndex * 70
    makeLine(table, `Row divider ${rowIndex + 1}`, 0, rowY, 1132)
    row.forEach((cell, cellIndex) => {
      const x = 20 + cellIndex * colWidth
      if (cell && typeof cell === 'object' && cell.badge) {
        makePill(table, cell.badge, x, rowY + 22, cell.tone || 'blue')
      } else {
        makeText(table, `Cell ${rowIndex + 1}.${cellIndex + 1}`, String(cell), x, rowY + 24, 11, cellIndex === 0 ? COLORS.slate700 : COLORS.slate500, cellIndex === 0 ? 'semibold' : 'regular', colWidth - 20)
      }
    })
  })
  return table
}

function buildDashboard(screen) {
  buildHeading(screen, SCREEN_DATA[0].title, SCREEN_DATA[0].subtitle, 'Registrar viagem', 'CENTRO DE CONTROLE')
  const stats = [
    ['Viagens no mês', '4', 'blue', 'V', '↑ 12% vs. mês anterior'],
    ['Gasto com diesel', 'R$ 7.178,80', 'amber', 'D', '↓ 3,4% vs. mês anterior'],
    ['Manutenções', 'R$ 13.860,00', 'violet', 'M', '↑ 5,1% vs. mês anterior'],
    ['Gastos extras', 'R$ 1.086,40', 'green', '$', '↓ 8% vs. mês anterior'],
    ['Caminhões', '4', 'slate', 'C', ''],
    ['Próximas revisões', '3', 'amber', 'R', ''],
  ]
  const cardWidth = 361
  stats.forEach((stat, i) => {
    makeStatCard(screen, 276 + (i % 3) * 385, 211 + Math.floor(i / 3) * 150, cardWidth, stat[0], stat[1], stat[2], stat[3], stat[4])
  })

  const hero = makeFrame(screen, 'Operation hero', 276, 511, 696, 230, COLORS.ink, 20)
  makeText(hero, 'Eyebrow', 'OPERAÇÃO EM TEMPO REAL', 24, 26, 10, '#60A5FA', 'bold')
  makeText(hero, 'Title', 'Sua frota está rodando com 2 caminhões disponíveis.', 24, 57, 22, COLORS.white, 'bold', 560)
  makeText(hero, 'Description', 'Há 1 viagem em andamento e 3 revisões programadas para acompanhar.', 24, 119, 11, COLORS.slate400, 'regular', 580)
  makeButton(hero, 'Ver frota', 24, 166, false, 112)
  makeButton(hero, 'Abrir relatórios', 148, 166, false, 152)

  const chart = makePanel(screen, 'Gastos por categoria', 992, 511, 416, 230)
  makeText(chart, 'Title', 'Gastos por categoria', 20, 20, 14, COLORS.ink, 'bold')
  makeText(chart, 'Subtitle', 'Distribuição do período atual', 20, 43, 9, COLORS.slate400, 'regular')
  makePill(chart, 'Junho 2026', 298, 16, 'blue')
  const donutBase = figma.createEllipse()
  donutBase.name = 'Donut / Total'
  donutBase.resize(126, 126)
  donutBase.x = 22
  donutBase.y = 78
  donutBase.fills = [solid(COLORS.amber)]
  donutBase.arcData = { startingAngle: 0, endingAngle: Math.PI * 2, innerRadius: 0.68 }
  append(chart, donutBase)
  const donutBlue = figma.createEllipse()
  donutBlue.name = 'Donut / Diesel'
  donutBlue.resize(126, 126)
  donutBlue.x = 22
  donutBlue.y = 78
  donutBlue.fills = [solid('#3B82F6')]
  donutBlue.arcData = { startingAngle: -Math.PI / 2, endingAngle: 0.55, innerRadius: 0.68 }
  append(chart, donutBlue)
  makeText(chart, 'Total label', 'TOTAL', 52, 124, 8, COLORS.slate400, 'bold', 66, 'CENTER')
  makeText(chart, 'Total value', 'R$ 22.125', 48, 140, 10, COLORS.ink, 'bold', 74, 'CENTER')
  ;[['Diesel', 'R$ 7.178,80', COLORS.ocean], ['Manutenção', 'R$ 13.860,00', COLORS.amber], ['Gastos extras', 'R$ 1.086,40', COLORS.emerald]].forEach((item, index) => {
    makeRect(chart, `Legend dot ${item[0]}`, 176, 88 + index * 42, 8, 8, item[2], 4)
    makeText(chart, `Legend ${item[0]}`, item[0], 194, 84 + index * 42, 9, COLORS.slate600, 'medium')
    makeText(chart, `Legend value ${item[0]}`, item[1], 294, 84 + index * 42, 9, COLORS.ink, 'bold', 100, 'RIGHT')
    makeRect(chart, `Legend bar ${item[0]}`, 194, 104 + index * 42, index === 1 ? 176 : index === 0 ? 86 : 28, 5, item[2], 3)
  })

  makeTable(screen, 763, 'Últimas viagens', ['ROTA', 'CAMINHÃO', 'DISTÂNCIA', 'STATUS'], [
    ['Campinas, SP → Curitiba, PR', 'RZT-4H21', '590 km', { badge: 'Em andamento', tone: 'blue' }],
    ['São Paulo, SP → Belo Horizonte, MG', 'QPL-8D90', '590 km', { badge: 'Finalizada', tone: 'green' }],
    ['Joinville, SC → Porto Alegre, RS', 'TCA-2F17', '490 km', { badge: 'Finalizada', tone: 'green' }],
  ], 290)
}

function buildTrucks(screen) {
  buildHeading(screen, 'Caminhões', SCREEN_DATA[1].subtitle, 'Novo caminhão', 'GESTÃO DE FROTA')
  makeFilterBar(screen, 211, ['Todos os status'])
  makeTable(screen, 307, 'Frota cadastrada', ['CAMINHÃO', 'MOTORISTA', 'ANO', 'QUILOMETRAGEM', 'CAPACIDADE', 'STATUS'], [
    ['RZT-4H21 · Volvo FH 540', 'Carlos Mendes', '2022', '186.420 km', '29 toneladas', { badge: 'Em viagem', tone: 'blue' }],
    ['QPL-8D90 · Scania R 450', 'Rafael Lima', '2021', '224.780 km', '28 toneladas', { badge: 'Disponível', tone: 'green' }],
    ['TCA-2F17 · DAF XF 530', 'João Alves', '2023', '94.820 km', '30 toneladas', { badge: 'Disponível', tone: 'green' }],
    ['BCN-7J33 · Mercedes Actros', 'Marcos Souza', '2020', '318.050 km', '27 toneladas', { badge: 'Em manutenção', tone: 'amber' }],
  ])
}

function buildTrips(screen) {
  buildHeading(screen, 'Controle de viagens', SCREEN_DATA[2].subtitle, 'Nova viagem', 'OPERAÇÃO')
  makeFilterBar(screen, 211, ['Todos os caminhões', 'Todos os motoristas', 'Todos os status'])
  makeTable(screen, 307, 'Viagens registradas', ['DATA', 'ROTA', 'CAMINHÃO', 'MOTORISTA', 'DISTÂNCIA', 'FRETE', 'STATUS'], [
    ['03/06/2026', 'Campinas → Curitiba', 'RZT-4H21', 'Carlos Mendes', '590 km', 'R$ 7.850', { badge: 'Em andamento', tone: 'blue' }],
    ['01/06/2026', 'São Paulo → Belo Horizonte', 'QPL-8D90', 'Rafael Lima', '590 km', 'R$ 9.100', { badge: 'Finalizada', tone: 'green' }],
    ['29/05/2026', 'Joinville → Porto Alegre', 'TCA-2F17', 'João Alves', '490 km', 'R$ 8.400', { badge: 'Finalizada', tone: 'green' }],
    ['06/06/2026', 'Sorocaba → Goiânia', 'QPL-8D90', 'Rafael Lima', '0 km', 'R$ 11.200', { badge: 'Agendada', tone: 'blue' }],
  ])
}

function buildFuel(screen) {
  buildHeading(screen, 'Abastecimentos', SCREEN_DATA[3].subtitle, 'Novo abastecimento', 'CUSTOS OPERACIONAIS')
  makeFilterBar(screen, 211, ['Todos os caminhões', 'Pagamento'])
  makeTable(screen, 307, 'Abastecimentos registrados', ['DATA', 'CAMINHÃO', 'POSTO / LOCAL', 'LITROS', 'R$/LITRO', 'TOTAL', 'ANEXO'], [
    ['03/06/2026', 'RZT-4H21', 'Posto Rota Sul', '420 L', 'R$ 6,18', 'R$ 2.595,60', 'nf_84512.pdf'],
    ['01/06/2026', 'QPL-8D90', 'Rede Estrada BH', '390 L', 'R$ 6,09', 'R$ 2.375,10', 'abastecimento_qpl.pdf'],
    ['29/05/2026', 'TCA-2F17', 'Posto Serra Azul', '355 L', 'R$ 6,22', 'R$ 2.208,10', 'Sem anexo'],
  ])
}

function buildMaintenance(screen) {
  buildHeading(screen, 'Manutenções', SCREEN_DATA[4].subtitle, 'Nova manutenção', 'SAÚDE DA FROTA')
  ;[
    ['BCN-7J33 · Freios', '08/06/2026 · 320.000 km', 'red'],
    ['RZT-4H21 · Troca de óleo', '15/06/2026 · 190.000 km', 'amber'],
    ['TCA-2F17 · Revisão', '10/07/2026 · 105.000 km', 'amber'],
  ].forEach((item, index) => {
    const card = makePanel(screen, `Maintenance alert ${index + 1}`, 276 + index * 385, 211, 361, 82)
    makeIconBox(card, '!', 16, 18, item[2], 42)
    makeText(card, 'Title', item[0], 72, 19, 11, COLORS.slate700, 'bold')
    makeText(card, 'Description', item[1], 72, 44, 9, COLORS.slate400, 'regular')
  })
  makeFilterBar(screen, 313, ['Todos os caminhões', 'Todos os tipos'])
  makeTable(screen, 409, 'Histórico de manutenções', ['REALIZADA EM', 'CAMINHÃO', 'TIPO', 'OFICINA / LOCAL', 'VALOR', 'PRÓXIMA'], [
    ['21/05/2026', 'BCN-7J33', { badge: 'Freios', tone: 'slate' }, 'Oficina Diesel Forte', 'R$ 4.850', '08/06/2026'],
    ['17/04/2026', 'RZT-4H21', { badge: 'Troca de óleo', tone: 'slate' }, 'Volvo Center Campinas', 'R$ 3.290', '15/06/2026'],
    ['08/03/2026', 'TCA-2F17', { badge: 'Revisão', tone: 'slate' }, 'DAF Service Sul', 'R$ 5.720', '10/07/2026'],
  ], 480)
}

function buildExpenses(screen) {
  buildHeading(screen, 'Gastos extras', SCREEN_DATA[5].subtitle, 'Novo gasto', 'CUSTOS OPERACIONAIS')
  makeFilterBar(screen, 211, ['Todos os caminhões', 'Todas as categorias'])
  makeTable(screen, 307, 'Gastos registrados', ['DATA', 'CATEGORIA', 'CAMINHÃO', 'LOCAL', 'DESCRIÇÃO', 'VALOR', 'ANEXO'], [
    ['03/06/2026', { badge: 'Pedágio', tone: 'green' }, 'RZT-4H21', 'Régis Bittencourt', 'Pedágios da rota', 'R$ 486,40', 'pedagios_0603.pdf'],
    ['01/06/2026', { badge: 'Alimentação', tone: 'green' }, 'QPL-8D90', 'Belo Horizonte', 'Diária do motorista', 'R$ 180,00', 'Sem anexo'],
    ['30/05/2026', { badge: 'Lavagem', tone: 'green' }, 'TCA-2F17', 'Lavacar Trevo Sul', 'Lavagem completa', 'R$ 420,00', 'lavagem_tca.jpg'],
  ])
}

function makeReportFilter(screen) {
  const panel = makePanel(screen, 'Report filters', 276, 211, 1132, 122)
  makeText(panel, 'Title', 'Filtros do relatório', 18, 17, 13, COLORS.ink, 'bold')
  ;['Data inicial', 'Data final', 'Caminhão', 'Tipo de registro', 'Motorista'].forEach((label, index) => {
    makeText(panel, `Label / ${label}`, label, 18 + index * 219, 50, 9, COLORS.slate500, 'bold')
    const input = makeFrame(panel, `Input / ${label}`, 18 + index * 219, 68, 200, 38, COLORS.white, 9)
    input.strokes = [solid(COLORS.slate200)]
    input.strokeWeight = 1
    makeText(input, 'Value', index < 2 ? 'dd/mm/aaaa' : 'Todos', 11, 12, 9, COLORS.slate400, 'regular')
  })
}

function buildReports(screen) {
  buildHeading(screen, 'Relatórios', SCREEN_DATA[6].subtitle, 'Exportar relatório', 'INTELIGÊNCIA OPERACIONAL')
  makeReportFilter(screen)
  const stats = [
    ['Diesel', 'R$ 7.178,80', 'blue', 'D'],
    ['Manutenção', 'R$ 13.860', 'amber', 'M'],
    ['Gastos extras', 'R$ 1.086,40', 'green', '$'],
    ['Total geral', 'R$ 22.125,20', 'violet', 'T'],
    ['Total de viagens', '4', 'slate', 'V'],
    ['Média por caminhão', 'R$ 5.531,30', 'blue', 'C'],
  ]
  stats.forEach((stat, i) => {
    makeStatCard(screen, 276 + (i % 3) * 385, 353 + Math.floor(i / 3) * 150, 361, stat[0], stat[1], stat[2], stat[3], '')
  })
  makeTable(screen, 653, 'Histórico consolidado', ['DATA', 'TIPO', 'CAMINHÃO', 'DESCRIÇÃO', 'VALOR'], [
    ['03/06/2026', { badge: 'Diesel', tone: 'blue' }, 'RZT-4H21', '420 litros em Posto Rota Sul', 'R$ 2.595,60'],
    ['03/06/2026', { badge: 'Gasto extra', tone: 'green' }, 'RZT-4H21', 'Pedágio · Régis Bittencourt', 'R$ 486,40'],
    ['03/06/2026', { badge: 'Viagem', tone: 'slate' }, 'RZT-4H21', 'Campinas para Curitiba', 'R$ 7.850,00'],
  ], 330)
}

function buildScreen(parent, data, x, y) {
  const screen = makeFrame(parent, data.name, x, y, 1440, 1000, COLORS.mist, 0)
  screen.clipsContent = true
  buildSidebar(screen, data.active)
  buildTopbar(screen, data.name.replace(/^\d+ — /, ''))
  if (data.kind === 'dashboard') buildDashboard(screen)
  if (data.kind === 'trucks') buildTrucks(screen)
  if (data.kind === 'trips') buildTrips(screen)
  if (data.kind === 'fuel') buildFuel(screen)
  if (data.kind === 'maintenance') buildMaintenance(screen)
  if (data.kind === 'expenses') buildExpenses(screen)
  if (data.kind === 'reports') buildReports(screen)
  return screen
}

function createStyle(existingStyles, name, font, size) {
  const style = existingStyles.find(item => item.name === name) || figma.createTextStyle()
  style.name = name
  style.fontName = font
  style.fontSize = size
  style.lineHeight = { unit: 'AUTO' }
  return style
}

function buildFoundations(parent) {
  const section = makeFrame(parent, '00 — Foundations & Components', 0, 0, 3040, 620, COLORS.white, 24)
  section.strokes = [solid(COLORS.slate200)]
  section.strokeWeight = 1
  makeText(section, 'Title', 'TransControl — Foundations', 48, 42, 32, COLORS.ink, 'bold')
  makeText(section, 'Description', 'Paleta, tipografia e componentes de referência. Todos os elementos são editáveis.', 48, 90, 13, COLORS.slate500, 'regular')
  makeText(section, 'Colors title', 'Cores', 48, 148, 16, COLORS.ink, 'bold')
  const palette = [
    ['Ink', COLORS.ink], ['Ocean', COLORS.ocean], ['Mist', COLORS.mist], ['White', COLORS.white],
    ['Slate 200', COLORS.slate200], ['Slate 500', COLORS.slate500], ['Emerald', COLORS.emerald], ['Amber', COLORS.amber], ['Red', COLORS.red],
  ]
  palette.forEach(([label, color], index) => {
    const swatch = makeFrame(section, `Color / ${label}`, 48 + index * 154, 184, 136, 104, COLORS.white, 12)
    swatch.strokes = [solid(COLORS.slate200)]
    swatch.strokeWeight = 1
    makeRect(swatch, 'Swatch', 8, 8, 120, 54, color, 8, color === COLORS.white ? COLORS.slate200 : null)
    makeText(swatch, 'Name', label, 10, 70, 10, COLORS.slate700, 'semibold')
    makeText(swatch, 'Hex', color, 10, 86, 8, COLORS.slate400, 'regular')
  })
  makeText(section, 'Typography title', 'Tipografia', 48, 330, 16, COLORS.ink, 'bold')
  makeText(section, 'Display sample', 'Visão geral da operação', 48, 370, 28, COLORS.ink, 'bold')
  makeText(section, 'Body sample', 'Inter Regular · Interface profissional, limpa e moderna.', 48, 418, 13, COLORS.slate500, 'regular')
  makeText(section, 'Components title', 'Componentes de referência', 48, 486, 16, COLORS.ink, 'bold')
  const primary = figma.createComponentFromNode(makeButton(section, 'Ação principal', 48, 526, true, 164))
  primary.name = 'Button / Primary'
  const secondary = figma.createComponentFromNode(makeButton(section, 'Ação secundária', 226, 526, false, 172))
  secondary.name = 'Button / Secondary'
  const available = figma.createComponentFromNode(makePill(section, 'Disponível', 420, 535, 'green'))
  available.name = 'Badge / Success'
  const progress = figma.createComponentFromNode(makePill(section, 'Em andamento', 520, 535, 'blue'))
  progress.name = 'Badge / Info'
  const maintenance = figma.createComponentFromNode(makePill(section, 'Manutenção', 640, 535, 'amber'))
  maintenance.name = 'Badge / Warning'
  const stat = figma.createComponentFromNode(makeStatCard(section, 820, 470, 330, 'Gasto com diesel', 'R$ 7.178,80', 'amber', 'D', '↓ 3,4% vs. mês anterior'))
  stat.name = 'Card / Stat'
  return section
}

async function main() {
  figma.notify('TransControl: carregando fontes...', { timeout: 2000 })
  await Promise.all(Object.values(FONT).map(font => figma.loadFontAsync(font)))

  let page = figma.root.children.find(item => item.name === 'TransControl — Editável')
  if (!page) {
    try {
      page = figma.createPage()
    } catch (_error) {
      page = figma.currentPage
    }
  }
  page.name = 'TransControl — Editável'
  await figma.setCurrentPageAsync(page)

  const previous = page.children.find(node => node.getPluginData('transcontrol-generator') === 'root')

  figma.notify('TransControl: criando fundações...', { timeout: 2000 })
  const root = makeFrame(page, 'TransControl — Design editável', 0, 0, 3040, 5200, COLORS.slate100, 0)
  root.setPluginData('transcontrol-generator', 'root')
  root.clipsContent = false
  buildFoundations(root)

  figma.notify('TransControl: criando as sete telas...', { timeout: 3000 })
  SCREEN_DATA.forEach((data, index) => {
    const column = index % 2
    const row = Math.floor(index / 2)
    buildScreen(root, data, column * 1600, 760 + row * 1100)
  })

  const existingStyles = await figma.getLocalTextStylesAsync()
  const styles = [
    createStyle(existingStyles, 'TransControl/Heading/Page', FONT.bold, 28),
    createStyle(existingStyles, 'TransControl/Heading/Section', FONT.bold, 16),
    createStyle(existingStyles, 'TransControl/Body/Default', FONT.regular, 13),
    createStyle(existingStyles, 'TransControl/Label/Default', FONT.semibold, 11),
  ]
  styles.forEach(style => style.description = 'Gerado pelo plugin TransControl. Pode ser editado livremente.')

  if (previous) previous.remove()
  figma.viewport.scrollAndZoomIntoView([root])
  figma.notify('TransControl editável criado com sucesso.')
  figma.closePlugin()
}

main().catch(error => {
  console.error(error)
  figma.notify(`Erro no TransControl: ${String(error.message || error).slice(0, 180)}`, {
    error: true,
    timeout: 10000,
  })
  figma.closePlugin(`Erro ao criar o TransControl: ${error.message}`)
})

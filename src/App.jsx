import { useState } from 'react'
import { Header, Sidebar } from './components/Layout'
import {
  expensesSeed,
  fuelsSeed,
  maintenancesSeed,
  tripsSeed,
  trucksSeed,
} from './data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage'
import Abastecimentos from './pages/Abastecimentos'
import Caminhoes from './pages/Caminhoes'
import Dashboard from './pages/Dashboard'
import GastosExtras from './pages/GastosExtras'
import Manutencoes from './pages/Manutencoes'
import Relatorios from './pages/Relatorios'
import Viagens from './pages/Viagens'

const pageTitles = {
  dashboard: 'Visão geral',
  caminhoes: 'Caminhões',
  viagens: 'Controle de viagens',
  abastecimentos: 'Abastecimentos',
  manutencoes: 'Manutenções',
  gastos: 'Gastos extras',
  relatorios: 'Relatórios',
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [trucks, setTrucks] = useLocalStorage('transcontrol-trucks', trucksSeed)
  const [trips, setTrips] = useLocalStorage('transcontrol-trips', tripsSeed)
  const [fuels, setFuels] = useLocalStorage('transcontrol-fuels', fuelsSeed)
  const [maintenances, setMaintenances] = useLocalStorage('transcontrol-maintenances', maintenancesSeed)
  const [expenses, setExpenses] = useLocalStorage('transcontrol-expenses', expensesSeed)
  const store = { trucks, trips, fuels, maintenances, expenses }

  const page = {
    dashboard: <Dashboard store={store} onNavigate={setActivePage} />,
    caminhoes: <Caminhoes data={trucks} setData={setTrucks} />,
    viagens: <Viagens data={trips} setData={setTrips} trucks={trucks} />,
    abastecimentos: <Abastecimentos data={fuels} setData={setFuels} trucks={trucks} />,
    manutencoes: <Manutencoes data={maintenances} setData={setMaintenances} trucks={trucks} />,
    gastos: <GastosExtras data={expenses} setData={setExpenses} trucks={trucks} />,
    relatorios: <Relatorios store={store} />,
  }[activePage]

  return (
    <div className="min-h-screen bg-mist">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <Header
        title={pageTitles[activePage]}
        onOpenMenu={() => setMenuOpen(true)}
        onSearch={(value) => {
          const match = Object.entries(pageTitles).find(([, title]) =>
            title.toLowerCase().includes(value.toLowerCase()),
          )
          if (value.length > 3 && match) setActivePage(match[0])
        }}
      />
      <main className="min-h-[calc(100vh-70px)] p-4 md:p-7 lg:ml-[244px] xl:p-8">
        <div className="mx-auto max-w-[1600px]">{page}</div>
      </main>
    </div>
  )
}

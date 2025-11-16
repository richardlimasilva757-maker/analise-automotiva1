'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Zap,
  Search,
  Car,
  Heart,
  Clock,
  Bell,
  User,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Wrench,
  BarChart3,
} from 'lucide-react'

type Vehicle = {
  id: string
  brand: string
  model: string
  year: number
  created_at: string
}

type Reminder = {
  id: string
  title: string
  description: string
  due_date: string
  completed: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    checkUser()
    loadDashboardData()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    setLoading(false)
  }

  const loadDashboardData = async () => {
    // Carregar veículos recentes
    const { data: vehiclesData } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (vehiclesData) setVehicles(vehiclesData)

    // Carregar lembretes pendentes
    const { data: remindersData } = await supabase
      .from('reminders')
      .select('*')
      .eq('completed', false)
      .order('due_date', { ascending: true })
      .limit(5)

    if (remindersData) setReminders(remindersData)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sense</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boas-vindas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-white/60">
            {user?.email}
          </p>
        </div>

        {/* Barra de pesquisa principal */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Pesquisar veículo (ex: Honda Civic 2020)"
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 pl-14 pr-32 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Analisar
            </button>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-white/60 text-sm mb-1">Veículos Analisados</p>
            <p className="text-3xl font-bold text-white">{vehicles.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">Favoritos</p>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">Lembretes Ativos</p>
            <p className="text-3xl font-bold text-white">{reminders.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">Checklists Completos</p>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Veículos recentes */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Veículos Recentes</h3>
              <button
                onClick={() => router.push('/search')}
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
              >
                Ver todos →
              </button>
            </div>

            {vehicles.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Nenhum veículo analisado ainda</p>
                <button
                  onClick={() => router.push('/search')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Analisar primeiro veículo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => router.push(`/vehicle/${vehicle.id}`)}
                    className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                          <Car className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <p className="text-white/60 text-sm">{vehicle.year}</p>
                        </div>
                      </div>
                      <div className="text-white/40 group-hover:text-white transition-colors">
                        →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lembretes */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Próximos Lembretes</h3>
              <Bell className="w-5 h-5 text-white/40" />
            </div>

            {reminders.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 text-sm">Nenhum lembrete ativo</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm mb-1">
                          {reminder.title}
                        </p>
                        <p className="text-white/60 text-xs">
                          {new Date(reminder.due_date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/search')}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-2xl p-6 border border-white/20 transition-all group"
          >
            <Search className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-semibold mb-1">Nova Análise</p>
            <p className="text-white/60 text-sm">Pesquisar veículo</p>
          </button>

          <button
            onClick={() => router.push('/favorites')}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-2xl p-6 border border-white/20 transition-all group"
          >
            <Heart className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-semibold mb-1">Favoritos</p>
            <p className="text-white/60 text-sm">Veículos salvos</p>
          </button>

          <button
            onClick={() => router.push('/history')}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-2xl p-6 border border-white/20 transition-all group"
          >
            <Clock className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-semibold mb-1">Histórico</p>
            <p className="text-white/60 text-sm">Pesquisas anteriores</p>
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-2xl p-6 border border-white/20 transition-all group"
          >
            <User className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-semibold mb-1">Perfil</p>
            <p className="text-white/60 text-sm">Configurações</p>
          </button>
        </div>
      </div>
    </div>
  )
}

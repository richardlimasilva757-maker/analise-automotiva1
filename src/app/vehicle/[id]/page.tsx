'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import {
  Zap,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Wrench,
  Heart,
  Share2,
} from 'lucide-react'

type ChecklistItem = {
  id: string
  title: string
  description: string
  completed: boolean
  completed_at?: string
}

type Checklist = {
  id: string
  type: '48h' | '30days' | 'longterm'
  items: ChecklistItem[]
}

export default function VehiclePage() {
  const router = useRouter()
  const params = useParams()
  const vehicleId = params.id as string

  const [loading, setLoading] = useState(true)
  const [vehicle, setVehicle] = useState<any>(null)
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [activeTab, setActiveTab] = useState<'48h' | '30days' | 'longterm'>('48h')

  useEffect(() => {
    loadVehicleData()
  }, [vehicleId])

  const loadVehicleData = async () => {
    try {
      // Carregar dados do veículo
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single()

      if (vehicleError) throw vehicleError
      setVehicle(vehicleData)

      // Carregar checklists
      const { data: checklistsData, error: checklistsError } = await supabase
        .from('checklists')
        .select('*')
        .eq('vehicle_id', vehicleId)

      if (checklistsError) throw checklistsError
      setChecklists(checklistsData || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleChecklistItem = async (checklistId: string, itemId: string) => {
    const checklist = checklists.find((c) => c.id === checklistId)
    if (!checklist) return

    const updatedItems = checklist.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completed_at: !item.completed ? new Date().toISOString() : undefined,
          }
        : item
    )

    // Atualizar no banco
    await supabase
      .from('checklists')
      .update({ items: updatedItems })
      .eq('id', checklistId)

    // Atualizar estado local
    setChecklists(
      checklists.map((c) =>
        c.id === checklistId ? { ...c, items: updatedItems } : c
      )
    )
  }

  const getChecklistProgress = (checklist: Checklist) => {
    const completed = checklist.items.filter((item) => item.completed).length
    const total = checklist.items.length
    return { completed, total, percentage: (completed / total) * 100 }
  }

  const getTabTitle = (type: string) => {
    switch (type) {
      case '48h':
        return 'Primeiras 48h'
      case '30days':
        return 'Primeiros 30 dias'
      case 'longterm':
        return 'Longo prazo'
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Carregando veículo...</p>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Veículo não encontrado</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-400 hover:text-blue-300"
          >
            Voltar ao dashboard
          </button>
        </div>
      </div>
    )
  }

  const analysis = vehicle.analysis || {}
  const currentChecklist = checklists.find((c) => c.type === activeTab)
  const progress = currentChecklist ? getChecklistProgress(currentChecklist) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sense</span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-white/60 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/60 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho do veículo */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            {vehicle.brand} {vehicle.model}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-lg">{vehicle.year}</span>
            {analysis.score && (
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-xl font-bold">{analysis.score}</span>
                <span className="text-white/60">/10</span>
              </div>
            )}
            {analysis.recommendation && (
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  analysis.worthIt
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {analysis.recommendation}
              </div>
            )}
          </div>
        </div>

        {/* Resumo rápido */}
        {analysis.summary && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
            <p className="text-white/90">{analysis.summary}</p>
          </div>
        )}

        {/* Tabs de checklist */}
        <div className="mb-6">
          <div className="flex gap-2 bg-white/5 rounded-2xl p-1 mb-6">
            {['48h', '30days', 'longterm'].map((type) => {
              const checklist = checklists.find((c) => c.type === type)
              const progress = checklist ? getChecklistProgress(checklist) : null

              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type as any)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === type
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-1">{getTabTitle(type)}</div>
                    {progress && (
                      <div className="text-xs opacity-80">
                        {progress.completed}/{progress.total}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Barra de progresso */}
          {progress && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Progresso</span>
                </div>
                <span className="text-white/60">
                  {progress.completed} de {progress.total} concluídos
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <p className="text-white/40 text-sm mt-2">
                {Math.round(progress.percentage)}% completo
              </p>
            </div>
          )}

          {/* Lista de itens do checklist */}
          {currentChecklist && (
            <div className="space-y-3">
              {currentChecklist.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(currentChecklist.id, item.id)}
                  className="w-full bg-white/10 backdrop-blur-xl hover:bg-white/15 rounded-2xl p-5 border border-white/20 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/30 group-hover:border-white/50'
                      }`}
                    >
                      {item.completed && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold mb-1 transition-all ${
                          item.completed
                            ? 'text-white/60 line-through'
                            : 'text-white group-hover:text-blue-400'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          item.completed ? 'text-white/40' : 'text-white/60'
                        }`}
                      >
                        {item.description}
                      </p>
                      {item.completed && item.completed_at && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            Concluído em{' '}
                            {new Date(item.completed_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!currentChecklist && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <Wrench className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">
                Nenhum checklist disponível para este período
              </p>
            </div>
          )}
        </div>

        {/* Informações adicionais */}
        {analysis.careTips && analysis.careTips.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold text-white">
                Cuidados Específicos deste Modelo
              </h3>
            </div>
            <ul className="space-y-2">
              {analysis.careTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-400 text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

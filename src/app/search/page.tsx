'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Zap,
  Search,
  Car,
  ArrowLeft,
  Loader2,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Fuel,
  Users,
  Shield,
  Wrench,
  Heart,
} from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [vehicleId, setVehicleId] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
    const query = searchParams.get('q')
    if (query) {
      parseQuery(query)
    }
  }, [searchParams])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
  }

  const parseQuery = (query: string) => {
    const parts = query.split(' ')
    if (parts.length >= 2) {
      setBrand(parts[0])
      setModel(parts.slice(1, -1).join(' '))
      setYear(parts[parts.length - 1])
    }
  }

  const handleSearch = async () => {
    if (!brand || !model || !year) {
      alert('Preencha todos os campos')
      return
    }

    setLoading(true)
    setAnalyzing(true)

    try {
      // Salvar no histórico
      await supabase.from('search_history').insert([
        {
          user_id: user.id,
          brand,
          model,
          year: parseInt(year),
        },
      ])

      // Simular análise com IA (aqui você integraria com OpenAI)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const mockAnalysis = {
        vehicle: `${brand} ${model} ${year}`,
        score: 8.5,
        recommendation: 'Recomendado',
        pros: [
          'Motor confiável e econômico',
          'Baixo custo de manutenção',
          'Boa retenção de valor',
          'Peças facilmente encontradas',
          'Consumo eficiente de combustível',
        ],
        cons: [
          'Suspensão pode apresentar desgaste',
          'Sistema elétrico requer atenção',
          'Ar condicionado pode precisar de recarga',
        ],
        commonIssues: [
          'Desgaste prematuro dos amortecedores',
          'Problemas no alternador após 80.000 km',
          'Vazamento de óleo em motores mais antigos',
        ],
        fuelConsumption: {
          city: '10.5 km/l',
          highway: '13.2 km/l',
        },
        maintenanceCost: 'Médio - R$ 800 a R$ 1.200/ano',
        targetAudience: 'Ideal para uso urbano e familiar',
        competitors: ['Toyota Corolla', 'Hyundai Elantra', 'Volkswagen Jetta'],
        worthIt: true,
        summary:
          'Veículo confiável com bom custo-benefício. Recomendado para quem busca economia e praticidade no dia a dia.',
        recalls: [
          {
            title: 'Recall de airbag',
            severity: 'Alta',
            status: 'Resolvido',
            description: 'Substituição do módulo do airbag',
          },
        ],
        careTips: [
          'Verificar suspensão a cada 10.000 km',
          'Trocar óleo a cada 5.000 km ou 6 meses',
          'Revisar sistema elétrico anualmente',
          'Calibrar pneus semanalmente',
        ],
      }

      setAnalysis(mockAnalysis)

      // Salvar veículo analisado
      const { data: vehicleData, error } = await supabase
        .from('vehicles')
        .insert([
          {
            user_id: user.id,
            brand,
            model,
            year: parseInt(year),
            analysis: mockAnalysis,
          },
        ])
        .select()
        .single()

      if (vehicleData) {
        setVehicleId(vehicleData.id)

        // Criar checklist padrão
        await createDefaultChecklists(vehicleData.id)
      }
    } catch (error) {
      console.error('Erro ao analisar:', error)
      alert('Erro ao analisar veículo')
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  const createDefaultChecklists = async (vehicleId: string) => {
    const checklists = [
      {
        vehicle_id: vehicleId,
        user_id: user.id,
        type: '48h',
        items: [
          {
            id: '1',
            title: 'Verificar nível de óleo',
            description: 'Conferir se o nível está adequado',
            completed: false,
          },
          {
            id: '2',
            title: 'Testar todos os faróis',
            description: 'Faróis, lanternas, setas e freio',
            completed: false,
          },
          {
            id: '3',
            title: 'Verificar pneus',
            description: 'Calibragem e desgaste',
            completed: false,
          },
          {
            id: '4',
            title: 'Testar ar condicionado',
            description: 'Verificar se está gelando adequadamente',
            completed: false,
          },
          {
            id: '5',
            title: 'Verificar documentação',
            description: 'CRLV, manual e chave reserva',
            completed: false,
          },
        ],
      },
      {
        vehicle_id: vehicleId,
        user_id: user.id,
        type: '30days',
        items: [
          {
            id: '1',
            title: 'Revisão completa da suspensão',
            description: 'Verificar amortecedores e molas',
            completed: false,
          },
          {
            id: '2',
            title: 'Alinhamento e balanceamento',
            description: 'Garantir estabilidade e economia',
            completed: false,
          },
          {
            id: '3',
            title: 'Verificar bateria',
            description: 'Testar carga e terminais',
            completed: false,
          },
          {
            id: '4',
            title: 'Trocar filtros',
            description: 'Ar, óleo e combustível',
            completed: false,
          },
        ],
      },
    ]

    for (const checklist of checklists) {
      await supabase.from('checklists').insert([checklist])
    }
  }

  const handleSaveFavorite = async () => {
    if (!vehicleId) return

    try {
      await supabase.from('favorites').insert([
        {
          user_id: user.id,
          vehicle_id: vehicleId,
        },
      ])
      alert('Veículo salvo nos favoritos!')
    } catch (error) {
      console.error('Erro ao salvar favorito:', error)
    }
  }

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
              <span>Voltar</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sense</span>
              </h1>
            </div>

            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysis ? (
          <>
            {/* Formulário de pesquisa */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Análise Automotiva com IA
              </h2>
              <p className="text-white/60">
                Digite os dados do veículo para análise completa
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Ex: Honda"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Ex: Civic"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Ano
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Ex: 2020"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analisando com IA...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Analisar Veículo
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Animação de scanner */}
            {analyzing && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                  <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-pulse delay-150" />
                  <Car className="absolute inset-0 m-auto w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Escaneando veículo...
                </h3>
                <p className="text-white/60">
                  Analisando dados técnicos, histórico e confiabilidade
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Resultado da análise */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setAnalysis(null)
                  setVehicleId(null)
                }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Nova análise
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {analysis.vehicle}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        analysis.worthIt
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {analysis.recommendation}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span className="text-2xl font-bold">{analysis.score}</span>
                      <span className="text-white/60">/10</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveFavorite}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                >
                  <Heart className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Resumo da Análise
                  </h3>
                  <p className="text-white/80">{analysis.summary}</p>
                </div>
              </div>
            </div>

            {/* Grid de informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Prós */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Pontos Positivos</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contras */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Pontos de Atenção</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Informações técnicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                <Fuel className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-white/60 text-sm mb-1">Consumo Cidade</p>
                <p className="text-white font-bold">{analysis.fuelConsumption.city}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                <Fuel className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-white/60 text-sm mb-1">Consumo Estrada</p>
                <p className="text-white font-bold">{analysis.fuelConsumption.highway}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                <DollarSign className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-white/60 text-sm mb-1">Custo Manutenção</p>
                <p className="text-white font-bold text-sm">{analysis.maintenanceCost}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                <Users className="w-8 h-8 text-orange-400 mb-2" />
                <p className="text-white/60 text-sm mb-1">Público Ideal</p>
                <p className="text-white font-bold text-sm">{analysis.targetAudience}</p>
              </div>
            </div>

            {/* Problemas comuns */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">Problemas Comuns</h3>
              </div>
              <ul className="space-y-2">
                {analysis.commonIssues.map((issue: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recalls */}
            {analysis.recalls.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Recalls</h3>
                </div>
                <div className="space-y-3">
                  {analysis.recalls.map((recall: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold">{recall.title}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            recall.status === 'Resolvido'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {recall.status}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mb-1">{recall.description}</p>
                      <p className="text-white/40 text-xs">
                        Gravidade: {recall.severity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cuidados específicos */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Cuidados Recomendados</h3>
              </div>
              <ul className="space-y-2">
                {analysis.careTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push(`/vehicle/${vehicleId}`)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
              >
                Ver Checklist Completo
              </button>
              <button
                onClick={() => {
                  setAnalysis(null)
                  setVehicleId(null)
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl border border-white/20 transition-all"
              >
                Nova Análise
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

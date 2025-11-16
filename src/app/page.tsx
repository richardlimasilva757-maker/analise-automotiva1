'use client'

import { useRouter } from 'next/navigation'
import {
  Zap,
  Search,
  Brain,
  Shield,
  CheckCircle2,
  Bell,
  BarChart3,
  Heart,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  ArrowRight,
  Car,
  Wrench,
  AlertTriangle,
} from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sense</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 text-white/80 hover:text-white transition-colors font-medium"
              >
                Entrar
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-white/80 text-sm font-medium">
              Análise Automotiva com Inteligência Artificial
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Descubra a verdade
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              sobre qualquer carro
            </span>
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Entre em um universo tecnológico onde IA avançada analisa veículos em segundos.
            Checklist inteligente, alertas de recalls e cuidados personalizados para você
            tomar a decisão certa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Começar Análise Grátis
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              Ver Funcionalidades
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/60">Precisão da IA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-white/60">Veículos Analisados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/60">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Funcionalidades Futuristas
            </h3>
            <p className="text-white/60 text-lg">
              Tudo que você precisa para tomar a decisão certa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Pesquisa Inteligente</h4>
              <p className="text-white/60 leading-relaxed">
                Digite marca, modelo e ano. Nossa IA consulta bases técnicas e gera análise
                completa em segundos com animação de scanner futurista.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Análise com IA</h4>
              <p className="text-white/60 leading-relaxed">
                Prós, contras, problemas comuns, consumo, custo de manutenção, público ideal
                e comparação com concorrentes. Tudo em linguagem simples.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Cuidados e Alertas</h4>
              <p className="text-white/60 leading-relaxed">
                Defeitos recorrentes, pontos de atenção, peças a observar e histórico de
                problemas conhecidos do modelo específico.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-red-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Verificação de Recalls</h4>
              <p className="text-white/60 leading-relaxed">
                Histórico completo de recalls, campanhas abertas, gravidade, como resolver e
                links oficiais para consulta.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Checklist Pós-Compra</h4>
              <p className="text-white/60 leading-relaxed">
                Checklist de 48h, 30 dias e longo prazo. Sistema de progresso, etapas
                concluídas e cronograma por quilometragem.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Lembretes Inteligentes</h4>
              <p className="text-white/60 leading-relaxed">
                Notificações automáticas de troca de óleo, pneus, bateria e manutenção
                preventiva. IA ajusta com base no uso do carro.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-pink-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Comparador de Veículos</h4>
              <p className="text-white/60 leading-relaxed">
                Compare 2 a 5 modelos lado a lado. Gráficos de consumo, prós e contras,
                confiabilidade e custos. IA sugere o melhor para você.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-yellow-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Favoritos e Histórico</h4>
              <p className="text-white/60 leading-relaxed">
                Salve carros analisados, crie listas personalizadas e acesse rapidamente o
                checklist de cada veículo.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-indigo-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Dashboard Inteligente</h4>
              <p className="text-white/60 leading-relaxed">
                Status do carro, próxima manutenção, problemas detectados, recomendações
                personalizadas e pontuação de saúde do veículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Como Funciona na Prática
            </h3>
            <p className="text-white/60 text-lg">
              Jornada completa do usuário em 8 etapas simples
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Search,
                title: 'Digite o veículo',
                description: 'Marca, modelo e ano do carro que você quer analisar',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Sparkles,
                title: 'IA analisa em segundos',
                description: 'Scanner futurista processa dados técnicos e histórico',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Brain,
                title: 'Receba análise completa',
                description: 'Prós, contras, problemas comuns e recomendações',
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: Shield,
                title: 'Verifique recalls',
                description: 'Campanhas abertas, gravidade e como resolver',
                color: 'from-red-500 to-pink-500',
              },
              {
                icon: CheckCircle2,
                title: 'Acesse checklist pós-compra',
                description: 'Guia completo de 48h, 30 dias e longo prazo',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Bell,
                title: 'Configure lembretes',
                description: 'Notificações automáticas de manutenção',
                color: 'from-cyan-500 to-blue-500',
              },
              {
                icon: Heart,
                title: 'Salve nos favoritos',
                description: 'Crie listas personalizadas de veículos',
                color: 'from-pink-500 to-purple-500',
              },
              {
                icon: TrendingUp,
                title: 'Acompanhe no dashboard',
                description: 'Status, saúde do veículo e próximas ações',
                color: 'from-indigo-500 to-purple-500',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white/40 font-bold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="text-xl font-bold text-white">{step.title}</h4>
                    </div>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-4">
              Pronto para descobrir a verdade?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Entre no universo DriveSense e tome decisões inteligentes sobre veículos com
              o poder da Inteligência Artificial.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 inline-flex items-center gap-3"
            >
              <Zap className="w-6 h-6" />
              Começar Agora Grátis
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                Drive<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sense</span>
              </span>
            </div>
            <p className="text-white/60 text-sm">
              © 2024 DriveSense. Análise automotiva com IA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

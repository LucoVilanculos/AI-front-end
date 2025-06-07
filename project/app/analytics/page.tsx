'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Target, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AnalyticsPage() {
  const productivityData = [
    { day: 'Seg', tasks: 8, time: 6.5 },
    { day: 'Ter', tasks: 12, time: 8.2 },
    { day: 'Qua', tasks: 10, time: 7.1 },
    { day: 'Qui', tasks: 15, time: 9.3 },
    { day: 'Sex', tasks: 11, time: 7.8 },
    { day: 'Sáb', tasks: 6, time: 4.2 },
    { day: 'Dom', tasks: 4, time: 2.5 }
  ];

  const voiceUsageData = [
    { month: 'Jan', commands: 45 },
    { month: 'Fev', commands: 78 },
    { month: 'Mar', commands: 92 },
    { month: 'Abr', commands: 156 },
    { month: 'Mai', commands: 203 },
    { month: 'Jun', commands: 287 }
  ];

  const stats = [
    {
      title: 'Produtividade Geral',
      value: '94%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Tarefas Completadas',
      value: '156',
      change: '+18%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-400'
    },
    {
      title: 'Tempo Economizado',
      value: '24.5h',
      change: '+8%',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-400'
    },
    {
      title: 'Comandos de Voz',
      value: '287',
      change: '+41%',
      trend: 'up',
      icon: Activity,
      color: 'text-pink-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-6 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Acompanhe sua produtividade e uso da Sexta-feira
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 hover:neon-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.color}`}>
                  {stat.change} desde o mês passado
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Productivity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Produtividade Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Tarefas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Horas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voice Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-pink-400" />
                Uso de Comandos de Voz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={voiceUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Bar 
                    dataKey="commands" 
                    fill="url(#gradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Insights da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Pontos Fortes</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Maior produtividade nas quintas-feiras</span>
                  </div>
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Uso consistente de comandos de voz</span>
                  </div>
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Tempo de resposta otimizado</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-400">Oportunidades</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Aumentar uso nos fins de semana</span>
                  </div>
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Explorar novos comandos de voz</span>
                  </div>
                  <div className="flex items-center gap-3 glass-effect p-3 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Automatizar mais tarefas rotineiras</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
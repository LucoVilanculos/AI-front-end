'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles,
  MessageCircle,
  Zap,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/contexts/user-context';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useUser();

  const stats = [
    {
      title: 'Tarefas Concluídas',
      value: '24',
      change: '+18% esta semana',
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      title: 'Tempo Economizado',
      value: '3.2h',
      change: 'Hoje',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      title: 'Produtividade',
      value: '94%',
      change: '+12% este mês',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      title: 'Comandos de Voz',
      value: '156',
      change: 'Esta semana',
      icon: MessageCircle,
      color: 'text-pink-400'
    }
  ];

  const quickActions = [
    {
      title: 'Nova Tarefa',
      description: 'Adicione uma nova tarefa rapidamente',
      icon: CheckCircle2,
      action: () => {}
    },
    {
      title: 'Agendar Reunião',
      description: 'Marque um compromisso no calendário',
      icon: Calendar,
      action: () => {}
    },
    {
      title: 'Chat com IA',
      description: 'Converse com a Sexta-feira',
      icon: MessageCircle,
      href: '/chat'
    },
    {
      title: 'Configurações',
      description: 'Personalize sua experiência',
      icon: Sparkles,
      href: '/settings'
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bem-vindo de volta, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Aqui está o resumo da sua produtividade hoje
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full hologram-effect flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Sexta-feira</p>
              <p className="text-xs text-muted-foreground">Online e pronta</p>
            </div>
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
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.href ? (
                    <Link href={action.href}>
                      <div className="glass-effect p-4 rounded-lg cursor-pointer hover:border-purple-400/50 transition-all duration-200 group">
                        <action.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={action.action}
                      className="glass-effect p-4 rounded-lg cursor-pointer hover:border-purple-400/50 transition-all duration-200 group"
                    >
                      <action.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Tarefa "Revisar relatório" concluída',
                  time: '2 minutos atrás',
                  icon: CheckCircle2,
                  color: 'text-green-400'
                },
                {
                  action: 'Comando de voz: "Agendar reunião"',
                  time: '15 minutos atrás',
                  icon: MessageCircle,
                  color: 'text-blue-400'
                },
                {
                  action: 'Lembrete configurado para 16:00',
                  time: '1 hora atrás',
                  icon: Clock,
                  color: 'text-purple-400'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 glass-effect rounded-lg">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
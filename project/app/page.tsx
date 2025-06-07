'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Brain, Mic, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: 'Inteligência Artificial Avançada',
      description: 'Assistente pessoal com IA de última geração, pronto para ajudar em todas as suas tarefas.'
    },
    {
      icon: Mic,
      title: 'Comando de Voz',
      description: 'Controle total por voz. Fale naturalmente e seja compreendido instantaneamente.'
    },
    {
      icon: Calendar,
      title: 'Gestão Inteligente',
      description: 'Organize suas tarefas, calendário e compromissos de forma inteligente e automatizada.'
    },
    {
      icon: Zap,
      title: 'Resposta Instantânea',
      description: 'Processamento ultra-rápido para respostas e ações em tempo real.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-6 m-6 rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full hologram-effect flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sexta-feira
              </h1>
              <p className="text-sm text-muted-foreground">Seu Assistente IA Pessoal</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" className="glass-effect">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            O Futuro da<br />Assistência Pessoal
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conheça a Sexta-feira, sua assistente de IA pessoal inspirada em J.A.R.V.I.S. 
            Controle total por voz, gestão inteligente de tarefas e muito mais.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4">
                Ativar Sexta-feira
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-effect p-6 rounded-xl hover:neon-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-effect p-12 rounded-2xl text-center"
        >
          <div className="w-24 h-24 rounded-full hologram-effect flex items-center justify-center mx-auto mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            "Olá! Eu sou a Sexta-feira"
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pronta para revolucionar sua produtividade. Fale comigo, organize suas tarefas, 
            gerencie seu calendário e acesse suas redes sociais - tudo através de comandos inteligentes.
          </p>
          <Link href="/chat">
            <Button size="lg" variant="outline" className="glass-effect hover:neon-glow">
              Conversar Agora
              <Mic className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="glass-effect p-6 m-6 rounded-2xl text-center">
        <p className="text-muted-foreground">
          © 2024 Sexta-feira AI. Desenvolvido para o futuro da assistência pessoal.
        </p>
      </footer>
    </div>
  );
}
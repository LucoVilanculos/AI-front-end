'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  Settings, 
  BarChart3, 
  User,
  Zap,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/lib/contexts/user-context';

const navigation = [
  { name: 'Principal', href: '/dashboard', icon: Home },
  { name: 'Chat IA', href: '/chat', icon: MessageCircle },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Dashboard', href: '/analytics', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="glass-effect fixed left-0 top-0 h-full w-64 p-6 z-50">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 rounded-full hologram-effect flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sexta-feira
          </h2>
          <p className="text-xs text-muted-foreground">IA Assistant</p>
        </div>
      </div>

      <div className="mb-6 p-4 glass-effect rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Olá, {user?.name || 'Usuário'}!</p>
            <p className="text-xs text-muted-foreground">Pronto para começar?</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 neon-glow' 
                    : 'hover:bg-white/5 hover:border-white/10 border border-transparent'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-purple-400' : 'text-muted-foreground group-hover:text-white'
                )} />
                <span className={cn(
                  'font-medium transition-colors',
                  isActive ? 'text-purple-400' : 'text-muted-foreground group-hover:text-white'
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-2 h-2 rounded-full bg-purple-400"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Status do Sistema</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Todos os sistemas operacionais</span>
          </div>
        </div>
      </div>
    </div>
  );
}
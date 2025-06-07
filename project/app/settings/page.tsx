'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Palette, 
  Volume2, 
  Globe, 
  Shield,
  Bell,
  Mic,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/lib/contexts/user-context';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { user, updatePreferences } = useUser();
  const { theme, setTheme } = useTheme();

  const settingSections = [
    {
      title: 'Perfil',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={user?.name || ''}
              className="glass-effect border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={user?.email || ''}
              className="glass-effect border-white/20"
              disabled
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            Salvar Alterações
          </Button>
        </div>
      )
    },
    {
      title: 'Aparência',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="glass-effect border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Animações</Label>
            <Switch id="animations" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="effects">Efeitos Visuais</Label>
            <Switch id="effects" defaultChecked />
          </div>
        </div>
      )
    },
    {
      title: 'Áudio e Voz',
      icon: Volume2,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice-enabled">Comando de Voz</Label>
              <p className="text-sm text-muted-foreground">Ativar reconhecimento de voz</p>
            </div>
            <Switch 
              id="voice-enabled" 
              checked={user?.preferences.voiceEnabled}
              onCheckedChange={(checked) => updatePreferences({ voiceEnabled: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="tts">Síntese de Voz</Label>
              <p className="text-sm text-muted-foreground">Sexta-feira falará as respostas</p>
            </div>
            <Switch id="tts" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Velocidade da Fala</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Lenta</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full relative">
                <div className="w-3/5 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
              <span className="text-sm">Rápida</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Idioma e Região',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select defaultValue="pt-BR">
              <SelectTrigger className="glass-effect border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fuso Horário</Label>
            <Select defaultValue="America/Sao_Paulo">
              <SelectTrigger className="glass-effect border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Sao_Paulo">Brasília (UTC-3)</SelectItem>
                <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: 'Privacidade',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-collection">Coleta de Dados</Label>
              <p className="text-sm text-muted-foreground">Permitir coleta para melhorar a IA</p>
            </div>
            <Switch id="data-collection" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics">Analytics</Label>
              <p className="text-sm text-muted-foreground">Compartilhar dados de uso anônimos</p>
            </div>
            <Switch id="analytics" />
          </div>
          <Button variant="outline" className="glass-effect">
            Exportar Meus Dados
          </Button>
        </div>
      )
    },
    {
      title: 'Notificações',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Notificações Push</Label>
              <p className="text-sm text-muted-foreground">Receber notificações do sistema</p>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">E-mail</Label>
              <p className="text-sm text-muted-foreground">Notificações por e-mail</p>
            </div>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound-notifications">Som</Label>
              <p className="text-sm text-muted-foreground">Alertas sonoros</p>
            </div>
            <Switch id="sound-notifications" defaultChecked />
          </div>
        </div>
      )
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Configurações
            </h1>
            <p className="text-muted-foreground">
              Personalize sua experiência com a Sexta-feira
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 hover:neon-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-purple-400" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-effect border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-red-400">Resetar Configurações</Label>
                <p className="text-sm text-muted-foreground">Restaurar todas as configurações padrão</p>
              </div>
              <Button variant="destructive">
                Resetar
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-red-400">Excluir Conta</Label>
                <p className="text-sm text-muted-foreground">Excluir permanentemente sua conta</p>
              </div>
              <Button variant="destructive">
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
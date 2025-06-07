'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const events = [
    {
      id: 1,
      title: 'Reunião de Equipe',
      time: '09:00',
      duration: '1h',
      type: 'meeting',
      location: 'Sala de Conferências',
      attendees: 5
    },
    {
      id: 2,
      title: 'Apresentação do Projeto',
      time: '14:30',
      duration: '2h',
      type: 'presentation',
      location: 'Auditório Principal',
      attendees: 12
    },
    {
      id: 3,
      title: 'Call com Cliente',
      time: '16:00',
      duration: '30min',
      type: 'call',
      location: 'Online',
      attendees: 3
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Calendário Inteligente
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus compromissos e eventos
              </p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth('prev')}
                      className="glass-effect"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth('next')}
                      className="glass-effect"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    const hasEvents = day.isCurrentMonth && day.date.getDate() === new Date().getDate();
                    
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all
                          ${day.isCurrentMonth ? 'text-foreground hover:bg-white/10' : 'text-muted-foreground'}
                          ${isToday ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold' : ''}
                          ${hasEvents && !isToday ? 'bg-purple-500/20 border border-purple-500/30' : ''}
                        `}
                      >
                        {day.date.getDate()}
                        {hasEvents && (
                          <div className="absolute mt-6 w-1 h-1 bg-purple-400 rounded-full" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect p-4 rounded-lg hover:border-purple-400/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${event.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${event.type === 'presentation' ? 'bg-purple-500/20 text-purple-400' : ''}
                          ${event.type === 'call' ? 'bg-green-500/20 text-green-400' : ''}
                        `}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{event.time} ({event.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} participantes</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle>Estatísticas da Semana</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de Eventos</span>
                  <span className="font-bold text-purple-400">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Horas Ocupadas</span>
                  <span className="font-bold text-blue-400">24h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reuniões</span>
                  <span className="font-bold text-green-400">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tempo Livre</span>
                  <span className="font-bold text-pink-400">16h</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
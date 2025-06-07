'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VoiceButton } from '@/components/ui/voice-button';
import { useUser } from '@/lib/contexts/user-context';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Eu sou a Sexta-feira, sua assistente pessoal de IA. Como posso ajudá-lo hoje?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Entendi, ${user?.name}! Vou processar sua solicitação sobre "${content}". Como sua assistente pessoal, estou aqui para ajudar com tarefas, agendamentos, lembretes e muito mais.`,
        'Essa é uma excelente pergunta! Baseado no contexto da nossa conversa, posso sugerir algumas abordagens para resolver isso de forma eficiente.',
        'Perfeito! Vou executar essa ação para você. Minha análise indica que essa é a melhor estratégia no momento.',
        'Compreendo sua necessidade. Como sua IA pessoal, posso não apenas responder mas também tomar ações práticas para ajudá-lo.'
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleVoiceInput = (transcript: string) => {
    sendMessage(transcript);
  };

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-6 rounded-2xl mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full hologram-effect flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chat com Sexta-feira
            </h1>
            <p className="text-muted-foreground">
              Sua assistente IA está online e pronta para ajudar
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 glass-effect rounded-2xl p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'hologram-effect'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] ${
                  message.role === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`glass-effect p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30' 
                      : 'border-purple-500/30'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full hologram-effect flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass-effect p-4 rounded-2xl border-purple-500/30">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1, 
                        delay: i * 0.2 
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem ou use o comando de voz..."
                className="glass-effect border-white/20 focus:border-purple-400 pr-12"
                disabled={isLoading}
              />
              <VoiceButton 
                onVoiceEnd={handleVoiceInput}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8"
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mic className="w-3 h-3" />
              <span>Pressione o microfone para falar</span>
            </div>
            <div className="flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              <span>Respostas com áudio ativadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
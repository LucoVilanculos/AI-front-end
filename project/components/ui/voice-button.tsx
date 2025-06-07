'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from './button';

interface VoiceButtonProps {
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onSpeak?: (text: string) => void;
  className?: string;
}

export function VoiceButton({ onVoiceStart, onVoiceEnd, onSpeak, className }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';

      recognition.onstart = () => {
        setIsListening(true);
        onVoiceStart?.();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onVoiceEnd?.(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      onSpeak?.(text);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={startListening}
          disabled={isListening}
          variant={isListening ? "default" : "outline"}
          size="icon"
          className={`relative ${className} ${isListening ? 'neon-glow' : ''}`}
        >
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Mic className="w-4 h-4" />
            </motion.div>
          ) : (
            <MicOff className="w-4 h-4" />
          )}
        </Button>
      </motion.div>

      {isSpeaking && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="flex items-center gap-1"
        >
          <Volume2 className="w-4 h-4 text-purple-400" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-purple-400 rounded-full voice-wave"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
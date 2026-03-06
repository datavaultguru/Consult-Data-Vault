import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Zap, Search, MapPin, BrainCircuit } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

type ChatMode = 'expert' | 'fast' | 'search' | 'maps';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('expert');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hi! I'm the DataVault Guru AI assistant. How can I help you with your data analytics or business intelligence needs today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let modelName = 'gemini-3.1-pro-preview';
      let config: any = {};

      if (mode === 'fast') {
        modelName = 'gemini-3.1-flash-lite-preview';
      } else if (mode === 'search') {
        modelName = 'gemini-3-flash-preview';
        config = { tools: [{ googleSearch: {} }] };
      } else if (mode === 'maps') {
        modelName = 'gemini-2.5-flash';
        config = { tools: [{ googleMaps: {} }] };
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are an AI assistant for DataVault Guru, a premium Data Analytics & Business Intelligence Consulting firm. You help small and medium businesses understand how data can improve their decisions. Be professional, concise, and helpful. User question: ${input}` }]
          }
        ],
        ...(Object.keys(config).length > 0 ? { config } : {})
      });

      let responseText = response.text || "I'm sorry, I couldn't process that request.";

      // Extract Maps URLs if present
      if (mode === 'maps' && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const chunks = response.candidates[0].groundingMetadata.groundingChunks;
        const urls: string[] = [];
        chunks.forEach((chunk: any) => {
          if (chunk.maps?.uri) {
            urls.push(`[${chunk.maps.title || 'View on Maps'}](${chunk.maps.uri})`);
          }
        });
        if (urls.length > 0) {
          responseText += "\n\n**Locations Found:**\n" + urls.join('\n');
        }
      }

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: "I'm experiencing some technical difficulties. Please try again later or contact us directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-900/20 flex items-center justify-center"
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col bg-slate-950 border-b border-slate-800">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">DataVault AI</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex px-2 pb-2 gap-1 overflow-x-auto scrollbar-hide">
                <Button
                  variant={mode === 'expert' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setMode('expert')}
                  className={`text-xs h-7 px-2 ${mode === 'expert' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  <BrainCircuit className="h-3 w-3 mr-1" /> Expert
                </Button>
                <Button
                  variant={mode === 'fast' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setMode('fast')}
                  className={`text-xs h-7 px-2 ${mode === 'fast' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  <Zap className="h-3 w-3 mr-1" /> Fast
                </Button>
                <Button
                  variant={mode === 'search' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setMode('search')}
                  className={`text-xs h-7 px-2 ${mode === 'search' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  <Search className="h-3 w-3 mr-1" /> Web
                </Button>
                <Button
                  variant={mode === 'maps' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setMode('maps')}
                  className={`text-xs h-7 px-2 ${mode === 'maps' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  <MapPin className="h-3 w-3 mr-1" /> Local
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-sm'
                        : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about data analytics..."
                  className="flex-1 bg-slate-900 border-slate-700 focus-visible:ring-indigo-500 rounded-full px-4"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Bot, User, AlertCircle, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getGeminiResponse } from "@/lib/gemini";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! I am your AI Election Assistant. How can I help you with your voting journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text.trim() }]);
    setIsLoading(true);

    try {
      const systemInstruction = "You are VoteWise AI, an expert, neutral, and beginner-friendly AI Election Assistant. Your goal is to help citizens understand the election process, voting procedures, and requirements. Provide clear, step-by-step, bulleted responses in simple language.";
      const reply = await getGeminiResponse(text.trim(), systemInstruction);
      setMessages(prev => [...prev, { role: "ai", content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I am having trouble connecting to the network right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const toggleListen = () => {
    if (isListening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => {
        sendMessage(transcript);
      }, 300);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const suggestedPrompts = [
    "How do I register to vote?",
    "What documents are required?",
    "How does an EVM work?",
    "Where is my polling booth?"
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 inline-flex items-center gap-2">
          <Bot className="text-blue-400 w-8 h-8" />
          AI Election Assistant
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Ask me anything about voting, elections, and voter rights.</p>
      </div>

      <Card className="flex-1 glass border-white/10 flex flex-col overflow-hidden mb-4 relative shadow-2xl">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'glass border border-white/5 text-gray-200 rounded-bl-none group relative'}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                {msg.role === 'ai' && (
                  <button 
                    onClick={() => copyToClipboard(msg.content, idx)}
                    className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer"
                    title="Copy response"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                  </button>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl glass border border-white/5 text-gray-400 rounded-bl-none flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="p-4 flex flex-wrap gap-2 justify-center absolute bottom-20 w-full">
            {suggestedPrompts.map((prompt, i) => (
              <button 
                key={i}
                onClick={() => setInput(prompt)}
                suppressHydrationWarning
                className="text-xs bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/30 text-blue-200 px-3 py-1.5 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-2 relative">
            <Button 
              onClick={toggleListen}
              variant="ghost" 
              size="icon" 
              suppressHydrationWarning
              className={`shrink-0 hidden sm:flex transition-colors ${isListening ? 'text-red-400 bg-red-400/10 animate-pulse' : 'text-gray-400 hover:text-white'}`}
            >
              <Mic className="w-5 h-5" />
            </Button>
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-14 right-16 flex items-center justify-center gap-2 h-12 z-10 bg-red-500/10 backdrop-blur-md rounded-full border border-red-500/30 overflow-hidden"
              >
                <span className="text-red-400 text-sm font-medium mr-2 animate-pulse">Listening...</span>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-red-400 rounded-full"
                    animate={{ height: ["8px", "24px", "8px"] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>
            )}
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              suppressHydrationWarning
              placeholder="Ask me about the election..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-full px-4 h-12"
              disabled={isListening}
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-full h-12 w-12 shrink-0 bg-blue-600 hover:bg-blue-500"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
        <AlertCircle className="w-3 h-3" /> Note: AI can make mistakes. Always verify important information with official ECI sources.
      </p>
    </div>
  );
}

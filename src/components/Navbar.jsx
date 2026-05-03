"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Mic, ShieldCheck, Home, Map, BookOpen, User } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            VoteWise AI
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><Home className="w-4 h-4"/> Home</Link>
          <Link href="/chat" className="hover:text-white transition-colors flex items-center gap-2"><Mic className="w-4 h-4"/> AI Assistant</Link>
          <Link href="/journey" className="hover:text-white transition-colors flex items-center gap-2"><Map className="w-4 h-4"/> Journey</Link>
          <Link href="/learning" className="hover:text-white transition-colors flex items-center gap-2"><BookOpen className="w-4 h-4"/> Learn</Link>
          <Link href="/fact-checker" className="hover:text-white transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Fact Check</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="outline" className="hidden sm:flex border-white/20 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all glass gap-2">
              <User className="w-4 h-4"/> Profile
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

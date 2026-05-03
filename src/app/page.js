"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, ShieldAlert, BookOpen, MapPin, Users, Globe2, ChevronRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI Election Assistant",
      desc: "Conversational guidance for all your election queries in multiple languages.",
      icon: <Mic className="h-8 w-8 text-blue-400" />,
      href: "/chat"
    },
    {
      title: "Personalized Voter Journey",
      desc: "A smart onboarding flow that creates a custom roadmap to voting day.",
      icon: <MapPin className="h-8 w-8 text-indigo-400" />,
      href: "/journey"
    },
    {
      title: "Interactive Learning Hub",
      desc: "Learn about democracy, EVMs, and voting rights through engaging modules.",
      icon: <BookOpen className="h-8 w-8 text-emerald-400" />,
      href: "/learning"
    },
    {
      title: "AI Fact Checker",
      desc: "Detect misinformation, verify political claims, and stay informed with truth.",
      icon: <ShieldAlert className="h-8 w-8 text-red-400" />,
      href: "/fact-checker"
    },
    {
      title: "Mock Voting Simulator",
      desc: "Experience the polling process realistically to build confidence.",
      icon: <Users className="h-8 w-8 text-purple-400" />,
      href: "/simulator"
    },
    {
      title: "Multilingual Support",
      desc: "Seamless language switching to make elections accessible to everyone.",
      icon: <Globe2 className="h-8 w-8 text-cyan-400" />,
      href: "/"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Empowering Citizens with AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-blue-500">
            Making Elections Simple, <br className="hidden md:block"/>
            <span className="text-blue-400">Accessible, and Intelligent.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
            VoteWise AI empowers citizens with personalized election guidance, AI-powered assistance, multilingual support, and misinformation detection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/journey">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse-glow">
                Start Your Voting Journey <ChevronRight className="ml-2 w-5 h-5"/>
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-white/20 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all glass text-white">
                Talk to AI Assistant <Mic className="ml-2 w-5 h-5"/>
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Overview */}
      <section className="w-full py-24 px-4 bg-black/40 border-t border-white/5 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Platform Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover how our AI-driven features simplify the election process.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full glass border-2 border-indigo-400/50 hover:border-indigo-400 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardContent className="p-8 flex flex-col items-start text-left">
                      <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

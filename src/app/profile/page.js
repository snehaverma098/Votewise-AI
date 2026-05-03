"use client";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, Award, ShieldCheck, Mail, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const user = {
    name: "Alex Citizen",
    email: "alex.citizen@example.com",
    state: "Maharashtra",
    dob: "12 May 2004 (Age: 22)",
    status: "Verified Voter"
  };

  const badges = [
    { title: "First-Time Voter", icon: <Award className="w-6 h-6 text-yellow-400"/>, desc: "Ready to make an impact" },
    { title: "Quiz Master", icon: <ShieldCheck className="w-6 h-6 text-emerald-400"/>, desc: "Scored 5/5 in Knowledge Check" },
    { title: "Truth Seeker", icon: <CheckCircle2 className="w-6 h-6 text-blue-400"/>, desc: "Fact-checked 3 claims" }
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 h-[calc(100vh-64px)]">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <User className="text-blue-400 w-8 h-8" />
          Voter Profile
        </h1>
        <Button variant="outline" className="glass border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer">
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: ID Card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <Card className="glass border-white/10 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border-b border-white/10"></div>
            <CardContent className="p-6 pt-12 text-center relative z-10">
              <div className="w-24 h-24 mx-auto bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center mb-4 shadow-xl">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20 mb-6">
                <ShieldCheck className="w-3 h-3" /> {user.status}
              </span>

              <div className="space-y-4 text-left border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">{user.state}, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">{user.dob}</span>
                </div>
              </div>

              <Button className="w-full mt-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer transition-colors">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Achievements & Activity */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
          
          {/* Progress / Activity */}
          <Card className="glass border-white/10 shadow-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Your Voting Journey</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <p className="text-sm text-gray-400 mb-1">Modules Learned</p>
                  <p className="text-3xl font-bold text-blue-400">4<span className="text-lg text-gray-500">/6</span></p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <p className="text-sm text-gray-400 mb-1">Quizzes Passed</p>
                  <p className="text-3xl font-bold text-emerald-400">1</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <p className="text-sm text-gray-400 mb-1">Upcoming Election</p>
                  <p className="text-xl font-bold text-orange-400 mt-2">24 Days Left</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Achievements & Badges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 glass border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 shadow-lg">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100">{badge.title}</h4>
                    <p className="text-xs text-gray-400">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

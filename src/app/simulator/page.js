"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Fingerprint, Box, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Simulator() {
  const [step, setStep] = useState(0);
  const [votedFor, setVotedFor] = useState(null);

  const steps = [
    { title: "Polling Station Entry", icon: <Users className="w-12 h-12 text-blue-400"/>, desc: "Join the queue and wait for your turn. Keep your Voter Slip and ID ready." },
    { title: "Identity Verification", icon: <Fingerprint className="w-12 h-12 text-indigo-400"/>, desc: "The Polling Officer verifies your identity against the electoral roll and inks your finger." },
    { title: "EVM Interaction", icon: <Box className="w-12 h-12 text-purple-400"/>, desc: "Proceed to the voting compartment. Press the blue button next to your chosen candidate." },
    { title: "Vote Confirmation", icon: <CheckCircle className="w-12 h-12 text-emerald-400"/>, desc: "Hear the beep and verify your vote on the VVPAT machine for 7 seconds." }
  ];

  const candidates = [
    { id: 1, name: "Candidate A", party: "Party 1", symbol: "☀️" },
    { id: 2, name: "Candidate B", party: "Party 2", symbol: "🌷" },
    { id: 3, name: "Candidate C", party: "Party 3", symbol: "✋" },
    { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Mock Voting Simulator</h1>
        <p className="text-gray-400 mt-2">Experience a realistic walkthrough of the polling process.</p>
      </div>

      <div className="w-full flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
        </div>
        {steps.map((s, i) => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= i ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-gray-800 text-gray-500 border border-white/10'}`}>
            {i + 1}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-2xl"
        >
          {step < 2 && (
            <div className="glass border-white/10 rounded-2xl p-8 text-center flex flex-col items-center">
              <div className="mb-6 p-6 rounded-full bg-white/5 border border-white/10">
                {steps[step].icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
              <p className="text-gray-300 mb-8">{steps[step].desc}</p>
              <Button onClick={() => setStep(step + 1)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8">
                Proceed to Next Step <ArrowRight className="ml-2 w-4 h-4"/>
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="glass border-white/10 rounded-2xl p-8 bg-gray-900 border-[8px] border-gray-800 shadow-2xl relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono tracking-widest">BALLOT UNIT</div>
              <div className="mt-6 space-y-4">
                {candidates.map(c => (
                  <div key={c.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-white text-black rounded text-xl">{c.symbol}</div>
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.party}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${votedFor === c.id ? 'bg-red-500 border-red-500 shadow-[0_0_10px_red]' : 'border-gray-600'}`}></div>
                      <button 
                        onClick={() => {
                          setVotedFor(c.id);
                          setTimeout(() => setStep(3), 1500);
                        }}
                        disabled={votedFor !== null}
                        className="w-12 h-8 bg-blue-600 rounded shadow-md hover:bg-blue-500 active:bg-blue-700 transition-colors"
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass border-white/10 rounded-2xl p-8 text-center flex flex-col items-center border-t-4 border-emerald-500">
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto animate-pulse-glow" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Vote Cast Successfully!</h2>
              <p className="text-gray-300 mb-6">A long beep sound confirms your vote. The VVPAT printed a slip which was visible for 7 seconds before dropping into the secure box.</p>
              
              <div className="bg-black/50 border border-white/10 p-4 rounded-lg w-64 h-32 flex items-center justify-center relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{candidates.find(c => c.id === votedFor)?.symbol}</div>
                  <div className="text-sm font-bold text-white">{candidates.find(c => c.id === votedFor)?.name}</div>
                </div>
              </div>

              <Button onClick={() => { setStep(0); setVotedFor(null); }} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Restart Simulation
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

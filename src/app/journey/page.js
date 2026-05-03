"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Circle, ArrowRight, MapPin, Map } from "lucide-react";

export default function VoterJourney() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    isFirstTime: null,
    state: "",
    ageGroup: ""
  });

  const [completedSteps, setCompletedSteps] = useState([0]);

  const roadmapSteps = [
    { title: "Register to Vote", desc: "Complete Form 6 to register your name in the electoral roll." },
    { title: "Verify Voter ID", desc: "Check your name in the voter list online or via SMS." },
    { title: "Know Your Candidates", desc: "Research the candidates standing in your constituency." },
    { title: "Locate Polling Booth", desc: "Find the exact location of your assigned polling station." },
    { title: "Voting Day Checklist", desc: "Carry your Voter ID or valid identity proof to the booth." }
  ];

  const progressPercentage = Math.round((completedSteps.length / roadmapSteps.length) * 100);

  const toggleStep = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 inline-flex items-center gap-2 mb-4">
          <Map className="text-blue-400 w-8 h-8" />
          Personalized Voter Journey
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">Get a customized roadmap to ensure you are fully prepared for election day.</p>
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white">Let's personalize your experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Are you a first-time voter?</label>
                <div className="flex gap-4">
                  <Button 
                    variant={formData.isFirstTime === true ? "default" : "outline"} 
                    onClick={() => setFormData({...formData, isFirstTime: true})}
                    className="flex-1"
                  >Yes</Button>
                  <Button 
                    variant={formData.isFirstTime === false ? "default" : "outline"} 
                    onClick={() => setFormData({...formData, isFirstTime: false})}
                    className="flex-1"
                  >No</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Which state/region do you live in?</label>
                <Input 
                  placeholder="e.g. Maharashtra, California..." 
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <Button 
                onClick={handleNext} 
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={formData.isFirstTime === null || !formData.state}
              >
                Generate My Roadmap <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
          <Card className="glass border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">Your Election Roadmap</h2>
              <p className="text-blue-200 text-sm">
                Prepared for a {formData.isFirstTime ? "First-Time Voter" : "Voter"} in {formData.state}
              </p>
              <div className="mt-4 bg-white/10 rounded-full h-2 w-full overflow-hidden">
                <motion.div 
                  className="bg-blue-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">{progressPercentage}% Completed</p>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {roadmapSteps.map((s, i) => {
                  const isCompleted = completedSteps.includes(i);
                  return (
                    <div 
                      key={i} 
                      onClick={() => toggleStep(i)}
                      className="p-6 flex gap-4 items-start hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="mt-0.5">
                        {isCompleted ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                          </motion.div>
                        ) : (
                          <Circle className="w-6 h-6 text-gray-600 group-hover:text-gray-400 transition-colors" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold transition-colors ${isCompleted ? 'text-blue-400' : 'text-gray-200'}`}>{s.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                        {!isCompleted && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="mt-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStep(i);
                            }}
                          >
                            Mark as Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

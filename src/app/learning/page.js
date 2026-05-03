"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, FileText, Landmark, Vote, ShieldCheck, CheckCircle2, List, Info, AlertTriangle, X, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const questionPool = [
  { q: "What does EVM stand for?", options: ["Electronic Voting Machine", "Electrical Vote Maker", "Election Voting Model", "Electronic Verified Machine"], a: 0 },
  { q: "What does VVPAT do?", options: ["Connects EVM to the Internet", "Prints a slip to verify your vote", "Counts the votes automatically", "Registers new voters"], a: 1 },
  { q: "What is the minimum age to vote in India?", options: ["16 years", "18 years", "21 years", "25 years"], a: 1 },
  { q: "Which button on the EVM can you press if you don't want to vote for any candidate?", options: ["CANCEL", "NOTA", "REJECT", "BLANK"], a: 1 },
  { q: "What does the Control Unit (CU) of the EVM do?", options: ["Prints voter slips", "Allows the voter to press a button", "Controls the Ballot Unit & stores votes", "Connects to Wi-Fi"], a: 2 },
  { q: "What is Abraham Lincoln's definition of democracy?", options: ["Rule of the king", "Government of the people, by the people, for the people", "A system without laws", "Government by the wealthy"], a: 1 },
  { q: "Which part of the government is responsible for making laws?", options: ["The Executive", "The Judiciary", "The Legislature", "The Media"], a: 2 },
  { q: "Who enforces the Model Code of Conduct during elections?", options: ["The Police", "The Supreme Court", "The Election Commission", "The Prime Minister"], a: 2 },
  { q: "What is a 'Tendered Vote'?", options: ["A vote cast via email", "A vote cast if someone falsely voted in your name", "A cancelled vote", "A vote for NOTA"], a: 1 },
  { q: "Where are EVMs stored securely before the counting day?", options: ["Bank lockers", "Police stations", "Strong Rooms with 24/7 CCTV", "Election Commission Office"], a: 2 },
  { q: "What happens during 'Delimitation'?", options: ["Counting of votes", "Dividing areas into constituencies", "Registering candidates", "Campaigning begins"], a: 1 },
  { q: "Is the EVM connected to the internet?", options: ["Yes, for live tracking", "Yes, to sync data", "No, it is a standalone tamper-proof machine", "Only during vote counting"], a: 2 },
  { q: "Which of the following acts as the watchdog of democracy?", options: ["The Judiciary", "The Media", "The Election Commission", "The President"], a: 1 },
  { q: "How long is the VVPAT slip visible to the voter?", options: ["3 seconds", "7 seconds", "10 seconds", "15 seconds"], a: 1 },
  { q: "Who verifies the seals on the Control Unit before vote counting begins?", options: ["The Media", "Only the Election Commissioner", "Political party agents", "The local police"], a: 2 },
  { q: "Which pillar of democracy ensures justice?", options: ["The Legislature", "The Executive", "The Judiciary", "The Media"], a: 2 },
  { q: "What is the primary purpose of campaign period?", options: ["To register new voters", "For parties to present their manifestos to voters", "To count the votes", "To print ballot papers"], a: 1 },
  { q: "Which unit of EVM is kept inside the voting compartment?", options: ["Control Unit", "VVPAT", "Ballot Unit", "Display Unit"], a: 2 },
  { q: "What tracks election expenditure to prevent illegal money use?", options: ["The Election Commission", "The Supreme Court", "The State Police", "The Legislature"], a: 0 },
  { q: "As a voter, you have the 'Right to Know' about a candidate's what?", options: ["Favorite food", "Criminal records, assets, and education", "Family members' jobs", "Social media passwords"], a: 1 }
];

export default function LearningHub() {
  const [filter, setFilter] = useState("All");
  const [selectedModule, setSelectedModule] = useState(null);
  
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const startQuiz = () => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setCurrentQuizQuestions(shuffled.slice(0, 5));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizResult(null);
    setIsQuizActive(true);
  };

  const handleAnswer = (optionIndex) => setUserAnswers(prev => ({...prev, [currentQuestionIndex]: optionIndex}));
  const nextQuestion = () => { if (currentQuestionIndex < 4) setCurrentQuestionIndex(prev => prev + 1); };
  const prevQuestion = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1); };
  const finishQuiz = () => {
    let score = 0;
    currentQuizQuestions.forEach((q, idx) => { if (userAnswers[idx] === q.a) score++; });
    setQuizResult(score);
  };

  const getFeedbackMessage = (score) => {
    if (score >= 4) return { msg: score === 5 ? "Excellent!" : "Good!", color: "text-emerald-400", stroke: "stroke-emerald-400" };
    if (score === 3) return { msg: "Good Attempt!", color: "text-blue-400", stroke: "stroke-blue-400" };
    if (score === 2) return { msg: "Practice Needed", color: "text-yellow-400", stroke: "stroke-yellow-400" };
    if (score === 1) return { msg: "Revise Again", color: "text-orange-400", stroke: "stroke-orange-400" };
    return { msg: "Better luck next time!", color: "text-red-400", stroke: "stroke-red-400" };
  };

  const allModules = [
    { 
      title: "What is Democracy?", icon: <Landmark className="w-8 h-8 text-blue-400"/>, time: "5 min read", level: "Beginner",
      content: (
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">Democracy is a system of government by the whole population or all the eligible members of a state, typically through elected representatives.</p>
          <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl flex gap-3">
            <Info className="w-6 h-6 text-blue-400 shrink-0" />
            <p className="text-sm"><strong>Abraham Lincoln's Definition:</strong> "Government of the people, by the people, for the people."</p>
          </div>
          <h3 className="text-xl font-bold text-white mt-4">Key Pillars of Democracy</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/> <strong>The Executive:</strong> Implements laws and runs the government.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/> <strong>The Legislature:</strong> Makes the laws (Parliament / Assembly).</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/> <strong>The Judiciary:</strong> Interprets laws and ensures justice.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/> <strong>The Media:</strong> Acts as the watchdog of democracy.</li>
          </ul>
        </div>
      )
    },
    { 
      title: "How Elections Work", icon: <Vote className="w-8 h-8 text-indigo-400"/>, time: "10 min read", level: "Beginner",
      content: (
        <div className="space-y-6 text-gray-300">
          <p>Elections are the cornerstone of any democracy. Here is the simplified flow of how they are conducted:</p>
          <div className="space-y-4">
            {[
              { step: 1, title: "Delimitation & Voter Roll", desc: "Dividing areas into constituencies and updating the list of eligible voters." },
              { step: 2, title: "Notification & Nomination", desc: "Election dates are announced and candidates file their nomination papers." },
              { step: 3, title: "Campaigning", desc: "Political parties and candidates reach out to voters to present their manifestos." },
              { step: 4, title: "Polling Day", desc: "Citizens cast their votes secretly at designated polling stations using EVMs." },
              { step: 5, title: "Counting & Results", desc: "Votes are counted under strict security and winners are declared." }
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4 p-4 glass border-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300 shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      title: "Voter Rights & Duties", icon: <BookOpen className="w-8 h-8 text-emerald-400"/>, time: "7 min read", level: "Beginner",
      content: (
        <div className="space-y-6 text-gray-300">
          <p>As a voter, you don't just have the right to vote; you have several other rights designed to protect your freedom of choice.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
              <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Right to Know</h4>
              <p className="text-sm">You have the right to know the criminal records, financial assets, and educational qualifications of the candidates.</p>
            </div>
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
              <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Right NOT to Vote</h4>
              <p className="text-sm">You can choose NOTA (None of the Above) if you feel none of the candidates are suitable.</p>
            </div>
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl">
              <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2"><List className="w-4 h-4"/> Tendered Vote</h4>
              <p className="text-sm">If someone has already falsely voted in your name, you can still cast a 'Tendered Vote' using ballot paper.</p>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "What is an EVM?", icon: <FileText className="w-8 h-8 text-purple-400"/>, time: "8 min read", level: "Advanced",
      content: (
        <div className="space-y-6 text-gray-300">
          <p>The Electronic Voting Machine (EVM) is a simple, secure, and tamper-proof device used to record votes digitally.</p>
          <h3 className="text-xl font-bold text-white mt-6">Core Components</h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><FileText className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-white">Ballot Unit (BU)</h4>
                <p className="text-sm mt-1">Kept in the voting compartment. You press the blue button next to your candidate's symbol here.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="p-3 bg-green-500/20 rounded-lg text-green-400"><ShieldCheck className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-white">Control Unit (CU)</h4>
                <p className="text-sm mt-1">Kept with the Polling Officer. It controls the Ballot Unit and securely stores the votes.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400"><BookOpen className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-white">VVPAT</h4>
                <p className="text-sm mt-1">Voter Verifiable Paper Audit Trail. Prints a slip visible for 7 seconds so you can verify your vote.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "Vote Counting Process", icon: <Landmark className="w-8 h-8 text-orange-400"/>, time: "6 min read", level: "Advanced",
      content: (
        <div className="space-y-6 text-gray-300">
          <p>The counting process is highly secure and transparent, conducted in the presence of candidate representatives.</p>
          <div className="relative border-l-2 border-orange-500/50 pl-6 space-y-6 mt-4 ml-4">
            <div className="relative">
              <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-gray-900"></span>
              <h4 className="font-bold text-white">1. Secure Storage</h4>
              <p className="text-sm mt-1">EVMs are kept in heavily guarded "Strong Rooms" under 24/7 CCTV surveillance until counting day.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-gray-900"></span>
              <h4 className="font-bold text-white">2. Seal Verification</h4>
              <p className="text-sm mt-1">Before opening, the unique seals on the Control Unit are verified by political agents.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-gray-900"></span>
              <h4 className="font-bold text-white">3. Digital Tallying</h4>
              <p className="text-sm mt-1">The "Result" button is pressed on the Control Unit, which instantly displays the total votes per candidate.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-gray-900"></span>
              <h4 className="font-bold text-white">4. VVPAT Matching</h4>
              <p className="text-sm mt-1">Slips from randomly selected VVPAT machines are manually counted to double-check the EVM tally.</p>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "Election Commission Roles", icon: <ShieldCheck className="w-8 h-8 text-red-400"/>, time: "12 min read", level: "Advanced",
      content: (
        <div className="space-y-6 text-gray-300">
          <p>The Election Commission (EC) is an independent body responsible for administering all electoral processes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 glass border-red-500/20 rounded-xl hover:bg-white/5 transition-colors">
              <h4 className="font-bold text-red-400 mb-2">Model Code of Conduct</h4>
              <p className="text-sm">Enforces strict rules on political parties to ensure a level playing field. Prevents hate speech and misuse of government machinery.</p>
            </div>
            <div className="p-5 glass border-blue-500/20 rounded-xl hover:bg-white/5 transition-colors">
              <h4 className="font-bold text-blue-400 mb-2">Voter Registration</h4>
              <p className="text-sm">Maintains and updates the electoral rolls, ensuring all eligible citizens are registered.</p>
            </div>
            <div className="p-5 glass border-purple-500/20 rounded-xl hover:bg-white/5 transition-colors">
              <h4 className="font-bold text-purple-400 mb-2">Polling Logistics</h4>
              <p className="text-sm">Deploys millions of polling staff and security personnel to conduct voting safely across thousands of locations.</p>
            </div>
            <div className="p-5 glass border-emerald-500/20 rounded-xl hover:bg-white/5 transition-colors">
              <h4 className="font-bold text-emerald-400 mb-2">Monitoring Expenses</h4>
              <p className="text-sm">Tracks election expenditure by candidates to prevent the illegal use of money power.</p>
            </div>
          </div>
        </div>
      )
    },
  ];

  const filteredModules = allModules.filter(m => filter === "All" ? true : m.level === filter);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 inline-flex items-center gap-2 mb-4">
          <BookOpen className="text-emerald-400 w-8 h-8" />
          Interactive Learning Hub
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">Educate yourself on the democratic process, voting mechanisms, and your fundamental rights.</p>
      </div>

      <div className="flex gap-4 mb-8 justify-center">
        <button 
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${filter === "All" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "glass border-white/10 text-gray-300 hover:text-white"}`}>
          All Modules
        </button>
        <button 
          onClick={() => setFilter("Beginner")}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${filter === "Beginner" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "glass border-white/10 text-gray-300 hover:text-white"}`}>
          Beginner
        </button>
        <button 
          onClick={() => setFilter("Advanced")}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${filter === "Advanced" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "glass border-white/10 text-gray-300 hover:text-white"}`}>
          Advanced
        </button>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[250px]">
        <AnimatePresence>
          {filteredModules.map((mod, idx) => (
            <motion.div
              layout
              key={mod.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                onClick={() => setSelectedModule(mod)}
                className="glass border-2 border-indigo-400/50 hover:border-indigo-400 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                    {mod.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{mod.title}</h3>
                  <div className="mt-auto flex items-center justify-center gap-3 w-full">
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">{mod.time}</span>
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">{mod.level}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Ready to test your knowledge?</h3>
          <p className="text-gray-400">Take a quick quiz to see how much you've learned about the election process.</p>
        </div>
        <button 
          onClick={startQuiz}
          className="mt-4 md:mt-0 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <HelpCircle className="w-5 h-5"/> Start Quiz
        </button>
      </div>

      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-gray-900 border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                    {selectedModule.icon}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{selectedModule.title}</h2>
                    <p className="text-sm text-gray-400">{selectedModule.time} • {selectedModule.level}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedModule(null)} 
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {selectedModule.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isQuizActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-gray-900 border border-white/20 rounded-3xl w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  Knowledge Check
                </h2>
                <button 
                  onClick={() => setIsQuizActive(false)} 
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8">
                {quizResult === null ? (
                  <>
                    <div className="mb-6 flex justify-between items-end">
                      <span className="text-sm font-medium text-gray-400">Question {currentQuestionIndex + 1} of 5</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i === currentQuestionIndex ? 'bg-blue-500' : i < currentQuestionIndex ? 'bg-emerald-500' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium text-white mb-6 leading-relaxed">
                      {currentQuizQuestions[currentQuestionIndex]?.q}
                    </h3>
                    
                    <div className="space-y-3 mb-8">
                      {currentQuizQuestions[currentQuestionIndex]?.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className={`w-full text-left px-5 py-4 rounded-xl border transition-all cursor-pointer ${
                            userAnswers[currentQuestionIndex] === i 
                              ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                              : "glass border-white/10 hover:border-white/30 text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          <span className={`inline-block w-6 h-6 rounded-full border text-center text-xs leading-5 mr-3 align-middle font-bold ${userAnswers[currentQuestionIndex] === i ? 'border-blue-400 text-blue-400' : 'border-gray-500 text-gray-500'}`}>
                            {['A', 'B', 'C', 'D'][i]}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <button
                        onClick={prevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${currentQuestionIndex === 0 ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"}`}
                      >
                        <ChevronLeft className="w-5 h-5" /> Previous
                      </button>
                      
                      {currentQuestionIndex < 4 ? (
                        <button
                          onClick={nextQuestion}
                          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
                        >
                          Next <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={finishQuiz}
                          disabled={userAnswers[4] === undefined}
                          className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${userAnswers[4] !== undefined ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-pointer" : "bg-white/10 text-gray-500 cursor-not-allowed"}`}
                        >
                          Finish <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="w-32 h-32 mx-auto rounded-full border-8 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-gray-800 relative">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" className="stroke-white/5" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 289" }}
                          animate={{ strokeDasharray: `${(quizResult / 5) * 289} 289` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" 
                          strokeLinecap="round"
                          className={`${getFeedbackMessage(quizResult).stroke}`}
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white">{quizResult}</span>
                        <span className="text-xl text-gray-500">/5</span>
                      </div>
                    </div>
                    <h3 className={`text-3xl font-bold mb-2 ${getFeedbackMessage(quizResult).color}`}>
                      {getFeedbackMessage(quizResult).msg}
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                      You've completed the knowledge check. The more you learn, the stronger our democracy becomes!
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsQuizActive(false)}
                        className="px-6 py-3 rounded-full glass border border-white/10 text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        onClick={startQuiz}
                        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
                      >
                        Retry Quiz
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

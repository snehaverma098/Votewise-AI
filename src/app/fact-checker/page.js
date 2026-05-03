"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Search, AlertTriangle, CheckCircle, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { checkMisinformation } from "@/lib/gemini";

export default function FactChecker() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!claim.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const data = await checkMisinformation(claim);
      setResult(data);
    } catch (e) {
      setResult({
        score: 0,
        verdict: "Error",
        explanation: "An error occurred while verifying the claim.",
        references: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && claim.trim() && !isLoading) {
      handleCheck();
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case "true": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "misleading": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "false": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case "true": return <CheckCircle className="w-6 h-6" />;
      case "misleading": return <AlertTriangle className="w-6 h-6" />;
      case "false": return <ShieldAlert className="w-6 h-6" />;
      default: return <HelpCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-300 inline-flex items-center gap-2 mb-4">
          <ShieldAlert className="text-red-400 w-8 h-8" />
          AI Fact Checker
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">Detect misinformation, verify political claims, and ensure you're consuming accurate election news.</p>
      </div>

      <Card className="glass border-white/10 p-2 mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input 
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a political claim, rumor, or viral message here..."
            className="h-14 bg-black/20 border-white/5 text-white placeholder:text-gray-500 rounded-lg focus-visible:ring-red-500"
          />
          <Button 
            onClick={handleCheck}
            disabled={isLoading || !claim.trim()}
            className="h-14 px-8 bg-red-600 hover:bg-red-500 text-white rounded-lg shrink-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" /> Verify Claim</>}
          </Button>
        </div>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass border-white/10 overflow-hidden">
            <div className={`p-6 border-b flex items-center gap-4 ${getVerdictColor(result.verdict)}`}>
              {getVerdictIcon(result.verdict)}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider">{result.verdict}</h2>
                <p className="text-sm opacity-80">Trust Score: {result.score}/100</p>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Analysis</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{result.explanation}</p>
              
              {result.references && result.references.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Verified Sources</h3>
                  <ul className="space-y-2">
                    {result.references.map((ref, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-blue-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span className="hover:underline cursor-pointer">{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
      <p className="text-center text-xs text-gray-500 mt-8 flex items-center justify-center gap-1">
        <AlertTriangle className="w-3 h-3" /> Note: AI can make mistakes. Always verify important information with official ECI sources.
      </p>
    </div>
  );
}

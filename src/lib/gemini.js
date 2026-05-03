import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt, systemInstruction = "") => {
  const fullPrompt = systemInstruction ? `${systemInstruction}\n\nUser Question: ${prompt}` : prompt;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(fullPrompt);
    return (await result.response).text();
  } catch (error) {
    console.warn("Gemini API failed:", error.message);
    return "I am currently receiving too many requests (API Quota Exceeded). Please wait a moment before trying again. Meanwhile, check out our Learning Hub!";
  }
};

export const checkMisinformation = async (claim) => {
  const prompt = `Analyze the following political or election-related claim for misinformation:
"${claim}"
Provide a JSON response with the following format:
{
  "score": <0-100 score of trust/credibility>,
  "verdict": "<True | Misleading | False | Unverified>",
  "explanation": "<Detailed explanation of why>",
  "references": ["<Suggested generic verified source 1>", "<Suggested source 2>"]
}
Only output the JSON.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    const text = (await result.response).text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.warn("Fact Check API failed:", error.message);
    // Hardcoded fallback for presentation safety so UI doesn't crash
    return {
      score: 50,
      verdict: "Unverified",
      explanation: "API Quota Limit Exceeded. We are receiving too many requests right now. Please wait a minute and try again.",
      references: ["https://eci.gov.in/"]
    };
  }
};

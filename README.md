# VoteWise AI 🗳️🤖

VoteWise AI is an intelligent, gamified platform designed to empower citizens, especially first-time voters, with accurate election information, interactive learning, and AI-driven misinformation detection. Built for a modern hackathon standard with a sleek glassmorphism UI.

## 🚀 Key Features

*   **AI Election Assistant:** A conversational AI assistant (powered by Google Gemini) that answers all your election-related queries. Features voice input with visual equalizer animations.
*   **Misinformation Fact-Checker:** Paste suspicious WhatsApp forwards or political claims, and the AI will verify their credibility and explain the truth using a visual scoring system.
*   **Interactive Learning Hub:** 
    *   Curated learning modules covering Democracy, EVMs, Voting Rights, and more.
    *   Features dynamic filtering (Beginner, Advanced).
    *   Includes a **Dynamic Knowledge Quiz** that randomizes 5 questions from a pool to test user knowledge, providing instant score feedback.
*   **Voter Journey:** A personalized checklist guiding users through the steps of voting (Registering, Finding Booth, Casting Vote).
*   **Modern Gamified Profile:** A "Voter Profile Dashboard" that tracks learning progress, quizzes passed, and awards badges (e.g., *First-Time Voter*, *Truth Seeker*).

> **Note for Judges/Reviewers on the Profile Section:** 
> While the AI Assistant and Fact-Checker are fully functional and powered live by the Gemini API, the **Profile Section currently utilizes mock data**. This was intentionally designed as a Minimum Viable Product (MVP) showcase to demonstrate our vision for gamification, retention, and personalized user experience at scale.

## 💻 Tech Stack

*   **Frontend:** Next.js (App Router), React
*   **Styling:** Tailwind CSS (v4), Framer Motion (for smooth animations and UI interactions)
*   **Icons:** Lucide React
*   **AI Backend:** Google Generative AI SDK (`gemini-2.5-flash`)
*   **Web Speech API:** For voice-to-text input in the AI Chat.

## 📁 Project Architecture & Folder Structure

```text
votewise-ai/
├── src/
│   ├── app/
│   │   ├── chat/page.js          # AI Election Assistant UI
│   │   ├── fact-checker/page.js  # Misinformation Detection UI
│   │   ├── journey/page.js       # Voter Roadmap & Checklist
│   │   ├── learning/page.js      # Learning Hub & Quiz System
│   │   ├── profile/page.js       # Gamified Voter Profile Dashboard
│   │   ├── layout.js             # Root layout with Global Footer
│   │   └── page.js               # Landing Page with glassmorphism UI
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky Navigation Bar
│   │   └── ui/                   # Reusable UI components (Buttons, Cards, Inputs)
│   └── lib/
│       ├── gemini.js             # AI backend logic & Fallback mechanisms
│       └── utils.js              # Utility functions for Tailwind classes
├── public/                       # Static assets
├── .env.local                    # Environment variables (API Keys)
└── tailwind.config.js            # Tailwind CSS configuration
```

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/votewise-ai.git
   cd votewise-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   * Create a `.env.local` file in the root directory.
   * Add your Google Gemini API key (This file is ignored by git for security):
     ```env
     NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:** Visit `http://localhost:3000` in your browser.

## 🔒 Security
All sensitive API keys are protected and managed via `.env.local` which is intentionally excluded from this repository via `.gitignore`.

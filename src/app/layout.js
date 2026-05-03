import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VoteWise AI | Your Smart Election Companion",
  description: "Making Elections Simple, Accessible, and Intelligent with AI. Empowering voters against misinformation.",
  keywords: ["Election", "Voting", "AI Assistant", "Fact Checker", "Democracy", "India Elections"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased overflow-x-hidden text-foreground`} suppressHydrationWarning>
        <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-blue-950 via-gray-900 to-black">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-900/20 blur-[100px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] -z-10 pointer-events-none" />
          
          <Navbar />
          <main className="flex-1">{children}</main>
          
          <footer className="w-full py-6 text-center text-sm text-gray-500 border-t border-white/5 bg-black/20 backdrop-blur-md mt-auto">
            <p>&copy; {new Date().getFullYear()} VoteWise AI. Empowering Democracy through Intelligence.</p>
          </footer>
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}

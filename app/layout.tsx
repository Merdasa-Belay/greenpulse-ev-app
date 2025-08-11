import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "greenpulse-ev",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

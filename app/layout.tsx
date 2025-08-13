import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ui/ConditionalNavbar";
import EnvironmentBadge from "@/components/env/EnvironmentBadge";
import { AuthProvider } from "@/contexts/AuthContext";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | GreenPulse EV",
    default: "GreenPulse EV",
  },
  description: "Smart EV routing, charging optimization, and learning companions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <AuthProvider>
          <EnvironmentBadge />
          <ConditionalNavbar />
          <div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

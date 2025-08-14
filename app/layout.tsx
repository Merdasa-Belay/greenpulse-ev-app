import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ui/ConditionalNavbar";
import EnvironmentBadge from "@/components/env/EnvironmentBadge";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'),
  title: {
    template: "%s | GreenPulse EV",
    default: "GreenPulse EV",
  },
  description: "Smart EV routing, charging optimization, and learning companions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var s=localStorage.getItem('theme');if(!s){var m=window.matchMedia('(prefers-color-scheme: dark)');s=m.matches?'dark':'light';}if(s==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}}();`
          }}
        />
      </head>
      <body className={`${bricolage.variable} antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <EnvironmentBadge />
            <ConditionalNavbar />
            <div>
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";
import AppWrapper from "@/components/AppWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Prompter - AI-Powered Prompt Generator for ChatGPT, Claude & More",
  description: "Generate professional AI prompts enhanced by Groq AI. Create prompts for development, images, writing, marketing, and more. Free, fast, and no sign-up required.",
  keywords: ["AI", "prompt generator", "ChatGPT", "Claude", "Groq", "development", "coding", "app builder", "image generation", "writing", "marketing"],
  authors: [{ name: "Saqib Nawaz Khan" }],
  manifest: "/manifest.json",
  themeColor: "#667eea",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "AI Prompter - AI-Powered Prompt Generator",
    description: "Generate professional AI prompts enhanced by Groq AI. Free, fast, no sign-up.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompter - AI-Powered Prompt Generator",
    description: "Generate professional AI prompts enhanced by Groq AI. Free, fast, no sign-up.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

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
  title: "AI Prompter - Generate Professional AI Development Prompts",
  description: "Transform your app ideas into structured, professional AI prompts. Perfect for developers, students, and product managers using ChatGPT, Claude, or any AI coding assistant.",
  keywords: ["AI", "prompt generator", "ChatGPT", "Claude", "development", "coding", "app builder"],
  authors: [{ name: "Saqib Nawaz Khan" }],
  openGraph: {
    title: "AI Prompter - Generate Professional AI Development Prompts",
    description: "Transform your app ideas into structured, professional AI prompts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
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

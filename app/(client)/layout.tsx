import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Gravex",
  description: "clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          <Header/>
          
          <main>{children}</main>
          <Footer/>
          <Toaster position="bottom-right" toastOptions={{style:{background: "ffffff", color:"000000"}}}/>
        </body>
      </html>

    </ClerkProvider>


    
  );
}

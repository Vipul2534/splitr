import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import NoSmoothScroll from "@/components/NoSmoothScroll";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "Splitr",
  description: "The smartest way to split expenses with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo-s.png" size="any"/>
      </head>
      <body
        className={`${inter.className}`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <Header/>
            <NoSmoothScroll />
            <main className="min-h-screen">
              {children}
              <Toaster richColors/>
            </main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster"
import LocationFilter from "@/components/LocationFilter";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest:"/manifest.json",
  title: "Stuart-hotel",
  description: "trouver l'hotel qui vous convient",
  icons: { icon: '/logo.svg' }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={inter.className}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster/>

            <main className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100/10 to-sky-200 dark:bg-secondary dark:bg-none">
              <NavBar />
              <LocationFilter/>
              <section className="flex-grow" >
                <Container>
                    {children}
                </Container>
               
              </section>


            </main>
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}


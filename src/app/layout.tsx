// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig, seoDefaults } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["cyrillic", "latin"], 
  display: "swap",
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["cyrillic", "latin"], 
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["cyrillic", "latin"], 
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"]
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: seoDefaults.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },

  openGraph: {
    ...seoDefaults.openGraph,
    title: {
      default: seoDefaults.defaultTitle,
      template: seoDefaults.titleTemplate,
    },
    description: seoDefaults.description,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: seoDefaults.defaultTitle,
      template: seoDefaults.titleTemplate,
    },
    description: seoDefaults.description,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${playfair.variable} ${cormorant.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark"  // по умолчанию темная тема
          enableSystem={false} // отключаем системную тему, чтобы не было конфликтов
          disableTransitionOnChange={false}
          value={{ 
            light: 'light',   // указываем класс для светлой темы
            dark: 'dark'      // указываем класс для темной темы
          }}
        >
          <div className="wood-texture min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 relative">
              {/* Декоративные элементы */}
              <div className="fixed top-0 left-0 w-32 h-32 opacity-5 pointer-events-none">
                <div className="w-full h-full border-l-2 border-t-2 border-primary rounded-tl-3xl" />
              </div>
              <div className="fixed bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                <div className="w-full h-full border-r-2 border-b-2 border-primary rounded-br-3xl" />
              </div>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
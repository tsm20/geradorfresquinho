import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerador Fresquinho",
  description:
    "Gerador fresquinho de números de identificação portugueses válidos. Cria números de NIF, CC, Segurança Social e IBAN para testes e desenvolvimento.",
  generator: "tsm20",
  keywords: [
    "gerador nif",
    "gerador cc",
    "gerador niss",
    "gerador iban",
    "nif",
    "nif fresquinho",
    "cartão cidadão",
    "cartão cidadão fresquinho",
    "cc fresquinho",
    "segurança social",
    "segurança social fresquinho",
    "niss fresquinho",
    "iban",
    "iban fresquinho",
    "portugal",
    "validação",
  ],
  authors: [{ name: "tsm20", url: "https://github.com/tsm20" }],
  creator: "tsm20",
  publisher: "Gerador Fresquinho",
  applicationName: "Gerador Fresquinho",
  alternates: {
    canonical: "https://geradorfresquinho.netlify.app",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    title: "Gerador Fresquinho",
    description:
      "Gerador de números de identificação portugueses válidos para testes e desenvolvimento.",
    siteName: "Gerador Fresquinho",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Gerador Fresquinho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador Fresquinho",
    description:
      "Gerador de números de identificação portugueses válidos para testes e desenvolvimento.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://geradorfresquinho.netlify.app"),
  verification: {
    google: "google-site-verification",
    other: {
      me: ["tsm20@gmail.com"],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar className="w-72 min-w-72 border-r" />
              <SidebarInset className="flex-1 flex flex-col min-h-screen">
                <main className="flex-1">{children}</main>
                <footer className="border-t p-4 text-center text-sm text-muted-foreground">
                  <p>
                    &copy; 2024 Gerador Fresquinho. Todos os direitos
                    reservados.
                  </p>
                </footer>
              </SidebarInset>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

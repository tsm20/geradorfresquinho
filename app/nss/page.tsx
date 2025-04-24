import { Metadata } from "next";
import { NSSGenerator } from "./nss-generator";

export const metadata: Metadata = {
  title: "Gerador NISS Fresquinho",
  description:
    "Gerador de Números de Identificação da Segurança Social (NISS) válidos para uso em testes e desenvolvimento.",
  keywords: [
    "NISS",
    "Segurança Social",
    "número segurança social",
    "NISS fresquinho",
    "gerador NISS",
    "validador NISS",
    "Portugal",
  ],
  openGraph: {
    title: "Gerador NISS Fresquinho",
    description:
      "Crie números de Segurança Social válidos para testes e desenvolvimento de software.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Gerador de NISS Fresquinho",
      },
    ],
  },
};

export default function NSSPage() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de Número de Segurança Social Fresquinho",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Gere números de Segurança Social válidos para testes e desenvolvimento de software.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            featureList: [
              "Geração de NISS válidos",
              "Formatação automática do número",
            ],
          }),
        }}
      />
      <NSSGenerator />
    </div>
  );
}

import { Metadata } from "next";
import { NIFGenerator } from "./nif-generator";

export const metadata: Metadata = {
  title: "Gerador NIF Fresquinho",
  description:
    "Gerador de Números de Identificação Fiscal (NIF) para pessoas singulares, empresas e outras entidades. Use para testes e desenvolvimento.",
  keywords: [
    "NIF",
    "número identificação fiscal",
    "gerador NIF",
    "NIF fresquinho",
    "validador NIF",
    "contribuinte",
    "Portugal",
  ],
  openGraph: {
    title: "Gerador NIF Fresquinho",
    description:
      "Crie números de NIF válidos para testes e desenvolvimento. Gere NIF para pessoas singulares, empresas e outras entidades.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Gerador de NIF Fresquinho",
      },
    ],
  },
};

export default function NIFPage() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de NIF Fresquinho",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Gere números de NIF válidos para testes e desenvolvimento. Crie NIF para pessoas singulares, empresas e outras entidades.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            featureList: [
              "NIF Fresquinho",
              "Geração de NIF Fresquinho",
              "Geração de NIF para pessoas singulares",
              "Geração de NIF para empresas",
              "Geração de NIF para entidades públicas",
              "Geração de NIF para empresários em nome individual",
            ],
          }),
        }}
      />
      <NIFGenerator />
    </div>
  );
}

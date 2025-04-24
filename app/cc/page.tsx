import { Metadata } from "next";
import { CCGenerator } from "./cc-generator";

export const metadata: Metadata = {
  title: "Gerador CC Fresquinho",
  description:
    "Gerador de números de Cartão de Cidadão (CC) portugueses válidos para uso em testes e desenvolvimento.",
  keywords: [
    "Cartão de Cidadão",
    "Cartão de Cidadão Fresquinho",
    "CC",
    "CC fresquinho",
    "gerador CC",
    "validador CC",
    "documento identificação",
    "Portugal",
  ],
  openGraph: {
    title: "Gerador CC Fresquinho",
    description:
      "Crie números de Cartão de Cidadão válidos para testes e desenvolvimento de software.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Gerador de CC Fresquinho",
      },
    ],
  },
};

export default function CCPage() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de Cartão de Cidadão Fresquinho",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Gere números de Cartão de Cidadão válidos para testes e desenvolvimento de software.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            featureList: [
              "Geração de números de Cartão de Cidadão válidos",
              "Formatação automática do número",
            ],
          }),
        }}
      />
      <CCGenerator />
    </div>
  );
}

import { Metadata } from "next";
import { IBANGenerator } from "./iban-generator";

export const metadata: Metadata = {
  title: "Gerador IBAN Fresquinho",
  description:
    "Gerador de IBAN portugueses válidos para uso em testes e desenvolvimento de software.",
  keywords: [
    "IBAN",
    "Conta bancária",
    "IBAN fresquinho",
    "gerador IBAN",
    "validador IBAN",
    "banco Portugal",
    "NIB",
    "Portugal",
  ],
  openGraph: {
    title: "Gerador IBAN Fresquinho",
    description:
      "Crie números de IBAN portugueses válidos para testes e desenvolvimento de software.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Gerador de Iban Fresquinho",
      },
    ],
  },
};

export default function IBANPage() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de IBAN Fresquinho",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Gere números de IBAN portugueses válidos para testes e desenvolvimento de software. Inclui informações sobre banco e agência.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            featureList: [
              "IBAN Fresquinho",
              "Geração de IBAN Fresquinho",
              "Geração de IBAN portugueses válidos",
              "Seleção de banco específico",
              "Formatação automática do número",
              "Informações detalhadas sobre banco e agência",
            ],
          }),
        }}
      />
      <IBANGenerator />
    </div>
  );
}

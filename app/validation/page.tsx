import type { Metadata } from "next";
import { ValidationComponent } from "./validation-component";

export const metadata: Metadata = {
  title: "Validação de Documentos Portugueses | Gerador PT-ID",
  description:
    "Verifique a validade de documentos portugueses como NIF, CC, NSS e IBAN.",
  keywords: [
    "validação",
    "NIF",
    "cartão cidadão",
    "segurança social",
    "IBAN",
    "documentos portugueses",
  ],
  openGraph: {
    title: "Validação de Documentos Portugueses | Gerador PT-ID",
    description:
      "Ferramenta online para validar números de documentos portugueses",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Validação de Documentos",
      },
    ],
  },
};

export default function ValidationPage() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Validador de Documentos Portugueses",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Verifique a validade de números de documentos portugueses como NIF, CC, NISS e IBAN.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
          }),
        }}
      />
      <ValidationComponent />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  CreditCard,
  FileCheck,
  Percent,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador Fresquinho - Gerador de Números de Identificação Portugueses",
  description:
    "Gerador de números de identificação portugueses como NIF, CC, NISS e IBAN para uso em testes e desenvolvimento de software.",
};

export default function Home() {
  return (
    <div className="container px-4 mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador Fresquinho",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Gerador de números de identificação portugueses como NIF, CC, NISS e IBAN para uso em testes e desenvolvimento de software.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
            featureList: [
              "Geração de NIF",
              "Geração de números de Cartão de Cidadão",
              "Geração de NISS (Segurança Social)",
              "Geração de IBAN",
            ],
          }),
        }}
      />
      <h1 className="text-3xl font-bold mb-6">
        Gerador de Números de Identificação Portugueses
      </h1>

      <p className="text-muted-foreground mb-8">
        Esta aplicação permite gerar e validation números de identificação
        portugueses válidos, incluindo NIF, Cartão de Cidadão, Número de
        Segurança Social e IBAN.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/nif" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Percent className="h-10 w-10 text-primary" />
              <div>
                <CardTitle>NIF</CardTitle>
                <CardDescription>
                  Número de Identificação Fiscal
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Gere números de NIF válidos para pessoas singulares ou
                coletivas.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cc" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <CreditCard className="h-10 w-10 text-primary" />
              <div>
                <CardTitle>Cartão de Cidadão</CardTitle>
                <CardDescription>Número do Cartão de Cidadão</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Gere números de Cartão de Cidadão válidos.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/nss" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div>
                <CardTitle>Segurança Social</CardTitle>
                <CardDescription>Número de Segurança Social</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Gere números de Segurança Social válidos.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/iban" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Wallet className="h-10 w-10 text-primary" />
              <div>
                <CardTitle>IBAN</CardTitle>
                <CardDescription>
                  Número de Conta Bancária Internacional
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Gere IBANs portugueses válidos.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/validation" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <FileCheck className="h-10 w-10 text-primary" />
              <div>
                <CardTitle>Validar</CardTitle>
                <CardDescription>
                  Verificar validade de documentos
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Verifique se um número é válido e identifique o seu tipo.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

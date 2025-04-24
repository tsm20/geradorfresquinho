"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  validateNIF,
  validateCC,
  validateNSS,
  validateIBAN,
} from "@/lib/validators";
import { CheckCircle2, XCircle } from "lucide-react";
import { getBankCodeFromIBAN, getBankName } from "@/lib/generators";
import { Breadcrumb } from "@/components/breadcrumb";

export function ValidationComponent() {
  const [document, setDocument] = useState("");
  const [results, setResults] = useState<{
    nif: boolean;
    cc: boolean;
    nss: boolean;
    iban: boolean;
    bankInfo?: string;
  } | null>(null);

  const handleValidate = () => {
    if (!document.trim()) return;

    const cleanDocument = document.replace(/\s/g, "");

    const isValidNIF = validateNIF(cleanDocument);
    const isValidCC = validateCC(cleanDocument);
    const isValidNSS = validateNSS(cleanDocument);
    const isValidIBAN = validateIBAN(cleanDocument);

    let bankInfo;
    if (isValidIBAN) {
      const bankCode = getBankCodeFromIBAN(cleanDocument);
      const bankName = getBankName(bankCode);
      const branchCode = cleanDocument.substring(8, 12);
      bankInfo = `${bankName} (código ${bankCode}), Agência: ${branchCode}`;
    }

    setResults({
      nif: isValidNIF,
      cc: isValidCC,
      nss: isValidNSS,
      iban: isValidIBAN,
      bankInfo,
    });
  };

  return (
    <>
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-2">Validar Número</h1>
      <p className="text-muted-foreground mb-8">
        Verifique se um número é válido e identifique o seu tipo.
      </p>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Validação de Número</CardTitle>
          <CardDescription>
            Insira um número para verificar se corresponde a um número válido.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              placeholder="Insira o número a validar"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleValidate();
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Suporta NIF, Cartão de Cidadão, Número de Segurança Social e IBAN.
            </p>
          </div>

          {results && (
            <div className="space-y-2 border rounded-md p-4">
              <h3 className="font-medium mb-2">Resultados da validação:</h3>

              <ResultItem
                label="NIF (Número de Identificação Fiscal)"
                isValid={results.nif}
              />

              <ResultItem label="CC (Cartão de Cidadão)" isValid={results.cc} />

              <ResultItem
                label="NISS (Número de Segurança Social)"
                isValid={results.nss}
              />

              <ResultItem
                label="IBAN"
                isValid={results.iban}
                additionalInfo={results.bankInfo}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleValidate} className="w-full">
            Validar
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-xl font-semibold mb-2">Sobre a Validação</h2>
        <p className="mb-4">
          Esta ferramenta verifica a validade dos seguintes documentos
          portugueses:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>NIF (Número de Identificação Fiscal) - 9 dígitos</li>
          <li>
            Cartão de Cidadão - 8 dígitos + 1 dígito de controle + 2 caracteres
            alfanuméricos
          </li>
          <li>Número de Segurança Social - 11 dígitos</li>
          <li>IBAN Português - 25 caracteres (começando com PT)</li>
        </ul>
        <p className="mt-4">
          A validação é feita através de algoritmos específicos para cada tipo
          de documento, verificando a integridade dos dígitos de controle e a
          estrutura do número.
        </p>
      </div>
    </>
  );
}

// Componente para mostrar o resultado de cada validação
function ResultItem({
  label,
  isValid,
  additionalInfo,
}: {
  label: string;
  isValid: boolean;
  additionalInfo?: string;
}) {
  return (
    <div className="flex items-start gap-2 py-1 border-b last:border-0">
      {isValid ? (
        <CheckCircle2 className="h-5 w-5 min-w-5 text-green-600 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 min-w-5 text-red-600 mt-0.5" />
      )}
      <div>
        <p
          className={
            isValid
              ? "font-medium text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }
        >
          {label}: {isValid ? "Válido" : "Inválido"}
        </p>
        {isValid && additionalInfo && (
          <p className="text-sm text-muted-foreground">{additionalInfo}</p>
        )}
      </div>
    </div>
  );
}

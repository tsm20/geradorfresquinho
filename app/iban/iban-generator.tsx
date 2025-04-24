"use client";

import { useState, useEffect } from "react";
import { GeneratorCard } from "@/components/generator-card";
import {
  generateIBAN,
  getBankName,
  getBankCodeFromIBAN,
  portugueseBanks,
} from "@/lib/generators";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumb } from "@/components/breadcrumb";

export function IBANGenerator() {
  const [selectedBank, setSelectedBank] = useState("");
  const [currentIBAN, setCurrentIBAN] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Opções de banco para seleção
  const bankOptions = [
    { value: "ANY", label: "Qualquer banco" },
    ...portugueseBanks.map((bank) => ({
      value: bank.code,
      label: `${bank.name} (${bank.code})`,
    })),
  ];

  const generateWithBank = () => {
    const iban = generateIBAN(
      selectedBank === "ANY" ? undefined : selectedBank
    );
    setCurrentIBAN(iban);
    return iban;
  };

  // Extrai o código do banco do IBAN atual
  const bankCode = getBankCodeFromIBAN(currentIBAN);
  const bankName = bankCode ? getBankName(bankCode) : "";

  // Informações sobre o banco e a agência
  const bankInfo = currentIBAN ? (
    <div className="mt-4 p-3 bg-accent rounded-md">
      <h3 className="font-medium mb-1">Informações do banco:</h3>
      <p>
        <strong>Banco:</strong> {bankName} (código {bankCode})
      </p>
      <p>
        <strong>Agência:</strong> {currentIBAN.substring(8, 12)}
      </p>
    </div>
  ) : null;

  return (
    <>
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-2">Gerador de IBAN</h1>
      <p className="text-muted-foreground mb-8">
        Gere números de IBAN portugueses válidos para uso em testes e
        desenvolvimento.
      </p>

      {isClient && (
        <GeneratorCard
          title="IBAN Português"
          description="O IBAN português começa com PT50 seguido de 21 dígitos."
          generator={generateWithBank}
          formatOutput={(output) => {
            if (!output) return "";
            // Formata como: PT50 0000 0000 0000 0000 0000 0
            return output.replace(/(.{4})/g, "$1 ").trim();
          }}
          additionalInfo={bankInfo}
          toastLabel="IBAN"
        >
          <div className="space-y-2">
            <Label htmlFor="bank">Banco (opcional)</Label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger id="bank">
                <SelectValue placeholder="Selecione um banco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ANY">Qualquer banco</SelectItem>
                {portugueseBanks.map((bank) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name} ({bank.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GeneratorCard>
      )}

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-xl font-semibold mb-2">Sobre o IBAN</h2>
        <p className="mb-4">
          O IBAN (International Bank Account Number) é um código internacional
          padronizado que identifica uma conta bancária específica.
        </p>
        <p className="mb-4">
          O IBAN português tem 25 caracteres e é estruturado da seguinte forma:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>PT: Código do país (Portugal)</li>
          <li>50: Dígitos de controle do IBAN (sempre 50 para Portugal)</li>
          <li>4 dígitos: Código do banco</li>
          <li>4 dígitos: Código da agência</li>
          <li>11 dígitos: Número da conta</li>
          <li>2 dígitos: Dígitos de controle do NIB</li>
        </ul>
        <p className="mt-4">
          O algoritmo de validação utiliza operações matemáticas específicas
          para garantir a integridade do número e evitar erros de digitação.
        </p>
      </div>
    </>
  );
}

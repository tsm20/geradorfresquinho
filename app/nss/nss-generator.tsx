"use client";

import { useState, useEffect } from "react";
import { GeneratorCard } from "@/components/generator-card";
import { generateNSS } from "@/lib/generators";
import { Breadcrumb } from "@/components/breadcrumb";

export function NSSGenerator() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-2">
        Gerador de Número de Segurança Social
      </h1>
      <p className="text-muted-foreground mb-8">
        Gere números de Segurança Social válidos para uso em testes e
        desenvolvimento.
      </p>

      {isClient && (
        <GeneratorCard
          title="Número de Segurança Social"
          description="O número da Segurança Social é composto por 11 dígitos."
          generator={generateNSS}
          formatOutput={(output) => {
            if (!output) return "";
            // Formata como: 1234 5678 901
            return `${output.substring(0, 4)} ${output.substring(
              4,
              8
            )} ${output.substring(8)}`;
          }}
          toastLabel="NISS"
        />
      )}

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-xl font-semibold mb-2">
          Sobre o Número de Segurança Social
        </h2>
        <p className="mb-4">
          O Número de Identificação da Segurança Social (NISS) é um número único
          atribuído pela Segurança Social a cada beneficiário.
        </p>
        <p className="mb-4">O NISS é composto por 11 dígitos, sendo:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            O primeiro dígito geralmente é 1 ou 2, indicando o tipo de
            beneficiário
          </li>
          <li>Os 9 dígitos seguintes são o número sequencial</li>
          <li>
            O último dígito é um dígito de controle calculado através de um
            algoritmo específico
          </li>
        </ul>
        <p className="mt-4">
          Este número é essencial para a identificação do cidadão perante a
          Segurança Social e é utilizado em todos os contactos e processos.
        </p>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { GeneratorCard } from "@/components/generator-card";
import { generateCC } from "@/lib/generators";
import { Breadcrumb } from "@/components/breadcrumb";

export function CCGenerator() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-2">Gerador de Cartão de Cidadão</h1>
      <p className="text-muted-foreground mb-8">
        Gere números de Cartão de Cidadão válidos para uso em testes e
        desenvolvimento.
      </p>

      {isClient && (
        <GeneratorCard
          title="Número de Cartão de Cidadão"
          description="O número do CC é composto por 8 dígitos, seguido de 1 dígito de controle e 2 caracteres alfanuméricos."
          generator={generateCC}
          formatOutput={(output) => {
            if (!output) return "";
            // Formata como: 12345678 9 0A
            return `${output.substring(0, 8)} ${output.substring(
              8,
              9
            )} ${output.substring(9)}`;
          }}
          toastLabel="CC"
        />
      )}

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-xl font-semibold mb-2">
          Sobre o Cartão de Cidadão
        </h2>
        <p className="mb-4">
          O Cartão de Cidadão é o documento de identificação dos cidadãos
          portugueses. O número do Cartão de Cidadão é composto por:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>8 dígitos numéricos (número civil)</li>
          <li>1 dígito de controle</li>
          <li>2 caracteres alfanuméricos (versão do documento)</li>
        </ul>
        <p className="mt-4">
          O algoritmo de validação utiliza uma variante do algoritmo de Luhn
          para verificar a integridade do número.
        </p>
      </div>
    </>
  );
}

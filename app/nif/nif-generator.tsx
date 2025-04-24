"use client";

import { useState, useEffect } from "react";
import { GeneratorCard } from "@/components/generator-card";
import { generateNIF } from "@/lib/generators";
import { Label } from "@/components/ui/label";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const nifTypes = [
  { value: "0", label: "Qualquer prefixo válido" },
  { value: "1", label: "1 - Pessoa singular" },
  { value: "2", label: "2 - Pessoa singular" },
  { value: "3", label: "3 - Pessoa singular (recente)" },
  { value: "5", label: "5 - Pessoa coletiva" },
  { value: "6", label: "6 - Pessoa coletiva pública" },
  { value: "8", label: "8 - Empresário em nome individual" },
  { value: "9", label: "9 - Pessoa coletiva irregular ou temporário" },
];

export function NIFGenerator() {
  const [selectedType, setSelectedType] = useState("0");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateWithPrefix = () => {
    if (selectedType === "0") {
      return generateNIF();
    }
    return generateNIF(Number.parseInt(selectedType));
  };

  return (
    <>
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-2">Gerador de NIF</h1>
      <p className="text-muted-foreground mb-8">
        Gere números de Identificação Fiscal (NIF) válidos para uso em testes e
        desenvolvimento.
      </p>

      {isClient && (
        <GeneratorCard
          title="Número de Identificação Fiscal"
          description="O NIF é composto por 9 dígitos, sendo o último um dígito de controle."
          generator={generateWithPrefix}
          toastLabel="NIF"
        >
          <div className="space-y-2">
            <Label htmlFor="nif-type">Tipo de NIF</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="nif-type">
                <SelectValue placeholder="Selecione um tipo de NIF" />
              </SelectTrigger>
              <SelectContent>
                {nifTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GeneratorCard>
      )}

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-xl font-semibold mb-2">Sobre o NIF</h2>
        <p className="mb-4">
          O Número de Identificação Fiscal (NIF) é um número único atribuído
          pela Autoridade Tributária e Aduaneira a pessoas singulares ou
          coletivas para efeitos fiscais.
        </p>
        <h3 className="text-lg font-semibold mb-2">
          Significado do primeiro dígito:
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>1 ou 2: Pessoa singular</li>
          <li>3: Pessoa singular (uso recente)</li>
          <li>5: Pessoa coletiva</li>
          <li>6: Pessoa coletiva pública</li>
          <li>8: Empresário em nome individual</li>
          <li>9: Pessoa coletiva irregular ou número temporário</li>
        </ul>
      </div>
    </>
  );
}

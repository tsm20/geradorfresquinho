"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GeneratorCardProps {
  title: string;
  description: string;
  generator: (...args: any[]) => string;
  formatOutput?: (output: string) => string;
  additionalInfo?: React.ReactNode;
  children?: React.ReactNode;
  toastLabel?: string;
}

export function GeneratorCard({
  title,
  description,
  generator,
  formatOutput,
  additionalInfo,
  children,
  toastLabel = "Número",
}: GeneratorCardProps) {
  const [generatedNumber, setGeneratedNumber] = useState<string>("");
  const { toast } = useToast();

  // Gera um número automaticamente ao carregar o componente
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    const number = generator();
    setGeneratedNumber(number);
  };

  const handleCopy = async () => {
    if (!generatedNumber) return;

    try {
      await navigator.clipboard.writeText(generatedNumber);

      // Exibir o toast
      toast({
        title: "Copiado!",
        description: `${toastLabel} ${
          formatOutput ? formatOutput(generatedNumber) : generatedNumber
        } copiado para a área de transferência.`,
        duration: 3000,
      });
    } catch (err) {
      console.error("Erro ao copiar:", err);
      toast({
        title: "Erro",
        description: "Não foi possível copiar para a área de transferência.",
        duration: 3000,
      });
    }
  };

  const displayNumber = formatOutput
    ? formatOutput(generatedNumber)
    : generatedNumber;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}

        <div className="flex items-center justify-center">
          <div className="relative w-full">
            <div className="p-4 pr-[40px] bg-muted rounded-md text-center font-mono text-lg break-all">
              {displayNumber}
            </div>
            {generatedNumber && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copiar</span>
              </Button>
            )}
          </div>
        </div>

        {additionalInfo}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} className="w-full">
          Gerar Novo
        </Button>
      </CardFooter>
    </Card>
  );
}

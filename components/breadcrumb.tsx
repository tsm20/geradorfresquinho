"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const routes = [
  { path: "/", label: "Início" },
  { path: "/nif", label: "NIF" },
  { path: "/cc", label: "Cartão de Cidadão" },
  { path: "/nss", label: "Segurança Social" },
  { path: "/iban", label: "IBAN" },
  { path: "/validation", label: "Validar" },
];

export function Breadcrumb() {
  const pathname = usePathname();

  // Se estiver na página inicial, não mostrar breadcrumb
  if (pathname === "/") return null;

  // Encontrar a rota atual
  const currentRoute = routes.find((route) => route.path === pathname);

  if (!currentRoute) return null;

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Início
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="font-medium text-foreground">{currentRoute.label}</span>
    </nav>
  );
}

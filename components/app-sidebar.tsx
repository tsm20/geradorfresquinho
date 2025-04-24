"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  FileCheck,
  Github,
  Home,
  Menu,
  Percent,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

const menuItems = [
  {
    title: "Início",
    href: "/",
    icon: Home,
  },
  {
    title: "NIF",
    href: "/nif",
    icon: Percent,
  },
  {
    title: "Cartão de Cidadão",
    href: "/cc",
    icon: CreditCard,
  },
  {
    title: "Segurança Social",
    href: "/nss",
    icon: ShieldCheck,
  },
  {
    title: "IBAN",
    href: "/iban",
    icon: Wallet,
  },
  {
    title: "Validar número",
    href: "/validation",
    icon: FileCheck,
  },
];

// Adicionar interface para props
interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  // Menu content to be reused in both mobile and desktop
  const MenuContent = () => (
    <>
      <SidebarHeader className="px-4 py-2 mb-4">
        <div className="flex items-center justify-start">
          <Image
            src="/logo.png"
            alt="Gerador Fresquinho"
            width={32}
            height={32}
          />
          <h2 className="ml-2 text-xl font-bold">Gerador Fresquinho</h2>
          {/* <ThemeToggle /> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-6 md:mt-0 px-4 py-2">
        <div className="flex justify-center gap-2">
          {/* <Avatar
            className="h-10 w-10"
            onClick={() => {
              window.open("https://github.com/tsm20", "_blank");
            }}
          >
            <AvatarImage src="https://github.com/tsm20.png" alt="tsm20" />
            <AvatarFallback>TSM</AvatarFallback>
          </Avatar> */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs flex items-center">
              © {new Date().getFullYear()} Gerador Fresquinho
            </span>
            <a
              href="https://github.com/tsm20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span className="text-xs font-medium">github.com/tsm20</span>
              </div>
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground"></p>
        </div>
      </SidebarFooter>
    </>
  );

  return (
    <>
      {/* Mobile hamburger menu */}
      {/* Theme Toggle posicionado absolutamente no canto superior direito */}
      <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
        <ThemeToggle />
      </div>
      <div className="fixed top-0 left-0 z-50 w-full bg-background border-b py-2 px-4 md:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Gerador Fresquinho</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <MenuContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar variant="inset" collapsible="icon">
          <MenuContent />
        </Sidebar>
      </div>
    </>
  );
}

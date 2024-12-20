"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: LucideIcon | IconType;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all text-slate-600 hover:bg-primary/20",
        isActive &&
          "text-primary bg-primary/20 hover:bg-primary/20 hover:text-primary"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("", isActive && "text-primary")} />{" "}
        {label}
      </div>
      <div
        className={cn(
          "ml-auto py-6 opacity-0 border-2 border-primary h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

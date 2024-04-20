"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = ({ teacher }: { teacher: boolean }) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/startCourse");

  return (
    <div className="flex gap-x-2 ml-auto">
      {teacher &&
        (isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/tests">
            <Button size="sm" variant="ghost">
              <GraduationCap className="h-4 w-4 mr-2" /> Teacher mode
            </Button>
          </Link>
        ))}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;

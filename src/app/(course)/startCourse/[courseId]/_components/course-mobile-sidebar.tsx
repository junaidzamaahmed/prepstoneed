import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Course, Recordings } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & { recordings: Recordings[] };
}
export default function CourseMobileSidebar({
  course,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white w-72" side="left">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
}

import NavbarRoutes from "@/components/navbar-routes";
import { Course, Quiz, Recordings } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & { recordings: Recordings[]; tests: Quiz[] };
}
export default function CourseNavbar({ course }: CourseNavbarProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} />
      <NavbarRoutes teacher={true} />
    </div>
  );
}

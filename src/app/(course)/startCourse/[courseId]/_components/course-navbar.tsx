import NavbarRoutes from "@/components/navbar-routes";
import {
  Category,
  Course,
  PracticeTestRelations,
  Quiz,
  Recordings,
} from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

interface CourseNavbarProps {
  course: Course & {
    recordings: Recordings[];
    tests: Quiz[];
    category: Category | null;
    practiceTestRelations: PracticeTestRelations[];
  };
}
export default function CourseNavbar({ course }: CourseNavbarProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} />
      <SignedIn>
        <NavbarRoutes teacher={true} signedIn={true} />
      </SignedIn>
      <SignedOut>
        <NavbarRoutes teacher={true} signedIn={false} />
      </SignedOut>
    </div>
  );
}

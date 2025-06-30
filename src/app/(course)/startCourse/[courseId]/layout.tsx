import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      recordings: {
        where: { isPublished: true },
        orderBy: { createdAt: "asc" },
      },
      tests: {
        where: { isPublished: true },
        orderBy: { createdAt: "asc" },
      },
      category: true,
      practiceTestRelations: {
        include: { quiz: true },
      },
      QBank: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-80 fixed inset-y-0 w-full z-50'>
        <CourseNavbar course={course} />
      </div>

      <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
        <CourseSidebar course={course} />
      </div>
      <main className='md:pl-80 h-full pt-[80px]'>{children}</main>
    </div>
  );
}

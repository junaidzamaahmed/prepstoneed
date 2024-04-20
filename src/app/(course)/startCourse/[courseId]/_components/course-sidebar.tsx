import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course, Recordings } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & { recordings: Recordings[] };
}
export default async function CourseSidebar({ course }: CourseSidebarProps) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const purchase = await db.purchase.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Purchase check */}
      </div>
      <div className="flex flex-col w-full">
        {course.recordings.map((recording) => (
          <CourseSidebarItem
            key={recording.id}
            recording={recording}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
}

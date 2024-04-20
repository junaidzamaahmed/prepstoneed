import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      recordings: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  if (course.recordings.length === 0) {
    return redirect(`/`);
  }
  return redirect(
    `/startCourse/${params.courseId}/recordings/${course?.recordings[0]?.id}`
  );
}

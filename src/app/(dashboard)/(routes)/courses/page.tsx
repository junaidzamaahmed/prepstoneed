import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import CourseCard from "./_components/course-card";

export default async function CoursePage() {
  const { userId } = auth();
  const user = await db.user.findUnique({
    where: {
      externalId: userId!,
    },
    include: {
      purchases: true,
    },
  });
  const purchaseIds = user?.purchases.map((purchase) => purchase.courseId);
  const courses = await db.course.findMany({
    where: {
      id: {
        in: purchaseIds,
      },
    },
    include: {
      recordings: true,
    },
  });
  return (
    <div className="p-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No purchased courses
        </div>
      )}
    </div>
  );
}

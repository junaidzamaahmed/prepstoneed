import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import StudentsList from "./_components/students-list";
import { db } from "@/lib/db";

export default async function CourseStudents({
  params,
}: {
  params: { courseId: string };
}) {
  const purchases = await db.purchase.findMany({
    where: { courseId: params.courseId },
    include: {
      user: true,
    },
  });
  return (
    <div className="p-6">
      <div>
        <Link href={"/teacher/students"} className="flex text-sm">
          <ArrowLeft size={18} />
          Back{" "}
        </Link>
      </div>
      <div className="mb-4">
        <StudentsList purchases={purchases} />
      </div>
    </div>
  );
}

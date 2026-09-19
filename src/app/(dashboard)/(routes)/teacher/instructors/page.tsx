import { db } from "@/lib/db";
import CreateInstructorForm from "./_components/create-instructor-form";
import Instructors from "./_components/instructors";

export default async function InstructorsPage() {
  const instructors = await db.instructor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <CreateInstructorForm />
        <div className="mt-8">
          <h1 className="text-2xl">All Instructors</h1>
          <Instructors initialInstructors={instructors} />
        </div>
      </div>
    </div>
  );
}

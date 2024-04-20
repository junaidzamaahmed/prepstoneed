import EditInstructorForm from "./_components/edit-instructor";
import { db } from "@/lib/db";

export default async function EditInstructor({
  params,
}: {
  params: { instructorId: string };
}) {
  const instructor = await db.instructor.findUnique({
    where: {
      id: params.instructorId,
    },
  });

  return <EditInstructorForm instructor={instructor} />;
}

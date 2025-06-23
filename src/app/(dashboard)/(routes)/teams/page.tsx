import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import InstructorCard from "./_components/Instructor-card";

export default async function CoursePage() {
  const instructors = await db.instructor.findMany();

  return (
    <div className='p-6'>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
      {instructors.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-10'>
          No instructors found.
        </div>
      )}
    </div>
  );
}

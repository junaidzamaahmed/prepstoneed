import AccessForm from "./_components/access-form";
import { db } from "@/lib/db";
import AccessRequests from "./_components/access-requests";

export default async function GrantAccess() {
  const [users, courses, accessRequests] = await Promise.all([
    db.user.findMany({
      where: { role: "STUDENT" },
      select: { id: true, email: true },
      orderBy: { email: "asc" },
    }),
    db.course.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
    db.accessRequest.findMany({
      include: { user: true, course: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="p-16 mx-auto">
      <AccessForm users={users} courses={courses} />
      <AccessRequests accessRequests={accessRequests} courses={courses} />
    </div>
  );
}

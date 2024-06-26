import React from "react";
import AccessForm from "./_components/access-form";
import { db } from "@/lib/db";
import AccessRequests from "./_components/access-requests";

export default async function GrantAccess() {
  const users = await db.user.findMany({});
  const courses = await db.course.findMany();
  const accessRequests = await db.accessRequest.findMany({
    include: { user: true, course: true },
  });

  return (
    <div className="p-16 mx-auto">
      <AccessForm users={users} courses={courses} />
      <AccessRequests accessRequests={accessRequests} courses={courses} />
    </div>
  );
}

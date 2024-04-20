import React from "react";
import AccessForm from "./_components/access-form";
import { db } from "@/lib/db";

export default async function GrantAccess() {
  const users = await db.user.findMany({});
  const courses = await db.course.findMany();

  return (
    <div className="p-16 mx-auto">
      <AccessForm users={users} courses={courses} />
    </div>
  );
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await db.user.findUnique({
    where: { externalId: userId },
    select: { role: true },
  });
  if (user?.role !== "TEACHER") {
    return redirect("/");
  }

  return <>{children}</>;
};
export default TeacherLayout;

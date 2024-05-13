import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserTable } from "../../../_components/user-table";

export default async function Home() {
  const { userId } = auth();
  // let userRole = null;
  // if (userId) {
  //   userRole = await db.user.findUnique({
  //     where: {
  //       externalId: userId,
  //     },
  //   });
  // }

  const tests = await db.quiz.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      title: "asc",
    },
    include: {
      sections: {
        include: { questions: true },
      },
    },
  });
  // if (userRole?.role === "STUDENT") {
  //   return redirect("/");
  // }
  return (
    <div className="p-4">
      <h3 className="text-3xl font-semibold text-primary">
        Digital SAT Full tests
      </h3>
      <div>
        <UserTable data={tests} />
      </div>
    </div>
  );
}

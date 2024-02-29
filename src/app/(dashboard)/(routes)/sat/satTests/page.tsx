import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserTable } from "../../../_components/user-table";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const tests = await db.quiz.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      sections: {
        include: { questions: true },
      },
    },
  });
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

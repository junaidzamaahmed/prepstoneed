import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const TestsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const tests = await db.qBank.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={tests} />
    </div>
  );
};

export default TestsPage;

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NameForm } from "./_components/name-form";

const SectionIdPage = async ({
  params,
}: {
  params: {
    testId: string;
    sectionId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
    },
    include: {
      questions: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!section) {
    return redirect("/");
  }

  return (
    <div>
      <NameForm
        initialData={section}
        testId={params.testId}
        sectionId={params.sectionId}
      />
    </div>
  );
};

export default SectionIdPage;

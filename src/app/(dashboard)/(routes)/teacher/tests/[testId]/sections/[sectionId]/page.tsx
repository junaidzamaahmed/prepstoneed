import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NameForm } from "./_components/name-form";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, File, MessageCircleQuestion } from "lucide-react";
import { QuestionForm } from "./_components/question-form";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { SectionActions } from "./_components/actions";
import { PositionForm } from "./_components/position-form";
import DifficultyForm from "./_components/difficulty-form";

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
  const requiredFields = [
    section.difficulty,
    section.name,
    section.questions.find((question) => question.isPublished === true),
    section.position,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This section is unpublished. It will not be visible in this test."
        />
      )}
      <div className="mt-10 mx-4">
        <div>
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            href={`/teacher/tests/${params.testId}/`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to test setup
          </Link>
        </div>
        <div className="py-2 flex justify-end">
          <SectionActions
            disabled={!isComplete}
            sectionId={params.sectionId}
            testId={params.testId}
            isPublished={section.isPublished}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={File} />
          <h2 className="text-xl">Edit this section</h2>
        </div>
        <NameForm
          initialData={section}
          testId={params.testId}
          sectionId={params.sectionId}
        />
        <PositionForm
          initialData={section}
          testId={params.testId}
          sectionId={params.sectionId}
        />
        <DifficultyForm testId={params.testId} section={section} />
        <div className="mt-4 flex items-center gap-x-2">
          <IconBadge icon={MessageCircleQuestion} />
          <h2 className="text-xl">Questions</h2>
        </div>
        <QuestionForm
          initialData={section}
          testId={params.testId}
          sectionId={section.id}
        />
      </div>
    </>
  );
};

export default SectionIdPage;

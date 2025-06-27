import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, MessageCircleQuestion } from "lucide-react";
import { AnswerForm } from "./_components/answer-form";
import Link from "next/link";
import { AnswerActions } from "./_components/actions";

const SectionIdPage = async ({
  params,
}: {
  params: {
    testId: string;
    sectionId: string;
    questionId: string;
    answerId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const answer = await db.answer.findUnique({
    where: {
      id: params.answerId,
    },
  });
  if (!answer) {
    return redirect("/");
  }

  return (
    <div className="mt-10 mx-4">
      <div>
        <Link
          className="flex items-center text-sm hover:opacity-75 transition mb-6"
          href={`/teacher/tests/${params.testId}/sections/${params.sectionId}/`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to section setup
        </Link>
      </div>
      <div className="py-2 flex justify-end">
        <AnswerActions
          sectionId={params.sectionId}
          testId={params.testId}
          questionId={params.questionId}
          answerId={params.answerId}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <IconBadge icon={MessageCircleQuestion} />
        <h2 className="text-xl">Edit this Answer</h2>
      </div>
      <AnswerForm
        initialData={answer}
        testId={params.testId}
        sectionId={params.sectionId}
        questionId={params.questionId}
        answerId={params.answerId}
      />
    </div>
  );
};

export default SectionIdPage;

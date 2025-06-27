import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, ListChecks, MessageCircleQuestion } from "lucide-react";
import { ExplanationForm } from "./_components/explanation_form";
import { QuestionForm } from "./_components/question_form";
import { AnswerForm } from "./_components/answer-form";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { QuestionActions } from "./_components/actions";
import { ImageForm } from "./_components/image_form";

const QuestionIdPage = async ({
  params,
}: {
  params: {
    testId: string;
    sectionId: string;
    questionId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const question = await db.question.findUnique({
    where: {
      id: params.questionId,
    },
    include: {
      answers: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!question) {
    return redirect("/");
  }
  const requiredFields = [
    question.question,
    question.explanation,
    question.answers.find((answer) => answer.isCorrect === true),
  ];
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!question.isPublished && (
        <Banner
          variant="warning"
          label="This question is unpublished. It will not be visible in this test."
        />
      )}
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
          <QuestionActions
            disabled={!isComplete}
            sectionId={params.sectionId}
            testId={params.testId}
            questionId={question.id}
            isPublished={question.isPublished}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={MessageCircleQuestion} />
          <h2 className="text-xl">Edit this question</h2>
        </div>
        <QuestionForm
          initialData={question}
          testId={params.testId}
          sectionId={params.sectionId}
          questionId={params.questionId}
        />
        <ImageForm
          initialData={question}
          testId={params.testId}
          sectionId={params.sectionId}
          questionId={params.questionId}
        />
        <ExplanationForm
          initialData={question}
          testId={params.testId}
          sectionId={params.sectionId}
          questionId={params.questionId}
        />
        <div className="mt-4 flex items-center gap-x-2">
          <IconBadge icon={ListChecks} />
          <h2 className="text-xl">Answers</h2>
        </div>
        <AnswerForm
          initialData={question}
          testId={params.testId}
          questionId={params.questionId}
          sectionId={params.sectionId}
        />
      </div>
    </>
  );
};

export default QuestionIdPage;

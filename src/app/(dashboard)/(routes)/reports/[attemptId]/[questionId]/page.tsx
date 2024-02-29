import QuestionAnswer from "../../_components/question-answer";
import { db } from "@/lib/db";

async function Response({
  params,
}: {
  params: { attemptId: string; questionId: string };
}) {
  const { attemptId, questionId } = params;

  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      answers: true,
      responses: {
        where: {
          attemptID: attemptId,
          questionID: questionId,
        },
      },
    },
  });

  return (
    <div className="p-4">
      <QuestionAnswer response={question?.responses[0]} question={question} />
    </div>
  );
}

export default Response;

import { db } from "@/lib/db";
import Satreport from "./_components/satreport";
import DUReport from "./_components/DUReport";

export default async function Reports({
  params,
}: {
  params: { attemptId: string };
}) {
  const attempt = await db.quizAttempt.findUnique({
    where: {
      id: params.attemptId,
    },
    include: {
      user: true,
      quiz: {
        include: {
          sections: {
            orderBy: { position: "asc" },
            include: {
              questions: {
                orderBy: { position: "asc" },
                include: {
                  answers: true,
                  responses: {
                    where: {
                      attemptID: params.attemptId,
                    },
                  },
                  category: true,
                  tagRelations: {
                    include: {
                      tag: true,
                    },
                  },
                },
              },
            },
          },
          category: true,
        },
      },
    },
  });

  return (
    <>
      {attempt?.quiz.category?.name == "DSAT" ? (
        <Satreport attempt={attempt} params={params} />
      ) : (
        <DUReport attempt={attempt!} params={params} />
      )}
    </>
  );
}

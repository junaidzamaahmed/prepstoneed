import { MoreVertical } from "lucide-react";
import { db } from "@/lib/db";
import CountdownTimer from "./_components/countdown";
import Questions from "../_components/questions";
import { redirect } from "next/navigation";

export default async function TEST({
  params,
}: {
  params: { testId: string; attemptId: string };
}) {
  const test = await db.quiz.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      sections: {
        orderBy: { position: "asc" },
        include: {
          questions: {
            orderBy: { position: "asc" },
            include: {
              answers: {
                orderBy: { position: "asc" },
              },
              responses: {
                where: {
                  attemptID: params.attemptId,
                },
              },
            },
          },
        },
      },
    },
  });
  const attempt = await db.quizAttempt.findUnique({
    where: {
      id: params.attemptId,
    },
  });
  if (!attempt?.endTime || attempt?.completed) {
    return redirect(`/reports/${params.attemptId}`);
  }
  return (
    <div className="relative md:h-[calc(100vh-100px)]">
      <div className="flex justify-between p-3 border-b-2 border-primary border-dashed border-spacing-3">
        <div>
          <p className="text-lg font-semibold text-primary">{test?.title}</p>
        </div>
        <div className="flex align-middle">
          <span className="text-xl">
            <CountdownTimer
              attemptId={attempt.id}
              targetDate={attempt?.endTime}
            />
          </span>
          <button className="text-primary">
            <MoreVertical />
          </button>
        </div>
      </div>
      <Questions attempt={attempt} test={test} />
    </div>
  );
}

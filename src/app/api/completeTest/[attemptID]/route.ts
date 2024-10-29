import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { attemptID: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Calculate score using the following method: +1 for correct answer, -0.25 for incorrect answer and 0 for unattempted questions
    const attempt = await db.quizAttempt.findUnique({
      where: {
        id: params.attemptID,
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
                        attemptID: params.attemptID,
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
    const allQuestions = attempt?.quiz.sections.flatMap(
      (section) => section.questions
    );

    const score =
      attempt?.quiz?.category?.name != "SAT"
        ? allQuestions?.reduce((acc, question) => {
            if (question.responses.length === 0) {
              return acc;
            }
            return question.responses[0].isCorrect ? acc + 1 : acc - 0.25;
          }, 0)
        : 0;

    const complete = await db.quizAttempt.update({
      where: {
        id: params.attemptID,
      },
      data: {
        completed: true,
        score: score,
      },
    });
    return NextResponse.json(complete);
  } catch (error) {
    console.log("[COMPLETE_TEST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { attemptId: string; questionId: string } }
) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (data[0]?.input) {
      const quiz = await db.userResponse.upsert({
        where: {
          attemptID_questionID: {
            attemptID: params.attemptId,
            questionID: params.questionId,
          },
        },
        create: {
          attemptID: params.attemptId,
          questionID: params.questionId,
          isCorrect: data[1],
          inputText: data[0]?.input,
        },
        update: {
          isCorrect: data[1],
          inputText: data[0]?.input,
        },
      });
      return NextResponse.json(quiz);
    } else {
      const quiz = await db.userResponse.upsert({
        where: {
          attemptID_questionID: {
            attemptID: params.attemptId,
            questionID: params.questionId,
          },
        },
        create: {
          attemptID: params.attemptId,
          questionID: params.questionId,
          selectedAnswerID: data[0],
          isCorrect: data[1],
        },
        update: {
          selectedAnswerID: data[0],
          isCorrect: data[1],
        },
      });
      return NextResponse.json(quiz);
    }
  } catch (error) {
    console.log("[RESPONSE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

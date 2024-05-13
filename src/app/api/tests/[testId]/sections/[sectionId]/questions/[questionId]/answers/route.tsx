import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: { params: { testId: string; sectionId: string; questionId: string } }
) {
  try {
    const { userId } = auth();

    const { text } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const testOwner = await db.quiz.findUnique({
      where: {
        id: params.testId,
        userId,
      },
    });
    if (!testOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lastAnswer = await db.answer.findFirst({
      where: {
        questionID: params.questionId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastAnswer ? lastAnswer.position + 1 : 1;
    const isCorrect = newPosition == 1 ? true : false;
    const answer = await db.answer.create({
      data: {
        text: text,
        questionID: params.questionId,
        position: newPosition,
        isCorrect,
      },
    });
    return NextResponse.json(answer);
  } catch (error) {
    console.log("[ANSWERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

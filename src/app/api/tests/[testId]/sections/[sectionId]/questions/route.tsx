import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { testId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();

    const values = await req.json();
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
    const lastQuestion = await db.question.findFirst({
      where: {
        sectionId: params.testId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;
    const section = await db.question.create({
      data: {
        question: values.question,
        sectionId: params.sectionId,
        position: newPosition,
        imageUrl: values.imageUrl,
        explanation: values.explanation,
        isPublished: true,
        answers: {
          create: values.answers.map((a: any) => ({
            text: a.text,
            isCorrect: a.isCorrect,
            position: a.position,
          })),
        },
      },
      include: { answers: true },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[QUESTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

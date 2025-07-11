// /api/qbanks/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { quizId, newChapterId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedQuiz = await db.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        qbankChapterId: newChapterId, 
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.log("[QBANK_MOVE_QUIZ_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

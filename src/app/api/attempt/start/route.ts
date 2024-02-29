import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { testId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const test = await db.quiz.findUnique({
      where: {
        id: testId,
      },
    });
    const user = await db.user.findUnique({
      where: {
        externalId: userId,
      },
    });
    if (!test || !user) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const endTime = new Date().getTime() + test?.duration * 1000 + 5000;

    const attempt = await db.quizAttempt.create({
      data: {
        userID: user?.id,
        quizID: testId,
        endTime: new Date(endTime),
      },
    });
    return NextResponse.json(attempt);
  } catch (error) {
    console.log("[ATTEMPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

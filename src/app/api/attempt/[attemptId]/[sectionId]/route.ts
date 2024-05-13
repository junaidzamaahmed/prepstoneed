import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { attemptId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();
    const { attemptId, sectionId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(attemptId, sectionId);
    const attempt = await db.quizAttempt.findUnique({
      where: {
        id: attemptId,
      },
    });

    if (!attempt) {
      return new NextResponse("Not Found", { status: 404 });
    }
    attempt.sections.push(sectionId);
    const attemptRes = await db.quizAttempt.update({
      where: { id: attemptId },
      data: {
        sections: attempt.sections,
      },
    });
    return NextResponse.json(attemptRes);
  } catch (error) {
    console.log("[ATTEMPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

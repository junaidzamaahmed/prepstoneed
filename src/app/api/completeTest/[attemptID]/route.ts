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
    const attempt = await db.quizAttempt.update({
      where: {
        id: params.attemptID,
      },
      data: {
        completed: true,
      },
    });
    return NextResponse.json(attempt);
  } catch (error) {
    console.log("[COMPLETE_TEST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

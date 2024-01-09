import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { testId: string; sectionId: string; questionId: string } }
) {
  try {
    const { userId } = auth();
    const { testId, questionId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const testOwner = await db.quiz.findUnique({
      where: {
        id: testId,
        userId: userId,
      },
    });
    if (!testOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const question = await db.question.delete({
      where: {
        id: questionId,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { testId: string; sectionId: string; questionId: string } }
) {
  try {
    const { userId } = auth();
    const { testId, sectionId, questionId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const testOwner = await db.quiz.findUnique({
      where: {
        id: testId,
        userId: userId,
      },
    });
    if (!testOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const question = await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      testId: string;
      sectionId: string;
      questionId: string;
      answerId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { testId, answerId } = params;
    // const values = await req.json();

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

    const answer = await db.answer.delete({
      where: {
        id: answerId,
      },
    });
    return NextResponse.json(answer);
  } catch (error) {
    console.log("[ANSWER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      testId: string;
      sectionId: string;
      questionId: string;
      answerId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { testId, sectionId, questionId, answerId } = params;
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

    const answer = await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(answer);
  } catch (error) {
    console.log("[ANSWER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

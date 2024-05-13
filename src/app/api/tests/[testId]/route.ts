import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = auth();
    const { testId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const test = await db.quiz.delete({
      where: {
        id: testId,
      },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = auth();
    const { testId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const test = await db.quiz.update({
      where: {
        id: testId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

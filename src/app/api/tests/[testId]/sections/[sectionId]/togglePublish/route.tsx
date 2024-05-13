import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { testId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();
    const { testId } = params;
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
    const question = await db.section.update({
      where: {
        id: params.sectionId,
      },
      data: {
        isPublished: values.isPublished,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { testId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();
    const { testId, sectionId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const testOwner = await db.quiz.findUnique({
    //   where: {
    //     id: testId,
    //     userId: userId,
    //   },
    // });
    // if (!testOwner) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const section = await db.section.delete({
      where: {
        id: sectionId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { testId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();
    const { testId, sectionId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const testOwner = await db.quiz.findUnique({
    //   where: {
    //     id: testId,
    //     userId: userId,
    //   },
    // });
    // if (!testOwner) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const section = await db.section.update({
      where: {
        id: sectionId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

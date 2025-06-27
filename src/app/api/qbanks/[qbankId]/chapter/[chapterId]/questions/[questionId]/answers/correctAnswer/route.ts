import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: { params: { qbankId: string; chapterId: string; questionId: string } }
) {
  try {
    const { userId } = auth();

    const { list } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const testOwner = await db.quiz.findUnique({
    //   where: {
    //     id: params.testId,
    //     userId,
    //   },
    // });
    // if (!testOwner) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    for (let item of list) {
      await db.answer.update({
        where: {
          id: item.id,
        },
        data: {
          isCorrect: item.isCorrect,
        },
      });
    }
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

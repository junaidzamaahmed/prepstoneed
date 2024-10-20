import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = auth();

    const { name } = await req.json();
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
    const lastSection = await db.section.findFirst({
      where: {
        quizId: params.testId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastSection ? lastSection.position + 1 : 1;
    const section = await db.section.create({
      data: {
        name,
        quizId: params.testId,
        position: newPosition,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[SECTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

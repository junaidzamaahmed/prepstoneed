import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const practiceTestRelation = await db.practiceTestRelations.create({
      data: {
        courseId: values.courseId,
        quizId: values.quizId,
      },
    });
    return NextResponse.json(practiceTestRelation);
  } catch (error) {
    console.log("[TESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const values = await req.json();
    await db.practiceTestRelations.delete({
      where: {
        courseId_quizId: {
          courseId: values.courseId,
          quizId: values.quizId,
        },
      },
    });
    return NextResponse.json({});
  } catch (error) {
    console.log("[TESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

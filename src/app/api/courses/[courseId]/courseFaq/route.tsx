import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const { question, answer } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const section = await db.fAQ.create({
      data: {
        question,
        answer,
        courseId: params.courseId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[COURSE_FAQ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { id } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await db.courseFeatures.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[COURSE_FAQ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

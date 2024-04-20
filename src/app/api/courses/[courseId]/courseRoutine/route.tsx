import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const { title, day, time } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const section = await db.courseRoutine.create({
      data: {
        title,
        day,
        time,
        courseId: params.courseId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[COURSE_ROUTINE]", error);
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
    await db.courseRoutine.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[COURSE_ROUTINE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

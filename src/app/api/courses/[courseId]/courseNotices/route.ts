import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title, subtitle, date } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const section = await db.courseNotice.create({
      data: {
        courseId: params.courseId,
        title,
        subtitle,
        date,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[COURSE_POINT]", error);
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
    const section = await db.courseNotice.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[COURSE_POINT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

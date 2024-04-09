import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lastSection = await db.recordings.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastSection ? lastSection.position + 1 : 1;
    const section = await db.recordings.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[RECORDINGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

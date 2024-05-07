import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { recordingId: string; courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, recordingId } = params;
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
    const question = await db.recordings.update({
      where: {
        id: recordingId,
      },
      data: {
        isPublished: values.isPublished,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[RECORDING_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

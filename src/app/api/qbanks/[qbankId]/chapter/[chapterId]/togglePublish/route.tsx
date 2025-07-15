import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { qbankId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { qbankId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const question = await db.qBankChapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        isPublished: values.isPublished,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// /api/qbanks/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: { params: { qbankId: string; chapterId: string;} }
) {
  try {
    const { userId } = auth();
    const { content } = await req.json();
    const {chapterId} = params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const qbank = await db.theoryBlock.create({
      data: {
        content: content,
        chapterId: chapterId,
        position: 0
      },
    });

    return NextResponse.json(qbank);
  } catch (error) {
    console.log("[THEORY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

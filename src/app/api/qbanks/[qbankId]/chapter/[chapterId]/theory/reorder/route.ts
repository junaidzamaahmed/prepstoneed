import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { qbankId: string, chapterId:string; } }
) {
  try {
    const { userId } = auth();
    const { list } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    for (let item of list) {
      await db.theoryBlock.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[THEORY_REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

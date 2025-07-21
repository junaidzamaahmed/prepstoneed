import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { qbankId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { qbankId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.qBankChapter.delete({
      where: {
        id: chapterId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[Chapter_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { qbankId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { qbankId, chapterId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.qBankChapter.update({
      where: {
        id: chapterId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[Chapter_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

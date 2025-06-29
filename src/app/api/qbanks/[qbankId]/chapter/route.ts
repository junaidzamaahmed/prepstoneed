import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { qbankId: string } }
) {
  try {
    const { userId } = auth();

    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lastSection = await db.qBankChapter.findFirst({
      where: {
        id: params.qbankId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastSection ? lastSection.position + 1 : 1;
    const section = await db.qBankChapter.create({
      data: {
        title,
        qbankId: params.qbankId,
        position: newPosition,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[SECTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

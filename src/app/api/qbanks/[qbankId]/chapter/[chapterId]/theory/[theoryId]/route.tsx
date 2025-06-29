import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { qbankId: string; chapterId: string, theoryId: string } }
) {
  try {
    const { userId } = auth();
    const { theoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.theoryBlock.delete({
      where: {
        id: theoryId,
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
  { params }: { params: { qbankId: string; chapterId: string, theoryId: string } }
) {
  try {
    const { userId } = auth();
    const { theoryId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.theoryBlock.update({
      where: {
        id: theoryId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[THEORY_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function GET(
  req: Request,
  { params }: { params: { qbankId: string; chapterId: string, theoryId: string } }
) {
  try {
    const { userId } = auth();
    const { theoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.theoryBlock.findUnique({
      where: {
        id: theoryId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[Theory_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
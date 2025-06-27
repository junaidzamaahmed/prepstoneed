import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { qbankId: string } }
) {
  try {
    const { userId } = auth();
    const { qbankId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const test = await db.qBank.delete({
      where: {
        id: qbankId,
      },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { qbankId: string } }
) {
  try {
    const { userId } = auth();
    const { qbankId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const test = await db.qBank.update({
      where: {
        id: qbankId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.log("[TEST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

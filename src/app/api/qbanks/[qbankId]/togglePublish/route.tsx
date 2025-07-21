import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

    const qBank = await db.qBank.update({
      where: {
        id: params.qbankId,
      },
      data: {
        isPublished: values.isPublished,
      },
    });
    return NextResponse.json(qBank);
  } catch (error) {
    console.log("[QBank_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

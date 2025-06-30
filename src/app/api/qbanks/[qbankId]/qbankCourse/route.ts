import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { qbankId: string } }
) {
  try {
    const values = await req.json();
    const courseQBankRelation = await db.courseQBankRelation.create({
      data: {
        courseId: values.courseId,
        qbankId: params.qbankId,
      },
    });
    return NextResponse.json(courseQBankRelation);
  } catch (error) {
    console.log("[QBANK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { qbankId: string } }
) {
  try {
    const values = await req.json();
    console.log("dsafas"+values)
    const courseQBankRelation = await db.courseQBankRelation.delete({
      where: {
        courseId_qbankId: {
          courseId: values.courseId,
          qbankId: params.qbankId,
        },
      },
    });

    return NextResponse.json(courseQBankRelation);
  } catch (error) {
    console.log("[QBANK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

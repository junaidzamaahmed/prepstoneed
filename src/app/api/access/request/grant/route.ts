import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: values.userId,
          courseId: values.courseId,
        },
      },
    });
    if (purchase) {
      return new NextResponse("Already has access", { status: 404 });
    }
    // const access = await db.purchase.create({
    //   data: {
    //     userId: uid,
    //     courseId: cid,
    //   },
    // });
    const success = await db.$transaction([
      db.purchase.create({
        data: {
          userId: values.userId,
          courseId: values.courseId,
          trxId: values.trxId,
          phone: values.phone,
        },
      }),
      db.accessRequest.delete({
        where: {
          id: values.id,
        },
      }),
    ]);
    return NextResponse.json(success);
  } catch (error) {
    console.log("[ATTEMPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

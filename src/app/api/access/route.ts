import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { uid, cid } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: uid,
          courseId: cid,
        },
      },
    });
    if (purchase) {
      return new NextResponse("Already has access", { status: 404 });
    }
    const access = await db.purchase.create({
      data: {
        userId: uid,
        courseId: cid,
      },
    });
    return NextResponse.json(access);
  } catch (error) {
    console.log("[ATTEMPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// /api/qbanks/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 
    const qbank = await db.qBank.create({
      data: {
        title: title,
      },
    });

    return NextResponse.json(qbank);
  } catch (error) {
    console.log("[QBANK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

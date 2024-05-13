"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();
    console.log("[ACCESS_REQUEST]", values, userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const access = await db.accessRequest.create({
      data: {
        userId: values.userId,
        courseId: values.courseId,
        phone: values.phone,
        trxId: values.trxId,
      },
    });
    console.log(access);
    return NextResponse.json(access);
  } catch (error) {
    console.log("[ACCESS_REQUEST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

"use server";
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
    console.log("[ACCESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const headers = req.headers;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const purchase = await db.purchase.delete({
      where: {
        id: headers.get("id")!,
      },
    });
    return NextResponse.json(purchase);
  } catch (error) {
    console.log("[ACCESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

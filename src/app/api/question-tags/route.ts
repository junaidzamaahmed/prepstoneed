import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const questionTag = await db.questionTag.create({
      data: {
        name: values.name,
      },
    });
    return NextResponse.json(questionTag);
  } catch (error) {
    console.log("[QuestionTag]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

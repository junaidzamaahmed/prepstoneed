import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const questionCategory = await db.questionCategory.create({
      data: {
        name: values.name,
      },
    });
    return NextResponse.json(questionCategory);
  } catch (error) {
    console.log("[QuestionCategory]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

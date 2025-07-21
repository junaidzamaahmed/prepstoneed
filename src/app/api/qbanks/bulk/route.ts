import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const qbank = await db.qBank.create({
      data: {
        courseId: data.courseId,
        title: data.title,
        chapters: {
          create: data.chapters.map((chapter: any) => ({
            title: chapter.title,
            theoryBlocks: {
              create: chapter.theory.map((block: any, index: number) => ({
                content: block.content,
                position: block.position ?? index,
              })),
            },
            practiceQuestions: {
              create: chapter.practice.map((question: any) => ({
                question: question.question,
                explanation: question.explanation,
                position: question.position,
                qtype: question.qtype ?? "MCQ",
                answers: {
                  create: question.answers.map((ans: any) => ({
                    text: ans.text,
                    isCorrect: ans.isCorrect,
                    position: ans.position,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        chapters: {
          include: {
            theoryBlocks: true,
            practiceQuestions: {
              include: {
                answers: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(qbank);
  } catch (error) {
    console.error("[QBANK_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

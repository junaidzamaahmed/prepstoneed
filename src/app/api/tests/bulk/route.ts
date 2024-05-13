import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const test = await req.json();
    console.log(test);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const quiz = await db.quiz.create({
      data: {
        userId: userId,
        title: test?.title,
        description: test?.description,
        duration: test?.duration,
        price: test?.price,
        isPublished: true,
        sections: {
          create: test.sections.map((sec: any) => ({
            name: sec.name,
            isPublished: true,
            position: sec.position,
            questions: {
              create: sec.questions.map((q: any) => ({
                question: q.question,
                explanation: q.explanation,
                imageUrl: q.imageUrl,
                isPublished: true,
                position: q.position,
                answers: {
                  create: q.answers.map((a: any) => ({
                    position: a.position,
                    isCorrect: a.isCorrect,
                    text: a.text,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        sections: true,
      },
    });
    return NextResponse.json(quiz);

    //   const sections = await db.section.createMany({
    //       data: test.sections.map((section:any) => {
    //         return { name: section.name, quizId:quiz.id,}

    //       })
    //   })
  } catch (error) {
    console.log("[TESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

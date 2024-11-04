import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const leaderboard = await db.leaderboardInfo.create({
      data: {
        quizId: params.testId,
      },
    });
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.log("[LEADERBOARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = auth();
    const { values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const leaderboard = await db.leaderboardInfo.update({
      where: {
        id: values.id,
      },
      data: {
        limit: values.limit,
        show: values.show,
      },
    });
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.log("[LEADERBOARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

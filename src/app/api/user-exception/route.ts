import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leaderboardInfoId, userId } = await req.json();
    const leaderboardUserExceptions = await db.leaderboardUserExceptions.create(
      {
        data: {
          leaderboardInfoId,
          userId,
        },
      }
    );
    return NextResponse.json(leaderboardUserExceptions);
  } catch (error) {
    console.log("[LEADERBOARD_EXCEPTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const values = await req.json();
    if (!values.leaderboardInfoId || !values.userId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    await db.leaderboardUserExceptions.delete({
      where: {
        userId_leaderboardInfoId: {
          leaderboardInfoId: values.leaderboardInfoId,
          userId: values.userId,
        },
      },
    });
    return NextResponse.json({});
  } catch (error) {
    console.log("[TESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

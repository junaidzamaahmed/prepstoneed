import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const user = await db.user.findUnique({
      where: {
        externalId: userId,
      },
      include: {
        browserFingerprint: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[BROWSER_FINGERPRINTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

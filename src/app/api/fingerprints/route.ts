import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  try {
    const user = await db.user.findUnique({
      where: {
        externalId: userId!,
      },
    });
    const browserFingerprint = await db.browserFingerprint.findMany({
      where: {
        userId: user?.id,
      },
    });
    return NextResponse.json(browserFingerprint);
  } catch (error) {
    console.log("[BROWSER_FINGERPRINTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  const fingerprint = await req.json();
  try {
    const user = await db.user.findUnique({
      where: {
        externalId: userId!,
      },
    });
    const browserFingerprint = await db.browserFingerprint.create({
      data: {
        fingerprint,
        userId: user?.id!,
      },
    });
    return NextResponse.json(browserFingerprint);
  } catch (error) {
    console.log("[BROWSER_FINGERPRINTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

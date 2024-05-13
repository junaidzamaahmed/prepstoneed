import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; recordingId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, recordingId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const section = await db.recordings.delete({
      where: {
        id: recordingId,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("[RECORDING_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; recordingId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, recordingId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const section = await db.recordings.update({
      where: {
        id: recordingId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          recordingId: params.recordingId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
          recordingId: params.recordingId,
        },
      });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.log("[RECORDING_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { Recordings } from "@prisma/client";

interface GetRecordingProps {
  recordingId: string;
  courseId: string;
  userId: string;
}
export const getRecording = async ({
  recordingId,
  courseId,
  userId,
}: GetRecordingProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { price: true },
    });
    const recording = await db.recordings.findUnique({
      where: { id: recordingId, isPublished: true },
    });
    if (!course || !recording) {
      throw new Error("Course or recording not found");
    }
    let muxData = null;
    let nextRecording: Recordings | null = null;
    // IF purchase exists, return muxData
    if (true) {
      muxData = await db.muxData.findUnique({
        where: { recordingId },
      });
      nextRecording = await db.recordings.findFirst({
        where: { courseId, createdAt: { lt: recording.createdAt } },
        orderBy: { createdAt: "desc" },
      });
      return {
        recording,
        course,
        muxData,
        nextRecording,
        purchase,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      recording: null,
      course: null,
      muxData: null,
      nextRecording: null,
      purchase: null,
    };
  }
};

import { db } from "@/lib/db";

interface GetQBankProps {
  qBankId: string;
  courseId: string;
  userId: string;
}
export const getQBanks = async ({
  qBankId,
  courseId,
  userId,
}: GetQBankProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: { userId_courseId: { userId: userId || "", courseId } },
    });

    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { price: true, title:true },
    });

    const qbank = await db.qBank.findUnique({
      where: { id: qBankId, isPublished: true },
      include:{
        chapters: {
          include:{
            theoryBlocks: true,
            questions: true
          }
        }
      }
    });
    if (!course || !qbank) {
      throw new Error("Course or recording not found");
    }
    return{
      course,
      qbank, 
      purchase
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

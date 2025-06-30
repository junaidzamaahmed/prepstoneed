import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getQBanks } from "@/actions/get-qbanks";
import { QBankChapters } from "./_components/qbank-chapters";

export default async function RecordingPage({
  params,
}: {
  params: { courseId: string; qBankId: string };
}) {
  const { userId } = auth();

  let user = null;
  if (userId) {
    user = await db.user.findUnique({
      where: { externalId: userId },
    });
  }

  const qbank = await getQBanks({
    qBankId: params.qBankId,
    courseId: params.courseId,
    userId: user?.id!,
  });

  if (!qbank?.qbank || !qbank?.course) {
    return redirect("/");
  }

  return (
    <div className='flex flex-col max-w-6xl mx-auto pb-20 px-4'>
      <div className='mb-8'>
        <div className='p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {qbank?.qbank?.title}
              </h1>
              <p className='text-gray-600'>Course: {qbank.course.title}</p>
              <div className='flex items-center gap-4 mt-3 text-sm text-gray-500'>
                <span>{qbank?.qbank?.chapters?.length || 0} Chapters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        <QBankChapters chapters={qbank?.qbank?.chapters || []} />
      </div>
    </div>
  );
}
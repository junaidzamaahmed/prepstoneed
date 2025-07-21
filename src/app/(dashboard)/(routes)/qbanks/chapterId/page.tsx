import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Button } from "./_components/button";
import { Banner } from "@/components/banner";

const QuizDetailsPage = async ({
  params,
}: {
  params: { chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  let disabled = false;
  const user = await db.user.findUnique({
    where: {
      externalId: userId,
    },
  });
  const qbanks = await db.qBankChapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      theoryBlocks: {
        orderBy: { position: "asc" },
      },
      practiceQuestions: {
        orderBy: { position: "asc" },
        include: { answers: { orderBy: { position: "asc" } } },
      },

      qbank: {
        include: {
          course: {
            include: {
              purchases: {
                where: {
                  userId: user?.id,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!qbanks?.qbank?.course?.purchases.length) {
    disabled = true;
  }

  if (!qbanks) {
    return redirect("/");
  }

  let questions = 0;

  return (
    <div className='bg-gray-100 flex align-middle h-[calc(100vh-80px)]'>
      <div className='container mx-auto my-auto'>
        <div className='max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='px-6 py-4'>

            <h2 className='text-2xl font-bold mb-2'>Details</h2>
            <p className='mb-4'>
              Name: <span className='font-bold'>{qbanks.title}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsPage;

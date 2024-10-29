import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Button } from "./_components/button";
import { Banner } from "@/components/banner";

const QuizDetailsPage = async ({ params }: { params: { testId: string } }) => {
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
  const test = await db.quiz.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      sections: {
        orderBy: { position: "asc" },
        include: { questions: { orderBy: { position: "asc" } } },
      },
      category: true,
      course: {
        include: {
          purchases: {
            where: {
              userId: user?.id,
            },
          },
        },
      },
      attempts: true,
    },
  });

  const userAttempts = test?.attempts.filter(
    (attempt) => attempt.userID === user?.id
  );

  if (!test?.course?.purchases.length) {
    disabled = true;
  }

  if (userAttempts?.length && userAttempts?.length >= 3) {
    disabled = true;
  }
  if (!test) {
    return redirect("/");
  }
  let questions = 0;
  test.sections.forEach((section) => {
    questions += section.questions.length;
  });
  const isTestFree = test?.isFree;

  return (
    <div className="bg-gray-100 flex align-middle h-[calc(100vh-80px)]">
      <div className="container mx-auto my-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            {!isTestFree && !test?.course?.purchases.length && (
              <Banner
                label="You do not have access to this test. Please contact us for access."
                variant="warning"
              />
            )}

            <h2 className="text-2xl font-bold mb-2">Details</h2>
            <p className="mb-4">
              Name: <span className="font-bold">{test.title}</span>
            </p>
            <div className="flex items-center mb-4">
              <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2">
                {new Date(parseInt(test.duration.toString()) * 1000)
                  .toISOString()
                  .substring(11, 16)}{" "}
                hour(s)
              </span>
              <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2">
                {test.sections.length} section(s)
              </span>
              <span className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2">
                {questions} question(s)
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <div className="text-gray-600">
                <Preview value={test?.description || ""} />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Price</h3>
              <p className="text-slate-600">
                {test.price === 0 ? "Free" : `${test.price} Taka`}
              </p>
            </div>
            {userAttempts?.length != undefined && userAttempts?.length >= 3 && (
              <Banner
                label="You have crossed your attempt limit. You can not attempt this test anymore."
                variant="warning"
              />
            )}
            <Button
              className="mt-1"
              disabled={isTestFree ? false : disabled}
              category={test?.category!}
            >
              Start Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsPage;

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Button } from "./_components/button";

const QuizDetailsPage = async ({ params }: { params: { testId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const test = await db.quiz.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      sections: {
        orderBy: { position: "asc" },
        include: { questions: { orderBy: { position: "asc" } } },
      },
    },
  });
  if (!test) {
    return redirect("/");
  }
  let questions = 0;
  test.sections.forEach((section) => {
    questions += section.questions.length;
  });

  return (
    <div className="bg-gray-100 flex align-middle h-[calc(100vh-80px)]">
      <div className="container mx-auto my-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
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
                {test.price === 0 ? "Free" : test.price} Taka
              </p>
            </div>
            <Button>Start Test</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsPage;

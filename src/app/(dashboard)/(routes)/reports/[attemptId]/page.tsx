import { db } from "@/lib/db";
import { Check, CheckCircle2, Dot, Pen, X } from "lucide-react";
import Link from "next/link";

export default async function Reports({
  params,
}: {
  params: { attemptId: string };
}) {
  const attempt = await db.quizAttempt.findUnique({
    where: {
      id: params.attemptId,
    },
    include: {
      user: true,
      quiz: {
        include: {
          sections: {
            orderBy: { position: "asc" },
            include: {
              questions: {
                orderBy: { position: "asc" },
                include: {
                  answers: true,
                  responses: {
                    where: {
                      attemptID: params.attemptId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  let score = 0;
  attempt?.quiz.sections.forEach((section) => {
    if (attempt.sections.includes(section.id)) {
      section.questions.forEach((question) => {
        question.responses.forEach((response) => {
          if (response.isCorrect) {
            score++;
          }
        });
      });
    }
  });
  let totalQuestions = 0;
  attempt?.quiz.sections.forEach((section) => {
    section.questions.forEach((question) => {
      totalQuestions++;
    });
  });
  const ansAlphabet = [null, "A", "B", "C", "D", "E", "F"];

  const eng1 = [
    0, 0, 2, 4, 6, 7, 8, 9, 10, 10, 11, 11, 12, 13, 14, 16, 17, 19, 21, 22, 24,
    26, 27, 29, 31, 33, 34, 36,
  ];
  const eng2 = [
    0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 7, 9, 9, 10, 11, 13, 14, 15, 16, 18,
    19, 20, 21, 23, 23,
  ];
  const mat1 = [
    0, 0, 2, 4, 6, 6, 8, 8, 10, 10, 11, 14, 16, 18, 20, 22, 24, 26, 29, 31, 33,
    35, 37,
  ];
  const mat2 = [
    0, 0, 0, 2, 2, 3, 5, 7, 7, 7, 9, 9, 10, 10, 11, 13, 14, 16, 17, 19, 20, 22,
    23,
  ];

  // Create a SAT raw to scaled score conversion function
  const attSecs = attempt?.quiz.sections.filter((section) =>
    attempt.sections.includes(section.id)
  );
  let eng1Score = 0;
  if (!attSecs) {
    return;
  }
  attSecs[0]?.questions.forEach((question) => {
    question.responses.forEach((response) => {
      if (response.isCorrect) {
        eng1Score++;
      }
    });
  });
  let eng2Score = 0;
  if (!attSecs) {
    return;
  }
  attSecs[1]?.questions.forEach((question) => {
    question.responses.forEach((response) => {
      if (response.isCorrect) {
        eng2Score++;
      }
    });
  });
  let mat1Score = 0;
  if (!attSecs) {
    return;
  }
  attSecs[1]?.questions.forEach((question) => {
    question.responses.forEach((response) => {
      if (response.isCorrect) {
        mat1Score++;
      }
    });
  });
  let mat2Score = 0;
  if (!attSecs) {
    return;
  }
  attSecs[1]?.questions.forEach((question) => {
    question.responses.forEach((response) => {
      if (response.isCorrect) {
        mat2Score++;
      }
    });
  });
  return (
    <div className="mx-auto p-4">
      <div className="bg-primary/30 text-center flex justify-center p-2">
        <CheckCircle2 className="text-primary" />
        <span>Completed</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <p className="text-[6rem] text-primary font-bold">SAT</p>
        <div className="pt-8">
          <p>
            <span className="font-bold">Email: </span>
            {attempt?.user?.email}
          </p>
          <p>
            <span className="font-bold">Total Score: </span>
            {score}/{totalQuestions}
          </p>
          <p>
            <span className="font-bold">Test Name: </span>
            {attempt?.quiz.title}
          </p>
          <p>
            <span className="font-bold">Test Date: </span>
            {attempt?.startTime.toDateString()}
          </p>
        </div>
      </div>
      <p className="pt-4 text-primary font-semibold">Your Total Score</p>
      <div className="py-2">
        <p className="inline pr-3 text-4xl font-semibold border-r-4 border-gray-300 border border-t-0 border-l-0 border-b-0">
          {200 +
            mat1Score * 10 +
            mat2Score * 10 +
            200 +
            eng1Score * 10 +
            eng2Score * 10}
        </p>
        <span className="px-3 text-sm pb-1">400 to 800</span>
      </div>
      <p className="text-primary font-semibold pt-4">Your Section Scores</p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="py-2">
          <p className="inline pr-3 text-4xl font-semibold border-r-4 border-gray-300 border border-t-0 border-l-0 border-b-0">
            {200 + eng1Score * 10 + eng2Score * 10}
          </p>
          <span className="px-3 text-sm pb-1">400 to 800</span>
          <p className="font-semibold text-sm text-gray-500">
            Your English Score
          </p>
        </div>
        <div className="py-2">
          <p className="inline pr-3 text-4xl font-semibold border-r-4 border-gray-300 border border-t-0 border-l-0 border-b-0">
            {200 + mat1Score * 10 + mat2Score * 10}
          </p>
          <span className="px-3 text-sm pb-1">400 to 800</span>
          <p className="font-semibold text-sm text-gray-500">Your Math Score</p>
        </div>
      </div>
      {/* <p className="pt-4 text-primary font-semibold">Prediction Scores</p>
      <div className="py-2">
        <p className="inline pr-3 text-4xl font-semibold border-r-4 border-gray-300 border border-t-0 border-l-0 border-b-0">
          400 - 800
        </p>
        <span className="px-3 text-sm pb-1">400 to 1600</span>
      </div> */}

      {attempt?.quiz.sections.map((section) => {
        return (
          attempt.sections.includes(section.id) && (
            <div key={section.id} className="py-4">
              <p>
                {attempt?.quiz?.title} Section {section.name}
              </p>
              <div className="grid grid-flow-col auto-cols-max divide-x-2">
                <div className="grid grid-cols-1 border-primary border border-1 font-semibold bg-primary text-white divide-y-2">
                  <div className="p-2">#</div>
                  <div className="p-2">Your Answer</div>
                  <div className="p-2">Correct Answer</div>
                </div>
                {section.questions.map((question) => (
                  <Link
                    key={question.id}
                    href={`/reports/${params.attemptId}/${question.id}`}
                  >
                    <div className="grid grid-cols-1 border-primary border border-1 font-semibold divide-y-2 hover:opacity-40 cursor-pointer">
                      <div className="p-2 bg-primary text-white">
                        {question.position}
                      </div>
                      <div className="p-2 bg-white flex">
                        {question.answers.find(
                          (ans) =>
                            ans?.id ===
                            question.responses.find(
                              (response) => response.attemptID === attempt.id
                            )?.selectedAnswerID
                        ) ? (
                          <div>
                            {
                              // Convert answer position to alphabet
                              ansAlphabet[
                                question?.answers?.find(
                                  (ans) =>
                                    ans?.id ===
                                    question.responses.find(
                                      (response) =>
                                        response.attemptID === attempt.id
                                    )?.selectedAnswerID
                                )?.position || 0
                              ]
                            }
                          </div>
                        ) : question.responses.find(
                            (response) => response.attemptID === attempt.id
                          )?.inputText ? (
                          <Pen className="text-primary" />
                        ) : (
                          <Dot className="text-red-500" />
                        )}
                      </div>
                      <div className="p-2 bg-white flex">
                        {question.answers.find(
                          (ans) =>
                            ans?.id ===
                            question.responses.find(
                              (response: any) =>
                                response.attemptID === attempt.id
                            )?.selectedAnswerID
                        )?.isCorrect ? (
                          <Check className=" text-green-600" />
                        ) : (
                          <X className="text-red-500" />
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

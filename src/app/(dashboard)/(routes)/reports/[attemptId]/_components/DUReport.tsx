"use client";

import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { Preview } from "@/components/preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  question: string;
  explanation: string | null;
  category: { name: string } | null;
  tagRelations: { tag: { name: string } }[];
  answers: Answer[];
  responses: {
    id: string;
    selectedAnswerID: string | null;
    isCorrect: boolean;
    inputText: string | null;
  }[];
};

type Section = {
  id: string;
  name: string;
  questions: Question[];
};

type QuizAttempt = {
  id: string;
  userID: string;
  quizID: string;
  score: number;
  percentage: number;
  startTime: Date;
  endTime: Date | null;
  completed: boolean | null;
  sections: string[];
  user: {
    fullName: string | null;
  };
  quiz: {
    title: string;
    category: { name: string } | null;
    sections: Section[];
  };
};

export default function DUReport({
  attempt,
  params,
}: {
  attempt: QuizAttempt;
  params: any;
}) {
  const allQuestions = attempt?.quiz.sections.flatMap(
    (section) => section.questions
  );
  const totalQuestions = allQuestions.length;
  const attemptedQuestions = allQuestions.filter(
    (q) => q.responses.length > 0
  ).length;
  const correctAnswers = allQuestions.filter(
    (q) => q.responses[0]?.isCorrect
  ).length;
  const incorrectAnswers = attemptedQuestions - correctAnswers;
  const unattemptedQuestions = totalQuestions - attemptedQuestions;

  const categoryPerformance = allQuestions.reduce((acc, question) => {
    const category = question.category?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = { correct: 0, incorrect: 0, unattempted: 0 };
    }
    if (question.responses.length === 0) {
      acc[category].unattempted++;
    } else if (question.responses[0].isCorrect) {
      acc[category].correct++;
    } else {
      acc[category].incorrect++;
    }
    return acc;
  }, {} as Record<string, { correct: number; incorrect: number; unattempted: number }>);

  const tagPerformance = allQuestions.reduce((acc, question) => {
    question.tagRelations.forEach(({ tag }) => {
      if (!acc[tag.name]) {
        acc[tag.name] = { correct: 0, incorrect: 0, unattempted: 0 };
      }
      if (question.responses.length === 0) {
        acc[tag.name].unattempted++;
      } else if (question.responses[0].isCorrect) {
        acc[tag.name].correct++;
      } else {
        acc[tag.name].incorrect++;
      }
    });
    return acc;
  }, {} as Record<string, { correct: number; incorrect: number; unattempted: number }>);

  const createBarChartData = (
    data: Record<
      string,
      { correct: number; incorrect: number; unattempted: number }
    >
  ) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Correct Answers",
        data: Object.values(data).map((item) => item.correct),
        backgroundColor: "rgba(2, 89, 15, 1)",
      },
      {
        label: "Incorrect Answers",
        data: Object.values(data).map((item) => item.incorrect),
        backgroundColor: "rgba(199, 34, 34, 1)",
      },
      {
        label: "Unattempted",
        data: Object.values(data).map((item) => item.unattempted),
        backgroundColor: "rgba(135, 206, 235, 1)",
      },
    ],
  });

  const createPieChartData = (
    correct: number,
    incorrect: number,
    unattempted: number
  ) => ({
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        data: [correct, incorrect, unattempted],
        backgroundColor: [
          "rgba(2, 89, 15, 1)",
          "rgba(199, 34, 34, 1)",
          "rgba(135, 206, 235, 1)",
        ],
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "category" as const,
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const createSectionPerformanceData = (sections: Section[]) => {
    const labels = sections.map((section) => section.name);
    const correctData = sections.map(
      (section) =>
        section.questions.filter((q) => q.responses[0]?.isCorrect).length
    );
    const incorrectData = sections.map(
      (section) =>
        section.questions.filter(
          (q) => q.responses[0] && !q.responses[0].isCorrect
        ).length
    );
    const unattemptedData = sections.map(
      (section) => section.questions.filter((q) => !q.responses[0]).length
    );

    return {
      labels,
      datasets: [
        {
          label: "Correct",
          data: correctData,
          backgroundColor: "rgba(2, 89, 15, 1)",
        },
        {
          label: "Incorrect",
          data: incorrectData,
          backgroundColor: "rgba(199, 34, 34, 1)",
        },
        {
          label: "Unattempted",
          data: unattemptedData,
          backgroundColor: "rgba(135, 206, 235, 1)",
        },
      ],
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {attempt.quiz.title} - Test Report
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Student: {attempt.user.fullName || "Anonymous"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">
            Score: {attempt.score} / {totalQuestions}
          </p>
          <p className="text-lg mb-4">
            Accuracy: {attempt.percentage.toFixed(2)}%
          </p>
          <p className="text-lg mb-2">
            Attempted: {attemptedQuestions} / {totalQuestions}
          </p>
          <p className="text-lg mb-2">Correct: {correctAnswers}</p>
          <p className="text-lg mb-2">Incorrect: {incorrectAnswers}</p>
          <p className="text-lg mb-2">Unattempted: {unattemptedQuestions}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie
              className="max-h-[50vh]"
              data={createPieChartData(
                correctAnswers,
                incorrectAnswers,
                unattemptedQuestions
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={createBarChartData(categoryPerformance)}
              options={chartOptions}
            />
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance by Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={createBarChartData(tagPerformance)}
              options={chartOptions}
            />
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Performance by Section</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={createSectionPerformanceData(attempt.quiz.sections)}
              options={{
                responsive: true,
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
                plugins: {
                  legend: { position: "top" as const },
                  title: { display: true, text: "Questions per Section" },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Section Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {attempt.quiz.sections.map((section, index) => (
              <AccordionItem key={section.id} value={`section-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center">
                    <span>{section.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {section.questions.length} questions
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {section.questions.map((q, qIndex) => {
                      const response = q.responses[0];
                      const isCorrect = response?.isCorrect;
                      const isUnattempted = !response;

                      return (
                        <Card
                          key={q.id}
                          className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Question {qIndex + 1}
                            </CardTitle>
                            {isUnattempted ? (
                              <Badge
                                variant="outline"
                                className="flex items-center"
                              >
                                <HelpCircle className="mr-1 h-3 w-3" />
                                Unattempted
                              </Badge>
                            ) : isCorrect ? (
                              <Badge
                                variant="default"
                                className="flex items-center bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Correct
                              </Badge>
                            ) : (
                              <Badge
                                variant="destructive"
                                className="flex items-center"
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Incorrect
                              </Badge>
                            )}
                          </CardHeader>
                          <CardContent>
                            <Preview value={q.question} />
                            <div className="flex justify-between items-center mt-4">
                              <div className="mt-4 flex flex-wrap gap-2">
                                <div>
                                  <p>Category:</p>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center"
                                  >
                                    <ChevronRight className="mr-1 h-3 w-3" />
                                    {q.category?.name || "Uncategorized"}
                                  </Badge>
                                </div>
                                <div>
                                  <p>Tags:</p>
                                  {q.tagRelations.map((tr) => (
                                    <Badge key={tr.tag.name} variant="outline">
                                      {tr.tag.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedQuestion(q)}
                                  >
                                    <Info className="mr-2 h-4 w-4" />
                                    Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Question Details</DialogTitle>
                                  </DialogHeader>
                                  <ScrollArea className="max-h-[80vh] overflow-auto">
                                    {selectedQuestion && (
                                      <div className="space-y-4">
                                        <div>
                                          <h3 className="font-semibold mb-2">
                                            Question:
                                          </h3>
                                          <Preview
                                            value={selectedQuestion.question}
                                          />
                                        </div>
                                        <div>
                                          <h3 className="font-semibold mb-2">
                                            Your Answer:
                                          </h3>
                                          <Preview
                                            value={
                                              isUnattempted
                                                ? "Not answered"
                                                : response.selectedAnswerID
                                                ? selectedQuestion.answers.find(
                                                    (a) =>
                                                      a.id ===
                                                      response.selectedAnswerID
                                                  )?.text ||
                                                  "No answer provided"
                                                : response.inputText !=
                                                  undefined
                                                ? response.inputText
                                                : "No answer provided"
                                            }
                                          />
                                        </div>
                                        <div>
                                          <h3 className="font-semibold mb-2">
                                            Correct Answer:
                                          </h3>
                                          <Preview
                                            value={
                                              selectedQuestion.answers.find(
                                                (a) => a.isCorrect
                                              )?.text || "No correct answer"
                                            }
                                          />
                                        </div>
                                        <div>
                                          <h3 className="font-semibold mb-2">
                                            All Options:
                                          </h3>
                                          <ul className="list-disc list-inside space-y-2">
                                            {selectedQuestion.answers.map(
                                              (a) => (
                                                <li
                                                  key={a.id}
                                                  className={`flex items-center ${
                                                    a.isCorrect
                                                      ? "text-green-600"
                                                      : ""
                                                  } ${
                                                    a.id ===
                                                      response?.selectedAnswerID &&
                                                    !a.isCorrect
                                                      ? "text-red-600"
                                                      : ""
                                                  }`}
                                                >
                                                  {a.isCorrect && (
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                  )}
                                                  {a.id ===
                                                    response?.selectedAnswerID &&
                                                    !a.isCorrect && (
                                                      <XCircle className="mr-2 h-4 w-4" />
                                                    )}
                                                  <Preview value={a.text} />
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                        {selectedQuestion.explanation && (
                                          <div>
                                            <h3 className="font-semibold mb-2">
                                              Explanation:
                                            </h3>
                                            <Preview
                                              value={
                                                selectedQuestion.explanation
                                              }
                                            />
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MoreVertical, Clock } from "lucide-react";
import CountdownTimer from "./_components/countdown";
import Questions from "../_components/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export default async function TEST({
  params,
}: {
  params: { testId: string; attemptId: string };
}) {
  const test = await db.quiz.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      sections: {
        orderBy: { position: "asc" },
        include: {
          questions: {
            orderBy: { position: "asc" },
            include: {
              answers: {
                orderBy: { position: "asc" },
              },
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
  });

  const attempt = await db.quizAttempt.findUnique({
    where: {
      id: params.attemptId,
    },
  });

  if (!attempt?.endTime || attempt?.completed) {
    return redirect(`/reports/${params.attemptId}`);
  }
  const totalQuestions =
    test?.sections?.reduce(
      (acc: number, section: any) => acc + section.questions.length,
      0
    ) || 0;
  const answeredQuestions =
    test?.sections?.reduce(
      (acc: number, section: any) =>
        acc +
        section.questions.filter(
          (q: any) => q.responses && q.responses.length > 0
        ).length,
      0
    ) || 0;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[100vw] md:w-[78vw] fixed bg-white z-50">
        <div className="border-t mx-auto py-3 px-4 flex items-center justify-between border-b">
          <p className="text-lg font-bold truncate">{test?.title}</p>
          <div className="flex flex-row items-center justify-end">
            <div className="flex items-center justify-end space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
              <Clock className="h-3 w-3" />
              <CountdownTimer
                attemptId={attempt.id}
                targetDate={attempt?.endTime}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save and exit</DropdownMenuItem>
                <DropdownMenuItem>Report an issue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-4 space-y-2 bg-background sticky top-0 z-10 shadow-sm border-b">
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-grow mr-4">
              <Progress value={progress} className="w-full" />
            </div>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {answeredQuestions}/{totalQuestions}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="flex-grow p-0 mt-24">
        <Questions attempt={attempt} test={test} />
      </CardContent>
    </div>
  );
}

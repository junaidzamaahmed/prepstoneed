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

  return (
    <div className="min-h-screen flex flex-col">
      <Card className="sticky rounded-none shadow-none border-b">
        <CardHeader className="py-2 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold truncate">
              {test?.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
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
        </CardHeader>
      </Card>
      <CardContent className="flex-grow p-0">
        <Questions attempt={attempt} test={test} />
      </CardContent>
    </div>
  );
}

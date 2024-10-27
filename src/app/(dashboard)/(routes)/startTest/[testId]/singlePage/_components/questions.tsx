"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { QuizAttempt } from "@prisma/client";
import QuestionAnswer from "./question-answer";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Questions({
  attempt,
  test,
}: {
  attempt: QuizAttempt;
  test: any;
}) {
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const toggleDisable = (val: boolean) => {
    setDisable(val);
  };

  if (test?.completed) {
    router.push(`/reports/${attempt.id}`);
  }

  const completeTest = async () => {
    try {
      setDisable(true);
      await axios.put(`/api/completeTest/${attempt.id}`);
      router.push(`/reports/${attempt.id}`);
      toast.success("Test completed");
      setDisable(false);
    } catch (e) {
      toast.error("Error completing test");
    }
  };

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
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-2 bg-background sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="space-y-1 flex-grow mr-4">
            <Progress value={progress} className="w-full" />
          </div>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {answeredQuestions}/{totalQuestions}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="md:p-4 space-y-8">
          {test?.sections?.map((section: any, sectionIndex: number) => (
            <Card
              key={section.id}
              className="shadow-sm max-md:mx-0 border-none"
            >
              <CardHeader>
                <CardTitle>Section {sectionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-6 px-0">
                {section?.questions?.map((question: any) => (
                  <QuestionAnswer
                    key={question.id}
                    question={question}
                    attemptId={attempt.id}
                    toggleDisable={toggleDisable}
                    disable={disable}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background sticky bottom-0 z-10 shadow-sm">
        <ConfirmModal onConfirm={completeTest}>
          <Button disabled={disable} className="w-full">
            Submit Test
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
}

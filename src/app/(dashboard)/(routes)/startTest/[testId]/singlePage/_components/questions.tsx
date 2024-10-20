"use client";
import QuestionAnswer from "./question-answer";
import { Button } from "@/components/ui/button";
import { QuizAttempt } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/confirm-modal";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <>
      <ScrollArea className="h-[calc(100vh-15rem)]">
        {test?.sections &&
          test?.sections?.map((section: any) => {
            return section?.questions?.map((question: any) => {
              return (
                <QuestionAnswer
                  key={question.id}
                  question={question}
                  attemptId={attempt.id}
                  toggleDisable={toggleDisable}
                  disable={disable}
                />
              );
            });
          })}
      </ScrollArea>
      <div className="md:absolute fixed bottom-0 md:p-4 md:w-[calc(100vw-15.5rem)] w-100 flex justify-between border-t-2 border-dashed border-primary pt-3 bg-white">
        <div className="md:py-2 font-semibold text-xs md:text-base md:w-auto w-14"></div>
        <div></div>
        <div>
          <ConfirmModal onConfirm={completeTest}>
            <Button disabled={disable}>Submit Test</Button>
          </ConfirmModal>
        </div>
      </div>
    </>
  );
}

"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  testId: string;
  sectionId: string;
  questionId: string;
  answerId: string;
}

export const AnswerActions = ({
  sectionId,
  testId,
  questionId,
  answerId,
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}/answers/${answerId}`
      );

      toast.success("Answer deleted");
      router.refresh();
      router.push(
        `/teacher/tests/${testId}/sections/${sectionId}/questions/${questionId}`
      );
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

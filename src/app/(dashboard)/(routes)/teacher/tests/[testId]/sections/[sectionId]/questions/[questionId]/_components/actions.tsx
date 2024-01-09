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
  disabled: boolean;
  testId: string;
  isPublished: boolean;
  sectionId: string;
  questionId: string;
}

export const QuestionActions = ({
  sectionId,
  disabled,
  testId,
  isPublished,
  questionId,
}: ActionsProps) => {
  const router = useRouter();
  //   const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}/togglePublish`,
        { isPublished: !isPublished }
      );
      isPublished
        ? toast.success("Question unpublished")
        : toast.success("Question published");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}`
      );

      toast.success("Question deleted");
      router.refresh();
      router.push(`/teacher/tests/${testId}/sections/${sectionId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

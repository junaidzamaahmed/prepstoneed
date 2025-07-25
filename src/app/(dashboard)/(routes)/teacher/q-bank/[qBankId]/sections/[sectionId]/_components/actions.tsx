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
}

export const SectionActions = ({
  sectionId,
  disabled,
  testId,
  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  //   const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(
        `/api/qbanks/${testId}/chapter/${sectionId}/togglePublish`,
        { isPublished: !isPublished }
      );
      isPublished
        ? toast.success("Section unpublished")
        : toast.success("Section published");

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

      await axios.delete(`/api/qbanks/${testId}/chapter/${sectionId}`);

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/q-bank/${testId}`);
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

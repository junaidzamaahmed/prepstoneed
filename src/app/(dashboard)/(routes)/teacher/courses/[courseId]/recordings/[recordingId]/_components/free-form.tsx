"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FreeForm({
  courseId,
  recording,
}: {
  courseId: string;
  recording: any;
}) {
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const handleDifficultyChange = async () => {
    try {
      setDisable(true);
      await axios.patch(`/api/courses/${courseId}/recordings/${recording.id}`, {
        isFree: !recording.isFree,
      });
      setDisable(false);
      toast.success("Updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium">
        This video is {recording.isFree ? "free" : "paid"}!
        <div>
          <Button
            onClick={handleDifficultyChange}
            disabled={disable}
            variant="default"
            size="sm"
            className="mt-2"
          >
            {recording.isFree ? "Mark Paid" : "Mark Free"}
          </Button>
        </div>
      </div>
    </div>
  );
}

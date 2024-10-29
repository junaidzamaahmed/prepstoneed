"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FreeForm({
  testId,
  isFree,
}: {
  testId: string;
  isFree: boolean;
}) {
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: boolean) => {
    try {
      setDisable(true);
      await axios.patch(`/api/tests/${testId}`, { isFree: value });
      toast.success("Test updated");
      setDisable(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setDisable(false);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium">
        This test is {isFree ? "free" : "paid"}!
        <div>
          <Button
            onClick={() => onSubmit(!isFree)}
            disabled={disable}
            variant="default"
            size="sm"
            className="mt-2"
          >
            {isFree ? "Mark Paid" : "Mark Free"}
          </Button>
        </div>
      </div>
    </div>
  );
}

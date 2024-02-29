"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CountdownTimer({
  targetDate,
  attemptId,
}: {
  targetDate: Date;
  attemptId: string;
}) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const completeTest = async () => {
    try {
      await axios.put(`/api/completeTest/${attemptId}`);
      router.push(`/reports/${attemptId}`);
      toast.success("Test completed");
    } catch (e) {
      toast.error("Error completing test");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = targetDate.getTime() - currentTime;
      setRemainingTime(difference);
      if (difference <= 0) {
        // toast.error("Test has ended");
        completeTest();
        // SET 5 second timeout to allow for the test to be marked as completed
        setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <span className="text-xl">
      {formatTime(remainingTime)}{" "}
      <span className="text-xs">hour(s) remaining</span>
    </span>
  );
}

function formatTime(time: number): string {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

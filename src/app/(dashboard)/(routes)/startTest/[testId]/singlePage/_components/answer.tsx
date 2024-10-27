"use client";
import { Preview } from "@/components/preview";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { StrikethroughIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Answer({
  answer,
}: // selectedAnswer,
{
  answer: any;
  // selectedAnswer: string;
}) {
  // const [isChecked, setIsChecked] = useState(selectedAnswer == answer?.id);
  const [striked, setStriked] = useState(false);

  const handleStrikethrough = () => {
    setStriked((prev) => !prev);
  };
  // useEffect(() => {
  //   setIsChecked(selectedAnswer == answer?.id);
  // }, [selectedAnswer]);
  return (
    <div className="cursor-pointer ps-2 flex items-center space-x-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
      <StrikethroughIcon
        className={`w-6 h-6 cursor-pointer transition ${
          striked ? "text-red-500" : "text-gray-600"
        }`}
        onClick={handleStrikethrough}
      />
      <RadioGroupItem value={answer.id} id={answer.id} />
      <Label
        htmlFor={answer.id}
        className={`text-sm flex-grow cursor-pointer w-full ${
          striked ? "line-through decoration-2 decoration-double" : ""
        }`}
      >
        <Preview value={answer?.text} />
      </Label>
    </div>
  );
}

"use client";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { StrikethroughIcon } from "lucide-react";
import { useState } from "react";

export default function Answer({ answer }: { answer: any }) {
  const [striked, setStriked] = useState(false);
  const handleStrikethrough = (striked: boolean) => {
    setStriked(!striked);
  };
  return (
    <>
      <FormItem className="flex items-center space-x-3 space-y-0 border border-black rounded-md py-3 px-2">
        <StrikethroughIcon
          className={`w-6 h-6  cursor-pointer transition ${
            striked ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => handleStrikethrough(striked)}
        />
        <FormControl>
          <RadioGroupItem value={answer?.id} />
        </FormControl>
        <FormLabel
          className={`font-normal select-none ${
            striked ? "line-through decoration-2 decoration-double" : null
          }`}
        >
          {answer?.text}
        </FormLabel>
      </FormItem>
    </>
  );
}

import { Preview } from "@/components/preview";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function QuestionContent({ question }: { question: any }) {
  return (
    <div className="h-full bg-gray-50 rounded-lg p-4 mb-4 md:mb-0">
      <ScrollArea className="h-full w-full">
        <Preview value={question?.question} />
      </ScrollArea>
    </div>
  );
}

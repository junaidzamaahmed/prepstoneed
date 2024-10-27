"use client";
import { Preview } from "@/components/preview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AnswerContent from "./AnswerContent";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import QuestionContent from "./QuestionContent";

export default function QuestionAnswer({
  question,
  attemptId,
  toggleDisable,
  disable,
}: {
  question: any;
  attemptId: string;
  toggleDisable: (val: boolean) => void;
  disable: boolean;
}) {
  const correctAnswer = question?.answers.find(
    (answer: any) => answer.isCorrect
  );

  const [selectedAnswer, setSelectedAnswer] = useState(
    question?.responses[0]?.selectedAnswerID || ""
  );

  const form = useForm({
    defaultValues: {
      input: question?.responses[0]?.inputText || "",
    },
  });
  const handleAnswerChange = async (value: string) => {
    try {
      toggleDisable(true);
      const response = await axios.put(
        `/api/userResponse/${attemptId}/${question.id}/`,
        [value, correctAnswer.id === value]
      );
      question.responses[0] = response.data;
      setSelectedAnswer(value);
      toggleDisable(false);
    } catch (error) {
      console.error("Error changing answer:", error);
      toggleDisable(false);
    }
  };

  const onSubmit = async (values: any) => {
    if (values.input === "") return;
    try {
      toggleDisable(true);
      const response = await axios.put(
        `/api/userResponse/${attemptId}/${question.id}/`,
        [values, correctAnswer.text === values.input]
      );
      question.responses[0] = response.data;
      toggleDisable(false);
    } catch (error) {
      console.error("Error submitting answer:", error);
      toggleDisable(false);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground m-4 py-3 rounded-full">
        <CardTitle className="text-xl font-bold">
          Question {question?.position}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="md:hidden space-y-2">
          <div className="h-full">
            <QuestionContent question={question} />
          </div>
          <AnswerContent
            question={question}
            disable={disable}
            handleAnswerChange={handleAnswerChange}
            onSubmit={onSubmit}
            selectedAnswer={selectedAnswer}
            form={form}
          />
        </div>
        <div className="hidden md:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border"
          >
            <ResizablePanel defaultSize={50} minSize={30}>
              <QuestionContent question={question} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <AnswerContent
                question={question}
                disable={disable}
                handleAnswerChange={handleAnswerChange}
                onSubmit={onSubmit}
                selectedAnswer={selectedAnswer}
                form={form}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Preview } from "@/components/preview";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Answer from "./answer";

export default function QuestionAnswer({
  question,
  attemptId,
  toggleDisable,
  disable,
  selected,
}: {
  question: any;
  attemptId: string;
  toggleDisable: (val: boolean) => void;
  disable: boolean;
  selected: string;
}) {
  const form = useForm({});

  const correctAnswer = question?.answers.find(
    (answer: any) => answer.isCorrect
  );
  const onSubmit = async (values: any) => {
    if (values.input === "") return;
    toggleDisable(true);
    const response = await axios.put(
      `/api/userResponse/${attemptId}/${question.id}/`,
      [values, correctAnswer.text == values.input]
    );
    question.responses[0] = response.data;
    toggleDisable(false);
  };
  const handleAnswerChange = async (value: string) => {
    toggleDisable(true);
    const response = await axios.put(
      `/api/userResponse/${attemptId}/${question.id}/`,
      [value, correctAnswer.id == value]
    );
    question.responses[0] = response.data;
    toggleDisable(false);
  };
  useEffect(() => {
    form.setValue("type", selected);
  }, [selected, form, question]);
  // Get screen size with error handling
  let width = 0;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:max-h-[65vh] select-none"
      >
        <ResizablePanel
          minSize={width <= 768 ? 100 : 0}
          defaultSize={width <= 768 ? 100 : 50}
          className="p-4 max-h-[60vh]"
        >
          <ScrollArea className="h-[60vh] select-none">
            <Preview value={question?.question} />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ScrollArea className="h-[60vh]">
            <div className="p-4 hidden md:block">
              <div className="bg-primary text-white text-xl p-2 rounded-md px-4">
                Question {question?.position}
              </div>
              <div>
                {question?.qtype === "MCQ" ? (
                  <Form {...form}>
                    <form className="w-full space-y-6">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="ml-1">
                              Please select your answer:
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                disabled={disable}
                                onValueChange={handleAnswerChange}
                                defaultValue={
                                  question?.responses[0]?.selectedAnswerID
                                }
                                className="space-y-1"
                              >
                                {question?.answers.map((answer: any) => (
                                  <Answer
                                    key={answer.position}
                                    answer={answer}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="ml-1">Your Answer:</FormLabel>
                            <FormControl>
                              <Input
                                defaultValue={question?.responses[0]?.inputText}
                                disabled={disable}
                                type="text"
                                placeholder="Write your answer here..."
                                {...field}
                              />
                            </FormControl>
                            <Button type="submit" disabled={disable}>
                              Save Answer
                            </Button>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                )}
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="p-4 md:hidden">
        <div className="bg-primary text-white text-xl p-2 rounded-md px-4">
          Question {question?.position}
        </div>
        <div>
          <Form {...form}>
            <form
              //   onSubmit={handleSubmit()}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="ml-1">
                      Please select your answer:
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        disabled={disable}
                        onValueChange={handleAnswerChange}
                        defaultValue={question?.responses[0]?.selectedAnswerID}
                        className="space-y-1"
                      >
                        {question?.answers.map((answer: any) => (
                          <Answer key={answer.position} answer={answer} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

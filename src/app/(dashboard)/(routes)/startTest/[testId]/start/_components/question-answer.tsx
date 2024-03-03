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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <ResizablePanel
          minSize={width <= 768 ? 100 : 0}
          defaultSize={width <= 768 ? 100 : 50}
          className="p-4"
        >
          <Preview value={question?.question} />
        </ResizablePanel>
        <ResizableHandle withHandle className="md:h-[70vh]" />
        <ResizablePanel>
          <div className="p-4 hidden md:block">
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
                            defaultValue={
                              question?.responses[0]?.selectedAnswerID
                            }
                            className="space-y-1"
                          >
                            {question?.answers.map((answer: any) => (
                              <FormItem
                                key={answer?.position}
                                className="flex items-center space-x-3 space-y-0 border border-black rounded-md py-3 px-2"
                              >
                                <FormControl>
                                  <RadioGroupItem value={answer?.id} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {answer?.text}
                                </FormLabel>
                              </FormItem>
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
                          <FormItem
                            key={answer?.position}
                            className="flex items-center space-x-3 space-y-0 border border-black rounded-md py-3 px-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={answer?.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {answer?.text}
                            </FormLabel>
                          </FormItem>
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

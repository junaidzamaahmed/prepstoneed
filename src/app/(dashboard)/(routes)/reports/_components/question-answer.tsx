"use client";

import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function QuestionAnswer({
  question,
  response,
}: {
  question: any;
  response: any;
}) {
  const router = useRouter();
  const form = useForm({});
  return (
    <>
      <Button variant={"ghost"} onClick={() => router.back()}>
        <ArrowLeft /> Back
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-4">
          <Preview value={question?.question} />
          {question?.imageUrl && (
            <Image
              width={200}
              height={200}
              src={question?.imageUrl || ""}
              alt="question image"
            />
          )}
        </div>
        <div className="p-4">
          <div className="bg-primary text-white text-xl p-2 rounded-md px-4">
            Question {question?.position}
          </div>
          <div>
            <Form {...form}>
              <form className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="ml-1">Answer:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          disabled={true}
                          defaultValue={response?.selectedAnswerID}
                          className="space-y-1"
                        >
                          {question?.answers.map((answer: any) => (
                            <FormItem
                              key={answer?.position}
                              className={`flex items-center space-x-3 space-y-0 border border-black rounded-md py-3 px-2 ${
                                answer?.isCorrect && "bg-green-200"
                              }`}
                            >
                              <FormLabel className="font-normal select-none">
                                {answer?.text}
                              </FormLabel>
                            </FormItem>
                          ))}
                          {!response?.isCorrect && (
                            <>
                              <p className="text-sm font-semibold">
                                Your answer:
                              </p>
                              <FormItem
                                className={`flex items-center space-x-3 space-y-0 border border-black rounded-md py-3 px-2 bg-red-200`}
                              >
                                <FormLabel className="font-normal">
                                  {response?.inputText}
                                </FormLabel>
                              </FormItem>
                            </>
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {}
              </form>
            </Form>
            {!response && (
              <p className="text-red-600 text-lg font-semibold py-1">Skipped</p>
            )}
          </div>
          <div className="py-4 select-none">
            <p className="text-xl text-primary font-semibold">Explanation</p>
            <p>{question?.explanation}</p>
          </div>
        </div>
      </div>
    </>
  );
}

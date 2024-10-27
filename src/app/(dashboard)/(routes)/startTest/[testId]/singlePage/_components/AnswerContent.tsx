"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Preview } from "@/components/preview";
import { Label } from "@/components/ui/label";
import Answer from "./answer";

export default function AnswerContent({
  question,
  disable,
  selectedAnswer,
  handleAnswerChange,
  form,
  onSubmit,
}: {
  question: any;
  disable: boolean;
  selectedAnswer: any;
  handleAnswerChange: any;
  form: any;
  onSubmit: any;
}) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="space-y-6">
        {question.qtype === "MCQ" ? (
          <div className="md:space-y-4">
            <h4 className="text-lg font-medium">Please select your answer:</h4>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={(value) => {
                handleAnswerChange(value);
              }}
              className="space-y-2"
            >
              {question?.answers.map((answer: any) => (
                // <div
                //   key={answer.id}
                //   className="flex items-center space-x-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors p-2"
                // >
                //   <RadioGroupItem value={answer.id} id={answer.id} />
                //   <Label
                //     htmlFor={answer.id}
                //     className="flex-grow cursor-pointer"
                //   >
                //     <Preview value={answer.text} />
                //   </Label>
                // </div>
                <Answer answer={answer} key={answer.id} />
              ))}
            </RadioGroup>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Your Answer:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disable}
                        placeholder="Write your answer here..."
                        className="w-full"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={disable}
                      className="mt-4 w-full"
                    >
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
  );
}

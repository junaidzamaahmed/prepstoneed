"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Section, Question } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { QuestionsList } from "./questions-list";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionFormProps {
  initialData: Section & { questions: Question[] };
  sectionId: string;
  testId: string;
}

const formSchema = z.object({
  question: z.string().min(1),
  isPublished: z.boolean().optional(),
  imageUrl: z.string().optional(),
  explanation: z.string().min(1),
  answers: z.array(
    z.object({
      text: z.string().min(1),
      isCorrect: z.boolean().optional(),
      position: z.number().gte(1).optional(),
    })
  ),
});

export const QuestionForm = ({
  initialData,
  sectionId,
  testId,
}: QuestionFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      values?.answers?.forEach((element: any, index: number) => {
        element.isCorrect = ansObj[index].isCorrect;
        element.position = ansObj[index].position;
      });
      values.isPublished = true;
      const ques = await axios.post(
        `/api/tests/${testId}/sections/${sectionId}/questions`,
        values
      );
      console.log(ques);
      toast.success("Question created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(
        `/api/tests/${testId}/sections/${sectionId}/questions/reorder`,
        {
          list: updateData,
        }
      );
      toast.success("Questions reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (id: string) => {
    router.push(
      `/teacher/tests/${testId}/sections/${sectionId}/questions/${id}`
    );
  };
  const [answers, setAnswers] = useState<any>("");
  const [ansObj, setAnsObj] = useState<any>(null);
  const [ref, setRef] = useState<boolean>(false);
  useEffect(() => {
    if (answers && !ref) {
      setAnsObj(
        answers.map((a: any, index: number) => {
          return {
            position: index + 1,
            isCorrect: !index ? true : false,
            text: a,
          };
        })
      );
      setRef(true);
    }
  }, [answers]);
  const onChange = (e: string) => {
    ansObj.forEach((answer: any) => {
      if (answer.text === e) {
        answer.isCorrect = true;
      } else {
        answer.isCorrect = false;
      }
    });
    setAnsObj(ansObj);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Questions
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a question
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'What is your name?'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Correct answer explanation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Image URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {ansObj ? (
              <RadioGroup
                defaultValue={ansObj.find((ans: any) => ans?.isCorrect)?.text}
                onValueChange={(e) => onChange(e)}
              >
                {ansObj.map((a: any, index: number) => {
                  return (
                    <div key={index} className="flex gap-x-2 items-center">
                      <FormField
                        defaultValue={a.isCorrect}
                        control={form.control}
                        name={`answers.${index}.isCorrect`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem value={a.text} id={a.text} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        defaultValue={a.text}
                        control={form.control}
                        name={`answers.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                className=""
                                disabled={isSubmitting}
                                placeholder="Answer here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            ) : (
              <Textarea
                disabled={isSubmitting}
                placeholder="Paste answers here'"
                onChange={(e) => setAnswers(e.target.value.split("\n"))}
              />
            )}

            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.questions.length && "text-slate-500 italic"
          )}
        >
          {!initialData.questions.length && "No Questions"}
          <QuestionsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.questions || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the questions
        </p>
      )}
    </div>
  );
};

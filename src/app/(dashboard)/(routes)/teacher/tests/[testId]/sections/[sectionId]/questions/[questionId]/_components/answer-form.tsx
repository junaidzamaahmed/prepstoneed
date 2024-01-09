"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Section, Answer, Question } from "@prisma/client";

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
import { AnswersList } from "./answers-list";

interface AnswerFormProps {
  initialData: Question & { answers: Answer[] };
  sectionId: string;
  testId: string;
  questionId: string;
}

const formSchema = z.object({
  text: z.string().min(1),
});

export const AnswerForm = ({
  initialData,
  sectionId,
  testId,
  questionId,
}: AnswerFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}/answers`,
        values
      );
      toast.success("Answer created");
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
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}/answers/reorder`,
        {
          list: updateData,
        }
      );
      toast.success("Answers reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };
  const onCorrectChange = async (
    updateData: { id: string; isCorrect: boolean }[]
  ) => {
    try {
      setIsUpdating(true);
      await axios.put(
        `/api/tests/${testId}/sections/${sectionId}/questions/${questionId}/answers/correctAnswer`,
        {
          list: updateData,
        }
      );
      toast.success("Correct answer changed!");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (id: string) => {
    router.push(
      `/teacher/tests/${testId}/sections/${sectionId}/questions/${questionId}/answers/${id}`
    );
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Answers
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an answer
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
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Answer 1'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            !initialData.answers.length && "text-slate-500 italic"
          )}
        >
          {!initialData.answers.length && "No Answers"}
          <AnswersList
            onEdit={onEdit}
            onReorder={onReorder}
            onCorrectChange={onCorrectChange}
            items={initialData.answers || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the answers
        </p>
      )}
    </div>
  );
};

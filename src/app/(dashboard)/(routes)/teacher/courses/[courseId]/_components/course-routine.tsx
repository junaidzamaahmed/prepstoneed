"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course, CourseRoutine } from "@prisma/client";

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
import { Label } from "@/components/ui/label";
import { RoutineList } from "./routine-list";

interface CourseRoutineFormProps {
  initialData: Course & { CourseRoutine: CourseRoutine[] };
  courseId: string;
}

const formSchema = z.object({
  day: z.string().min(1),
  time: z.string().min(1),
  title: z.string().min(1),
});

export const CourseRoutineForm = ({
  initialData,
  courseId,
}: CourseRoutineFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/courseRoutine`, values);
      toast.success("Routine created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const deleteRoutine = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/courseRoutine`, {
        data: { id },
      });
      toast.success("Routine deleted");
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Routine
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Routine
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Title</Label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <Label>Day</Label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Day"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Label>Time</Label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Time"
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
            !initialData.CourseRoutine.length && "text-slate-500 italic"
          )}
        >
          {!initialData.CourseRoutine.length && "No FAQ added yet."}
          <RoutineList
            deleteRoutine={deleteRoutine}
            items={initialData.CourseRoutine || []}
          />
        </div>
      )}
    </div>
  );
};

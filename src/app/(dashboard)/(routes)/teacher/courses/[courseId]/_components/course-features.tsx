"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course, CourseFeatures } from "@prisma/client";

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
import { FeaturesList } from "./features-list";

interface CourseFeaturesFormProps {
  initialData: Course & { CourseFeatures: CourseFeatures[] };
  courseId: string;
}

const formSchema = z.object({
  feature: z.string().min(1),
});

export const CourseFeaturesForm = ({
  initialData,
  courseId,
}: CourseFeaturesFormProps) => {
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
      await axios.post(`/api/courses/${courseId}/courseFeatures`, values);
      toast.success("Feature created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const deleteFeature = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/courseFeatures`, {
        data: { id },
      });
      toast.success("Feature deleted");
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
        Feature
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a feature
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
              name="feature"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'A'"
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
            !initialData.CourseFeatures.length && "text-slate-500 italic"
          )}
        >
          {!initialData.CourseFeatures.length && "No Features"}
          <FeaturesList
            deleteFeature={deleteFeature}
            items={initialData.CourseFeatures || []}
          />
        </div>
      )}
    </div>
  );
};

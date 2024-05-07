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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function VideoSourceForm({
  courseId,
  recording,
}: {
  courseId: string;
  recording: any;
}) {
  const form = useForm({});
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const handleVideoSourceChange = async (value: string) => {
    try {
      setDisable(true);
      await axios.patch(`/api/courses/${courseId}/recordings/${recording.id}`, {
        videoSource: Number(value),
      });
      setDisable(false);
      toast.success("Video Source Updated");
      router.refresh();
    } catch (error) {
      toast.error("Error updating source");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium">
        Video Source
        <div>
          <Form {...form}>
            <form className="w-full space-y-6">
              <FormField
                control={form.control}
                name="videoSource"
                render={({ field }) => (
                  <FormItem className="space-y-3 ">
                    <FormControl>
                      <RadioGroup
                        disabled={disable}
                        onValueChange={handleVideoSourceChange}
                        defaultValue={String(recording?.videoSource)}
                        className="space-y-1"
                      >
                        <FormItem className="space-x-2">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">Mux</FormLabel>
                        </FormItem>
                        <FormItem className="space-x-2">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">YouTube</FormLabel>
                        </FormItem>
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
    </div>
  );
}

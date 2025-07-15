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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Difficulty } from "@prisma/client";
import { toast } from "sonner";

export default function DifficultyForm({
  testId,
  section,
}: {
  testId: string;
  section: any;
}) {
  const form = useForm({});
  const [disable, setDisable] = useState(false);

  const handleDifficultyChange = async (value: string) => {
    try {
      setDisable(true);
      await axios.patch(`/api/tests/${testId}/sections/${section.id}/`, {
        difficulty: value,
      });
      setDisable(false);
      toast.success("Difficulty updated");
    } catch (error) {
      toast.error("Error updating difficulty");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium">
        Difficulty
        <div>
          <Form {...form}>
            <form className="w-full space-y-6">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="space-y-3 ">
                    <FormControl>
                      <RadioGroup
                        disabled={disable}
                        onValueChange={handleDifficultyChange}
                        defaultValue={section?.difficulty}
                        className="space-y-1"
                      >
                        {Object.keys(Difficulty).map((key, index) => (
                          <FormItem key={key} className="space-x-2">
                            <FormControl>
                              <RadioGroupItem value={key} />
                            </FormControl>
                            <FormLabel className="font-normal">{key}</FormLabel>
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
    </div>
  );
}

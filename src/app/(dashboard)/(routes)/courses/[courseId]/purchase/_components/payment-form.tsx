"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  trxId: z.string().optional(),
  phone: z.string().optional(),
  userId: z.string().min(1),
  courseId: z.string().min(1),
});

export default function PaymentForm({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId,
      courseId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setDisabled(true);
      await axios.post("/api/access/request", values);

      toast.success(
        "Your request has been submitted. Please check back in a few hours."
      );
      form.reset();
      setDisabled(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="eg. 01711111111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TrxID</FormLabel>
              <FormControl>
                <Input placeholder="eg. 93DJ2231ADD35672D" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className="mt-2">
          Leave the fields blank if you&apos;re an offline student.
        </FormDescription>
        <Button className="mt-2" disabled={disabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Instructors from "./_components/instructors";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }),
});

const CreateInstructor = async () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/instructors", values);
      toast.success("Instructor added successfully!");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Instructors</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Azaz Koushik"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Instructor name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. CEO, Prepstone. University of Dhaka"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isSubmitting}
                      placeholder="e.g. example@example.com"
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
                  <FormLabel>Instructor Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      disabled={isSubmitting}
                      placeholder="e.g. www.example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Add
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-8">
          <h1 className="text-2xl">All Instructors</h1>
          <Instructors />
        </div>
      </div>
    </div>
  );
};

export default CreateInstructor;

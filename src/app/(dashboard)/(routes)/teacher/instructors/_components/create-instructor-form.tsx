"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }),
});

export default function CreateInstructorForm() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      imageUrl: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/instructors", values);
      toast.success("Instructor added successfully!");
      form.reset({
        name: "",
        email: "",
        bio: "",
        imageUrl: "",
      });
      setImageUrl(undefined);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Add Instructor</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. Azaz Koushik"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
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
                <FormLabel>Email</FormLabel>
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
          <div className="mt-6 border rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
              Image
              <Button type="button" onClick={toggleEdit} variant="ghost">
                {isEditing && <>Cancel</>}
                {!isEditing && !imageUrl && (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add an image
                  </>
                )}
                {!isEditing && imageUrl && (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            {!isEditing &&
              (!imageUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                  <ImageIcon className="h-10 w-10 text-slate-500" />
                </div>
              ) : (
                <div className="relative aspect-video mt-2">
                  <Image
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={imageUrl}
                  />
                </div>
              ))}
            {isEditing && (
              <div>
                <FileUpload
                  endpoint="questionImage"
                  onChange={async (url) => {
                    if (url) {
                      setImageUrl(url);
                      form.setValue("imageUrl", url, { shouldValidate: true });
                      toggleEdit();
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-4">
                  Upload image of size less than 256KB
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              className="mt-2"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

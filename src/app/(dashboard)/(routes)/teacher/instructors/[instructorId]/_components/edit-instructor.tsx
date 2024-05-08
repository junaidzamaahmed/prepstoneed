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
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle, Trash } from "lucide-react";
import { FileUpload } from "@/components/file-upload";
import { useState } from "react";

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  bio: z.string().min(1, { message: "Bio is required" }).optional(),
  imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
});

export default function EditInstructorForm({
  instructor,
}: {
  instructor: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    instructor?.imageUrl
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: instructor?.id,
      name: instructor?.name,
      email: instructor?.email,
      bio: instructor?.bio || null || undefined,
      imageUrl: instructor?.imageUrl || null || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch("/api/instructors", values);
      toast.success("Instructor updated successfully!");
      form.reset();
      router.push("/teacher/instructors");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current: any) => !current);

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Edit Instructor</h1>
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
                  <FormDescription>name</FormDescription>
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
            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
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
            /> */}
            <div className="mt-6 border rounded-md p-4">
              <div className="font-medium flex items-center justify-between">
                Image
                <Button
                  onClick={
                    // !imageUrl
                    //   ?
                    toggleEdit
                    // : () =>
                    //     onSubmit({
                    //       id: instructor?.id!,
                    //       name: instructor?.name!,
                    //       email: instructor?.email!,
                    //       bio: instructor?.bio || undefined,
                    //       imageUrl: undefined,
                    //     })
                  }
                  variant="ghost"
                >
                  {isEditing && <>Cancel</>}
                  {!isEditing && !imageUrl && (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add an image
                    </>
                  )}
                  {!isEditing && imageUrl && (
                    <>
                      {/* <Trash className="h-4 w-4 text-red-600" /> */}
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
                        form.setValue("imageUrl", url);
                        toggleEdit();
                        form.trigger("imageUrl");
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    Upload image of size less than 512KB
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-x-2 mt-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

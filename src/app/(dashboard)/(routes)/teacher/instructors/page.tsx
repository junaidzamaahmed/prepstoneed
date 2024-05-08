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
import Instructors from "./_components/instructors";
import { ImageForm } from "./_components/image_form";
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

const CreateInstructor = async () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: imageUrl,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current: any) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/instructors", values);
      toast.success("Instructor added successfully!");
      form.setValue("name", "");
      form.setValue("email", "");
      form.setValue("bio", "");
      form.setValue("imageUrl", "");
      setImageUrl(undefined);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
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
            {/* <ImageForm
              imageUrl={form.getValues("imageUrl")}
              setImageUrl={setImageUrl}
            /> */}
            <div className="mt-6 border rounded-md p-4">
              <div className="font-medium flex items-center justify-between">
                Image
                <Button onClick={toggleEdit} variant="ghost">
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
                        form.setValue("imageUrl", url);
                        toggleEdit();
                        form.trigger("imageUrl");
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
        <div className="mt-8">
          <h1 className="text-2xl">All Instructors</h1>
          <Instructors />
        </div>
      </div>
    </div>
  );
};

export default CreateInstructor;

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LeaderboardUserExceptions,
  Quiz,
  QuizAttempt,
  User,
} from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SelectUserExceptions from "./add-user-exception";

interface LeaderboardFormProps {
  initialData: Quiz & any;
  testId: string;
}

const formSchema = z.object({
  id: z.string(),
  limit: z.coerce.number().nonnegative(),
  show: z.boolean().optional(),
});

export const LeaderboardForm = ({
  initialData,
  testId,
}: LeaderboardFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialData.leaderboardInfo?.id,
      limit: initialData.leaderboardInfo?.limit,
      show: initialData.leaderboardInfo?.show,
    },
  });
  // unique users
  const users = initialData.attempts.reduce(
    (acc: User[], attempt: QuizAttempt & { user: User }) => {
      if (!acc.find((user) => user.id === attempt.userID)) {
        acc.push(attempt.user);
      }
      return acc;
    },
    []
  );

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/tests/${testId}/leaderboard`, {
        values,
      });
      toast.success("Leaderboard updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const createLeaderboard = async () => {
    try {
      await axios.post(`/api/tests/${testId}/leaderboard`);
      toast.success("Leaderboard created");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Leaderboard
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : initialData.leaderboardInfo ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          ) : null}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.leaderboardInfo ? (
            <div className="space-y-2">
              <p>
                {initialData.leaderboardInfo.show
                  ? "Status: visible"
                  : "Status: hidden"}
              </p>
              <p>Limit: {initialData.leaderboardInfo.limit || "NONE"}</p>

              <p className="font-bold">Exceptions:</p>
              <ul>
                {initialData.leaderboardInfo.exceptUsers.length ? (
                  initialData.leaderboardInfo.exceptUsers.map(
                    (exception: LeaderboardUserExceptions & { user: User }) => (
                      <li key={exception.userId} className="text-xs">
                        {exception.user.fullName} - {exception.user.email}
                      </li>
                    )
                  )
                ) : (
                  <li>None</li>
                )}
              </ul>
            </div>
          ) : (
            <Button onClick={createLeaderboard}>Create Leaderboard</Button>
          )}
        </div>
      )}
      {isEditing && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                defaultValue={initialData.leaderboardInfo?.limit}
                name="limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Students limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="Leaderboard limit (leave empty for no limit)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Note: Set 0 for no limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="show"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Show leaderboard to students</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button
                  disabled={!isDirty || !isValid || isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
          <SelectUserExceptions
            initialData={initialData}
            leaderboardInfoId={initialData.leaderboardInfo?.id}
            users={users}
          />
        </>
      )}
    </div>
  );
};

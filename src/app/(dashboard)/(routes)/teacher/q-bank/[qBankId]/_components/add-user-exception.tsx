"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { LeaderboardUserExceptions, User } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SelectUserExceptions({
  initialData,
  leaderboardInfoId,
  users,
}: {
  initialData: any;
  leaderboardInfoId: string;
  users: User[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<User[]>(
    initialData.leaderboardInfo.exceptUsers.map(
      (exception: LeaderboardUserExceptions & { user: User }) => exception.user
    )
  );
  const [inputValue, setInputValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const router = useRouter();

  const handleSelect = React.useCallback(async (user: User) => {
    try {
      setDisabled(true);
      await axios.post(`/api/user-exception`, {
        leaderboardInfoId,
        userId: user.id,
      });
      toast.success("Exception added to leaderboard");
      router.refresh();
      setDisabled(false);
    } catch {
      toast.error("Failed to add exception to leaderboard");
    }
  }, []);

  const handleUnselect = React.useCallback(async (user: User) => {
    try {
      setDisabled(true);
      await axios.delete(`/api/user-exception/`, {
        data: { leaderboardInfoId, userId: user.id },
      });
      setSelected((prev) => prev.filter((s) => s.id !== user.id));
      toast.success("Exception removed from leaderboard");
      router.refresh();
      setDisabled(false);
    } catch {
      toast.error("Failed to remove exception from leaderboard");
    }
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = users.filter(
    (user) => !selected.find((s) => s.id === user.id)
  );
  return (
    <div className="mt-6">
      <div className="font-medium flex items-center justify-between mb-2">
        Add User Exceptions
      </div>
      <Command
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        className="overflow-visible bg-transparent"
      >
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {selected.map((user) => {
              return (
                <Badge
                  key={user.id}
                  variant="secondary"
                  className="bg-sky-200/40 hover:bg-sky-200/60 transition"
                >
                  {user.fullName}
                  <button
                    disabled={disabled}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(user);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(user)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select user..."
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((user) => {
                  return (
                    <CommandItem
                      disabled={disabled}
                      key={user.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        handleSelect(user);
                        setSelected((prev) => [...prev, user]);
                      }}
                      className={"cursor-pointer text-xs"}
                    >
                      {user.fullName} ({user.email})
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  );
}

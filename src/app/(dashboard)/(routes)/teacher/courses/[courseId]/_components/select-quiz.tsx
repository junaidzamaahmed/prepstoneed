"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Quiz } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

export default function SelectQuiz({
  initialData,
  courseId,
  tests,
}: {
  initialData: any;
  courseId: string;
  tests: Quiz[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Quiz[]>(initialData.tests);
  const [inputValue, setInputValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleSelect = React.useCallback(async (test: Quiz) => {
    try {
      setDisabled(true);
      await axios.patch(`/api/tests/${test.id}`, { courseId });
      toast.success("Test added to course");
      setDisabled(false);
    } catch {
      toast.error("Failed to add test to course");
    }
  }, []);

  const handleUnselect = React.useCallback(async (test: Quiz) => {
    try {
      setDisabled(true);
      await axios.patch(`/api/tests/${test.id}`, { courseId: null });
      setSelected((prev) => prev.filter((s) => s.id !== test.id));
      toast.success("Test removed from course");
      setDisabled(false);
    } catch {
      toast.error("Failed to remove test from course");
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

  const selectables = tests.filter(
    (test) => !selected.some((s) => s.id === test.id)
  );
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-4">
        Add Tests
      </div>
      <Command
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        className="overflow-visible bg-transparent"
      >
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {selected.map((test) => {
              return (
                <Badge
                  key={test.id}
                  variant="secondary"
                  className="bg-sky-200/40 hover:bg-sky-200/60 transition"
                >
                  {test.title}
                  <button
                    disabled={disabled}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(test);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(test)}
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
              placeholder="Select tests..."
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((test) => {
                  return (
                    <CommandItem
                      disabled={disabled}
                      key={test.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        handleSelect(test);
                        setSelected((prev) => [...prev, test]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {test.title}
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

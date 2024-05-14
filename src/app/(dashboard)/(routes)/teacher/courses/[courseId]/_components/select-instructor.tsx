"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Instructor, InstructorInstructs, Quiz } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

export default function SelectInstructor({
  initialData,
  courseId,
  instructors,
  assigned,
}: {
  initialData: any;
  courseId: string;
  instructors: Instructor[];
  assigned: InstructorInstructs[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Instructor[]>(
    initialData.instructors.map((instructor: any) => {
      return instructor.instructor;
    })
  );
  const [inputValue, setInputValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleSelect = React.useCallback(async (instructor: Instructor) => {
    try {
      setDisabled(true);
      await axios.post(`/api/instructors/courseAssignment/`, {
        instructorId: instructor.id,
        courseId: courseId,
      });
      toast.success("Instructor added to course");
      setSelected((prev) => [...prev, instructor]);
      setDisabled(false);
    } catch {
      toast.error("Failed to add instructor to course");
    }
  }, []);

  const handleUnselect = React.useCallback(async (instructor: Instructor) => {
    try {
      setDisabled(true);
      await axios.delete(`/api/instructors/courseAssignment/`, {
        headers: { instructorId: instructor.id, courseId: courseId },
      });
      setSelected((prev) => prev.filter((s) => s.id !== instructor.id));
      toast.success("Instructor removed from course");
      setDisabled(false);
    } catch {
      toast.error("Failed to remove instructor from course");
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
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = instructors.filter(
    (instructor) => !selected.some((s) => s.id === instructor.id)
  );
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-4">
        Add Instructors
      </div>
      <Command
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        className="overflow-visible bg-transparent"
      >
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {selected.map((instructor) => {
              return (
                <Badge
                  key={instructor.id}
                  variant="secondary"
                  className="bg-sky-200/40 hover:bg-sky-200/60 transition"
                >
                  {instructor.name}
                  <button
                    disabled={disabled}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(instructor);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(instructor)}
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
              placeholder="Select instructors..."
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((instructor: Instructor) => {
                  return (
                    <CommandItem
                      disabled={disabled}
                      key={instructor.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        handleSelect(instructor);
                      }}
                      className={"cursor-pointer"}
                    >
                      {instructor.name}
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

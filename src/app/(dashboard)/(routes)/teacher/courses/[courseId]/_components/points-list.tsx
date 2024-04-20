"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { CoursePoints } from "@prisma/client";

interface PointsListProps {
  items: CoursePoints[];
  deletePoint: (id: string) => void;
}

export const PointsList = ({ items, deletePoint }: PointsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  });
  useEffect(() => {
    setSections(items);
  });
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {sections.map((section, index) => (
        <div
          key={index}
          className={cn(
            "mb-4 flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md text-sm",
            "bg-sky-100 border-sky-200 text-sky-700"
          )}
        >
          <div
            className={cn(
              "px-2 py-3 border-r border-r-slate-200 hover::bg-slate-300 rounded-l-md transition",
              "border-r-sky-200 hover:bg-sky-200"
            )}
          ></div>
          {section.description}
          <div className="ml-auto pr-2 flex items-center gap-x-2">
            <Trash
              onClick={() => deletePoint(section.id)}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition text-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

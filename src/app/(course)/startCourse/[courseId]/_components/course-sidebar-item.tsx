"use client";
import { cn } from "@/lib/utils";
import { Recordings } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  recording: Recordings;
  courseId: string;
}
export default function CourseSidebarItem({
  recording,
  courseId,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname.includes(recording.id);
  const handleClick = () => {
    router.push(`/startCourse/${courseId}/recordings/${recording.id}`);
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-slate-500 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-500"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">{recording.title}</div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
}

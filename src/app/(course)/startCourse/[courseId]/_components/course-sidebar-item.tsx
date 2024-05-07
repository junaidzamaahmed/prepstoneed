"use client";
// import { cn } from "@/lib/utils";
import { Purchase, Recordings } from "@prisma/client";
import { usePathname } from "next/navigation";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { Lock, PlayIcon } from "lucide-react";
import Link from "next/link";

interface CourseSidebarItemProps {
  recording: Recordings;
  courseId: string;
  purchase: Purchase | null;
}
export default function CourseSidebarItem({
  recording,
  courseId,
  purchase,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  // const router = useRouter();
  const activeId = pathname.includes(recording.id);
  // const handleClick = () => {
  //   router.push(`/startCourse/${courseId}/recordings/${recording.id}`);
  // };
  return (
    // <Accordion type="single" collapsible className="px-5">
    //   <AccordionItem value="item-1">
    //     <AccordionTrigger>{recording.title}</AccordionTrigger>
    //     <AccordionContent>
    //       <button
    //         onClick={handleClick}
    //         type="button"
    //         className={cn(
    //           "w-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
    //           isActive &&
    //             "text-slate-500 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-500"
    //         )}
    //       >
    //         <div className="flex items-center gap-x-2 py-4">
    //           {!recording.isFree && (
    //             <Lock
    //               size={18}
    //               className={cn("text-slate-500", isActive && "text-slate-500")}
    //             />
    //           )}
    //           {recording.title}
    //         </div>
    //         <div
    //           className={cn(
    //             "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
    //             isActive && "opacity-100"
    //           )}
    //         />
    //       </button>
    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
    <Link
      key={recording.id}
      href={`/startCourse/${courseId}/recordings/${recording.id}`}
    >
      <div
        className={`${
          activeId && "bg-secondary/5 text-secondary"
        } flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group`}
      >
        <div
          className={`${
            activeId && "text-secondary"
          } flex items-center space-x-2 hover:text-secondary`}
        >
          <PlayIcon
            size={16}
            className={`pl-[2px] py-[2px] rounded-full text-white ${
              activeId ? "bg-secondary" : "bg-black"
            } group-hover:bg-secondary transition-all`}
          />
          <p className="font-medium">{recording.title}</p>
        </div>
        {recording.isFree || purchase ? null : (
          <Lock
            size={12}
            className={`${
              activeId ? "text-secondary" : "text-slate-500"
            } group-hover:text-secondary transition-all`}
          />
        )}
      </div>
    </Link>
  );
}

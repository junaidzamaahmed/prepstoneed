import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { Category, Course, Recordings } from "@prisma/client";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course & { recordings: Recordings[] };
}
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`courses/${course.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            src={course.imageUrl || "/assets/course.jpg"}
            alt="Course Image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-primary transition line-clamp-2">
            {course.title}
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Video} />
              <span>
                {course.recordings.length}{" "}
                {course.recordings.length === 1 ? "Recording" : "Recordings"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

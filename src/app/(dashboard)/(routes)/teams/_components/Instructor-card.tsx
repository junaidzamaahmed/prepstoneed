import { Instructor } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

interface InstructorCardProps {
  instructor: Instructor;
}
export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
      <div className='relative w-full aspect-video rounded-md overflow-hidden'>
        <Image
          src={instructor.imageUrl || "/assets/defaultAvater.png"}
          alt='Instructor Image'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col pt-2'>
        <div className='text-lg md:text-base font-medium group-hover:text-primary transition line-clamp-2'>
          {instructor.name}
        </div>
        <Link
          href={`mailto:${instructor.email}`}
          className='text-sm md:text-base font-medium group-hover:text-primary transition line-clamp-2'
        >
          {instructor.email}
        </Link>
        <div className='my-3 flex items-center gap-x-2 text-base md:text-xs'>
          {instructor.bio && instructor.bio.length > 120
            ? instructor.bio.slice(0, 120) + "..."
            : instructor.bio}
        </div>
        <div className='flex items-center gap-x-1 text-slate-500 text-sm'>
          Since {instructor.createdAt.getFullYear()}
        </div>
      </div>
    </div>
  );
}

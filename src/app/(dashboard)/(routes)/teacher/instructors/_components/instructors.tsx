"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
// import instructorImg from "../../../../../../../public/assets/profile.jpg";
import { Instructor } from "@prisma/client";
import Link from "next/link";

export default async function Instructors() {
  const instructors = await axios.get(`/api/instructors/`);
  console.log(instructors.data);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {instructors.data.map((instructor: Instructor) => (
        <div
          key={instructor.id}
          className="border border-1 border-black/20 rounded-lg p-4"
        >
          <div className="flex align-middle">
            <div>
              <Image
                width={100}
                height={100}
                className="w-30 h-30 rounded-full my-3"
                src={instructor.imageUrl || "instructorImg"}
                alt="Instructor Image"
              />
            </div>
            <div className="flex flex-col justify-center ps-2">
              <p className="text-lg font-semibold">{instructor.name}</p>
              <p className="text-sm">{instructor.bio}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Link href={`/teacher/instructors/${instructor.id}`}>
              <Button variant="ghost">Edit</Button>
            </Link>
            <Button variant="default">Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

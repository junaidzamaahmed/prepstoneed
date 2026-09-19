"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import instructorImg from "../../../../../../../public/assets/profile.jpg";
import { Instructor } from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Instructors({
  initialInstructors,
}: {
  initialInstructors: Instructor[];
}) {
  const router = useRouter();
  const [instructors, setInstructors] =
    useState<Instructor[]>(initialInstructors);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setInstructors(initialInstructors);
  }, [initialInstructors]);

  const deleteInstructor = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/instructors/`, { headers: { id } });
      setInstructors((current) => current.filter((item) => item.id !== id));
      toast.success("Instructor deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete instructor");
    } finally {
      setDeletingId(null);
    }
  };

  if (instructors.length === 0) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">No instructors yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {instructors.map((instructor: Instructor) => (
        <div
          key={instructor.id}
          className="border border-1 border-black/20 rounded-lg p-4"
        >
          <div className="grid grid-cols-6">
            <div className="col-span-2">
              <Image
                width={100}
                height={100}
                className="w-30 h-30 rounded-full my-3"
                src={instructor.imageUrl || instructorImg}
                alt="Instructor Image"
              />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-2">
              <p className="text-lg font-semibold">{instructor.name}</p>
              <p className="text-sm">{instructor.bio}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Link href={`/teacher/instructors/${instructor.id}`}>
              <Button variant="ghost">Edit</Button>
            </Link>
            <Button
              onClick={() => deleteInstructor(instructor.id)}
              variant="default"
              disabled={deletingId === instructor.id}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

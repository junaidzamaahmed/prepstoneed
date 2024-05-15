import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Students() {
  const courses = await db.course.findMany({
    include: {
      category: true,
    },
  });
  return (
    <div className="p-6">
      <Table>
        <TableCaption>A list of courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Category</TableHead>

            <TableHead className="text-right">View Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: any) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.category.name}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/teacher/students/${course.id}`}
                  className="bg-primary text-white p-2"
                >
                  View Students
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

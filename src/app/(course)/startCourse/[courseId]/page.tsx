import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiNotebook, PiQuestionBold } from "react-icons/pi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();
  let user = null;
  if (userId) {
    user = await db.user.findUnique({
      where: { externalId: userId },
    });
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      recordings: {
        orderBy: { createdAt: "asc" },
      },
      tests: {
        include: {
          attempts: {
            where: { userID: user?.id },
          },
        },
      },
    },
  });
  let totalAttempts = 0;
  let totalQuestionsAttempted = 0;

  course?.tests?.forEach((test) => {
    totalAttempts += test.attempts.length;
  });
  course?.tests?.forEach((test) => {
    test.attempts.forEach((attempt) => {
      totalQuestionsAttempted += 98;
    });
  });
  if (!course) {
    return redirect("/");
  }
  if (course.recordings.length === 0) {
    return redirect(`/`);
  }
  // return redirect(
  //   `/startCourse/${params.courseId}/recordings/${course?.recordings[0]?.id}`
  // );

  return (
    <div className="bg-accent/60">
      <div className="p-6 container">
        <div className="my-1">
          <p className="text-xl">
            Welcome, <span className="font-semibold">{user?.fullName}</span>!
          </p>
          <p>Here&apos;s the course overview.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="w-full h-30 bg-primary text-white p-4 rounded-sm">
            <h3 className="text-xl flex items-center">
              <PiNotebook className="mr-2" /> Tests
            </h3>
            <p className="font-semibold text-4xl py-2">{totalAttempts}</p>
            <p>Tests Taken</p>
          </div>
          <div className="w-full h-30 bg-secondary text-white p-4 rounded-sm">
            <h3 className="text-xl flex items-center">
              <Video className="mr-2" /> Videos
            </h3>
            <p className="font-semibold text-4xl py-2">
              {course.recordings.length}
            </p>
            <p>Recorded Lectures</p>
          </div>
          <div className="w-full h-30 bg-green-900 text-white p-4 rounded-sm">
            <h3 className="text-xl flex items-center">
              <PiQuestionBold className="mr-2" /> Practice
            </h3>
            <p className="font-semibold text-4xl py-2">
              {totalQuestionsAttempted}
            </p>
            <p>Questions Attempted</p>
          </div>
        </div>
        <div className="my-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 w-full shadow-xl p-6 bg-white">
            <div className="flex justify-between">
              <p className="text-lg">Your Goals</p>
            </div>
            <div className="my-3 grid grid-cols-3 gap-4">
              <div className="bg-accent p-4 text-center">
                <p className="text-primary text-2xl font-bold">1600</p>
                <p>Combined</p>
              </div>
              <div className="bg-accent p-4 text-center">
                <p className="text-primary text-2xl font-bold">800</p>
                <p>Reading and Writing</p>
              </div>
              <div className="bg-accent p-4 text-center">
                <p className="text-primary text-2xl font-bold">800</p>
                <p>Math</p>
              </div>
            </div>
            <div className="w-full bg-gradient-to-r from-primary to-secondary mx-auto mt-10 rounded-full">
              <p className="text-white text-sm p-3 text-center">
                Refer your friends for free practice tests and premium package
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 shadow-xl p-6 space-y-2 bg-white">
            <p className="text-lg ">Upcoming Dates</p>
            <div className="bg-accent grid grid-cols-6 p-3 rounded-md">
              <div className="col-span-2 bg-primary rounded-md text-center p-2">
                <p className="text-white font-semibold text-md">04</p>
                <p className="text-white text-md">May</p>
              </div>
              <div className="col-span-4 text-center p-2">
                <p className="text-md font-medium">Digital SAT Exam</p>
                <Link
                  target="_blank"
                  href="https://satsuite.collegeboard.org/sat/dates-deadlines"
                  className="text-sm text-primary py-1"
                >
                  Register before Apr 19
                </Link>
              </div>
            </div>
            <div className="bg-accent grid grid-cols-6 p-3 rounded-md">
              <div className="col-span-2 bg-primary rounded-md text-center p-2">
                <p className="text-white font-semibold text-md">01</p>
                <p className="text-white text-md">Jun</p>
              </div>
              <div className="col-span-4 text-center p-2">
                <p className="text-md font-medium">Digital SAT Exam</p>
                <Link
                  target="_blank"
                  href="https://satsuite.collegeboard.org/sat/dates-deadlines"
                  className="text-sm text-primary py-1"
                >
                  Register before May 16
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white shadow-xl p-6">
          <p className="text-lg mb-3">Recently Attempted Tests</p>
          <Table>
            <TableCaption>
              A list of your recently attempted tests.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Date and Time</TableHead>
                <TableHead className="text-right">Report</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {course.tests.map((test: any) => {
                return test.attempts.map((attempt: any) => {
                  return (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">
                        {test.title}
                      </TableCell>
                      <TableCell>
                        {attempt.startTime.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/reports/${attempt.id}`}
                          className="text-sky-500"
                        >
                          View Report
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

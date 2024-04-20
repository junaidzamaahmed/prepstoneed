import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import instructor from "../../../../../../public/assets/profile.jpg";
import course from "../../../../../../public/assets/course.jpg";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Course({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;

  const courseData = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      CoursePoints: true,
      CourseRoutine: true,
      FAQ: true,
    },
  });
  const ins = await db.instructor.findUnique({
    where: {
      id: courseData?.instructorId || "",
    },
  });
  return (
    <div className="p-4 grid grid-cols-2 gap-4 lg:gap-16 container">
      <div className="">
        <h1 className="text-3xl font-semibold">{courseData?.title}</h1>
        <p className="mt-3 text-sm">{courseData?.description}</p>
        <div className="border border-1 border-black/20 rounded-lg my-5 p-4">
          <h3 className="font-semibold text-lg">Course Instructor</h3>
          <div className="flex align-middle" key={courseData?.instructorId}>
            <div>
              <Image
                className="w-20 h-20 rounded-full my-3"
                height={100}
                width={100}
                src={ins?.imageUrl || instructor}
                alt="Instructor Image"
              />
            </div>
            <div className="flex flex-col justify-center ps-2">
              <p className="text-lg font-semibold">{ins?.name}</p>
              <p className="text-sm">{ins?.bio}</p>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold my-1">
          What you&apos;ll learn in this course
        </h3>
        <div className="border border-1 border-black/20 rounded-lg p-4 grid grid-cols-2">
          {courseData?.CoursePoints.map((point) => (
            <div className="" key={point.id}>
              <p className="my-3">
                <CheckCircle size={16} className="inline-block text-blue-400" />
                <span className="ps-2">{point.description}</span>
              </p>
            </div>
          ))}
        </div>
        <h3 className="mt-4 mb-1 font-semibold text-lg">Class Routine</h3>
        <div>
          <table className="table-auto w-full text-left border-collapse border border-black/20">
            <thead>
              <tr>
                <th className="border-collapse border border-black/20 p-1">
                  Chapter Title
                </th>
                <th className="border-collapse border border-black/20 p-1">
                  Day
                </th>
                <th className="border-collapse border border-black/20 p-1">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {courseData?.CourseRoutine.map((cls) => (
                <tr key={cls.id}>
                  <td className="border-collapse border border-black/20 p-1">
                    {cls.title}
                  </td>
                  <td className="border-collapse border border-black/20 p-1">
                    {cls.day}
                  </td>
                  <td className="border-collapse border border-black/20 p-1">
                    {cls.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mt-8 mb-1">FAQ</h3>
        <Accordion type="single" collapsible>
          {courseData?.FAQ.map((ques) => (
            <AccordionItem key={ques.id} value={ques.id}>
              <AccordionTrigger>{ques.question}</AccordionTrigger>
              <AccordionContent>{ques.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="">
        <div className="border border-1 border-black/20 rounded-lg fixed mr-4 lg:mr-20">
          <Image
            height={500}
            width={500}
            className="rounded-t-lg w-full"
            src={courseData?.imageUrl || ""}
            alt=""
          />
          <div className="p-2">
            <p className="text-2xl font-semibold">{courseData?.price} Taka</p>
            <Link href={`/courses/${params.courseId}/purchase`}>
              <button className="bg-primary text-white w-full py-3 rounded-lg my-3">
                Buy Now
              </button>
            </Link>
            <div className="my-4">
              <div className="ps-3">
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Total 30 Classes</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">40 Hour Lectures</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Weekly Quiz</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Final Exam</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Certificate</span>
                </p>
              </div>
            </div>
          </div>
          <div className="fixed my-1">
            <span>
              Call us for any queries:{" "}
              <a className="text-primary" href="tel:+8801711111111">
                +8801711111111
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

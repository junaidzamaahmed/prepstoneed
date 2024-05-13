import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Category, Course, Quiz, Recordings } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayIcon, UnlockIcon } from "lucide-react";
import Link from "next/link";
// import Link from "next/link";
// import { headers } from "next/headers";

interface CourseSidebarProps {
  course: Course & {
    recordings: Recordings[];
    tests: Quiz[];
    category: Category | null;
  };
}
export default async function CourseSidebar({ course }: CourseSidebarProps) {
  const { userId } = auth();
  // const headersList = headers();
  // const fullUrl = headersList.get("referer") || "";
  let user = null;
  if (userId) {
    user = await db.user.findUnique({
      where: { externalId: userId },
    });
  }

  const purchase = await db.purchase.findUnique({
    where: { userId_courseId: { userId: user?.id || "", courseId: course.id } },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Purchase check */}
      </div>
      <div className="flex flex-col w-full">
        {/* {course.recordings.map((recording) => (
          <CourseSidebarItem
            key={recording.id}
            recording={recording}
            courseId={course.id}
          />
        ))} */}
        {/* <div className="md:col-span-5 xl:col-span-4 col-span-12 p-2">
          <h3 className="font-semibold text-md">COURSE CONTENT</h3>
          <p className="text-black/70 text-sm mb-2">2 Sections, 7 Lectures</p>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-3"
            className="w-full mb-10 border border-1 border-slate-300 rounded-lg first:rounded-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all rounded-lg">
                <div className="text-left">
                  <p>Introduction</p>
                  <p className="text-black/70 text-xs mb-2 block">4 Lectures</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">Introduction</p>
                  </div>
                  <UnlockIcon
                    size={12}
                    className="text-slate-500 group-hover:text-secondary transition-all"
                  />
                </div>
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">PDF</p>
                  </div>
                  <UnlockIcon
                    size={12}
                    className="text-slate-500 group-hover:text-secondary transition-all"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>Resources for DSAT</p>
                  <p className="text-black/70 text-xs mb-2 block">1 Lecture</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">PDF</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>Recorded Classes</p>
                  <p className="text-black/70 text-xs mb-2 block">
                    {course?.recordings.length} Lectures
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                {course?.recordings.map((recording) => (
                  // <Link
                  //   key={recording.id}
                  //   href={`/startCourse/${course.id}/recordings/${recording.id}`}
                  // >
                  //   <div
                  //     className={`${
                  //       activeId == recording.id &&
                  //       "bg-secondary/5 text-secondary"
                  //     } flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group`}
                  //   >
                  //     <div
                  //       className={`${
                  //         activeId == recording.id && "text-secondary"
                  //       } flex items-center space-x-2 hover:text-secondary`}
                  //     >
                  //       <PlayIcon
                  //         size={16}
                  //         className={`pl-[2px] py-[2px] rounded-full text-white ${
                  //           activeId == recording.id
                  //             ? "bg-secondary"
                  //             : "bg-black"
                  //         } group-hover:bg-secondary transition-all`}
                  //       />
                  //       <p className="font-medium">{recording.title}</p>
                  //     </div>
                  //     {recording.isFree || purchase ? null : (
                  //       <Lock
                  //         size={12}
                  //         className={`${
                  //           activeId == recording.id
                  //             ? "text-secondary"
                  //             : "text-slate-500"
                  //         } group-hover:text-secondary transition-all`}
                  //       />
                  //     )}
                  //   </div>
                  // </Link>
                  <CourseSidebarItem
                    key={recording.id}
                    recording={recording}
                    courseId={course.id}
                    purchase={purchase}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>Adaptive Mock Tests</p>
                  <p className="text-black/70 text-xs mb-2 block">
                    {course?.tests.length} Tests
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                {course?.tests.map((test) => (
                  <Link key={test.id} href={`/startTest/${test.id}`}>
                    <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                      <div className="flex items-center space-x-2 hover:text-secondary">
                        <PlayIcon
                          size={16}
                          className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                        />
                        <p className="font-medium">{test.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div> */}
        <div className="md:col-span-5 xl:col-span-4 col-span-12 p-2">
          <h3 className="font-semibold text-md">COURSE CONTENT</h3>
          <p className="text-black/70 text-sm mb-2">
            2 Sections, {course?.recordings.length} Lectures
          </p>
          <Accordion
            type="single"
            collapsible
            className="w-full mb-10 border border-1 border-slate-300 rounded-lg first:rounded-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all rounded-lg">
                <div className="text-left">
                  <p>Introduction</p>
                  <p className="text-black/70 text-xs mb-2 block">4 Lectures</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">Introduction</p>
                  </div>
                  <UnlockIcon
                    size={12}
                    className="text-slate-500 group-hover:text-secondary transition-all"
                  />
                </div>
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">PDF</p>
                  </div>
                  <UnlockIcon
                    size={12}
                    className="text-slate-500 group-hover:text-secondary transition-all"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>
                    Resources for{" "}
                    {course?.category?.name == "DSAT"
                      ? "DSAT"
                      : course?.category?.name == "BUP" && "BUP FBS"}
                  </p>
                  <p className="text-black/70 text-xs mb-2 block">1 Lecture</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                  <div className="flex items-center space-x-2 hover:text-secondary">
                    <PlayIcon
                      size={16}
                      className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                    />
                    <p className="font-medium">PDF</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>Recorded Classes</p>
                  <p className="text-black/70 text-xs mb-2 block">
                    {course?.recordings.length} Lectures
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                {course?.recordings.map((recording) => (
                  // <div
                  //   key={recording.id}
                  //   className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group"
                  // >
                  //   <div className="flex items-center space-x-2 hover:text-secondary">
                  //     <PlayIcon
                  //       size={16}
                  //       className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                  //     />
                  //     <p className="font-medium">{recording.title}</p>
                  //   </div>
                  // </div>
                  <CourseSidebarItem
                    key={recording.id}
                    recording={recording}
                    purchase={purchase}
                    courseId={course.id}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            {course?.category?.name == "BUP" && (
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                  <div className="text-left">
                    <p>Practice Tests</p>
                    <p className="text-black/70 text-xs mb-2 block">
                      {course?.tests.length} Tests
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="my-1">
                  {/* {course?.tests.map((test) => (
                      <div
                        key={test.id}
                        className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group"
                      >
                        <div className="flex items-center space-x-2 hover:text-secondary">
                          <PlayIcon
                            size={16}
                            className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                          />
                          <p className="font-medium">{test.title}</p>
                        </div>
                      </div>
                    ))} */}
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                <div className="text-left">
                  <p>
                    {course?.category?.name == "DSAT"
                      ? "Adaptive"
                      : course?.category?.name == "BUP" && ""}
                    Mock Tests
                  </p>
                  <p className="text-black/70 text-xs mb-2 block">
                    {course?.tests.length} Tests
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="my-1">
                {course?.tests.map((test) => (
                  <Link key={test.id} href={`/startTest/${test.id}`}>
                    <div className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group">
                      <div className="flex items-center space-x-2 hover:text-secondary">
                        <PlayIcon
                          size={16}
                          className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                        />
                        <p className="font-medium">{test.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
            {course?.category?.name == "BUP" && (
              <AccordionItem value="item-6">
                <AccordionTrigger className="px-3 py-2 hover:no-underline data-[state=open]:bg-accent transition-all">
                  <div className="text-left">
                    <p>E-Qbanks</p>
                    <p className="text-black/70 text-xs mb-2 block">
                      0 E-Qbanks
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="my-1">
                  {/* {course?.tests.map((test) => (
                      <div
                        key={test.id}
                        className="flex justify-between py-[5px] items-center hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer px-3 group"
                      >
                        <div className="flex items-center space-x-2 hover:text-secondary">
                          <PlayIcon
                            size={16}
                            className="pl-[2px] py-[2px] rounded-full text-white bg-black group-hover:bg-secondary transition-all"
                          />
                          <p className="font-medium">{test.title}</p>
                        </div>
                      </div>
                    ))} */}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

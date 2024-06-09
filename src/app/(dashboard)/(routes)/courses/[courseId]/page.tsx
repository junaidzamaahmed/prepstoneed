import { CheckCircle2Icon, PlayIcon, UnlockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import CourseSidebarItem from "@/app/(course)/startCourse/[courseId]/_components/course-sidebar-item";

export default async function DSAT({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      CourseFeatures: true,
      purchases: true,
      FAQ: true,
      recordings: true,
      tests: true,
      category: true,
    },
  });
  let purchase: any = false;
  if (userId) {
    const user = await db.user.findUnique({
      where: {
        externalId: userId,
      },
    });
    purchase = course?.purchases.find(
      (purchase) => purchase.userId === user?.id
    );
  }
  return (
    <div>
      <section className="bg-primary">
        <div className="container grid grid-cols-12 gap-4 p-10 text-white">
          <div className="md:col-span-7 xl:col-span-8 col-span-12">
            <h1 className="font-bold text-2xl mb-2">{course?.title}</h1>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 my-6">
              {course?.CourseFeatures.map((feature) => (
                <div
                  className="w-full text-center bg-[#194e9e] rounded-lg p-4 flex flex-col"
                  key={feature.id}
                >
                  <CheckCircle2Icon size={32} className="mx-auto mb-2" />
                  <p>{feature.feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 xl:col-span-4 col-span-12">
            <div className="bg-white w-full border border-1 rounded pb-1">
              <div>
                {course?.imageUrl && (
                  <Image
                    // src={"/assets/course.jpg"}
                    src={course?.imageUrl}
                    width={500}
                    height={500}
                    className="w-full h-full rounded-t"
                    alt="course image"
                  />
                )}
                {!course?.imageUrl && (
                  <Image
                    src={"/assets/banner.jpg"}
                    width={500}
                    height={500}
                    className="w-full h-full rounded-t"
                    alt="course image"
                  />
                )}
                {/* <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/7IFJb-uLEaI?si=ECFdRLgZ2j5AFP7N"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-64 rounded-t"
                ></iframe> */}
                {/* <iframe
                  src="https://drive.google.com/file/d/1ZuPDRPEzgVY1k_drZlTYbKFrGHXgX54q/preview"
                  width="640"
                  height="480"
                  allow="autoplay"
                  allowFullScreen
                  className="w-full h-64 rounded-t"
                ></iframe> */}
                {/* <div className="pop-out1">
                  <iframe
                    src="https://drive.google.com/file/d/1ZuPDRPEzgVY1k_drZlTYbKFrGHXgX54q/preview"
                    // width="425"
                    height="200"
                    allow="fullscreen"
                    seamless
                    className="w-full"
                  ></iframe>
                  <div className="pop-out2">
                    <Image
                      width={400}
                      height={400}
                      alt="logo"
                      src="/logo.png"
                    />
                  </div>
                </div> */}
              </div>
              <p className="px-2 py-3 text-primary font-bold text-xl">
                &#2547; {course?.price}
              </p>
              <div className="mx-1">
                {purchase ? (
                  <Link
                    className="bg-secondary py-2 w-full text-center text-white block rounded hover:bg-secondary/80 transition"
                    href={`/startCourse/${course?.id}`}
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <>
                    <Link
                      className="mb-1 bg-secondary py-2 w-full text-center text-white block rounded hover:bg-secondary/80 transition"
                      href={`/startCourse/${course?.id}`}
                    >
                      Start Learning
                    </Link>
                    <Link
                      className="bg-secondary py-2 w-full text-center text-white block rounded hover:bg-secondary/80 transition"
                      href={`/courses/${course?.id}/purchase`}
                    >
                      Buy Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Banner
        variant="success"
        label={`A live class is going on right now! Click <a style="color:yellow;text-decoration:underline;" href="https://www.google.com" target="_blank">here</a> to join the class. `}
      />
      <section>
        <div className="container grid grid-cols-12 gap-4 p-10">
          <div className="md:col-span-7 xl:col-span-8 col-span-12">
            <h2 className="font-bold text-2xl mb-2 text-secondary">
              {course?.category?.name == "DSAT"
                ? "Digital SAT Suite: Overall Test Specifications"
                : course?.category?.name == "BUP" &&
                  "BUP FBS 2nd Timers Elite Batch 2.0"}
            </h2>
            <p className="text-black/70 font-medium w-[80%] ">
              {course?.description}
            </p>

            {/* <table className="text-left w-full table-auto border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Test</th>
                  <th className="border border-slate-300 p-2">Reading</th>
                  <th className="border border-slate-300 p-2">
                    Writing & Language
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold">
                    Test
                  </td>
                  <td className="border border-slate-300 p-2">Reading</td>
                  <td className="border border-slate-300 p-2">
                    Writing & Language
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold">
                    Test
                  </td>
                  <td className="border border-slate-300 p-2">Reading</td>
                  <td className="border border-slate-300 p-2">
                    Writing & Language
                  </td>
                </tr>
              </tbody>
            </table> */}

            {/* <Accordion
              type="single"
              collapsible
              className="w-full my-10 border border-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-secondary px-3 hover:no-underline">
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-secondary px-3 hover:no-underline">
                  Is it styled?
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-secondary px-3 hover:no-underline">
                  Is it animated?
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}

            <h3 className="font-bold text-2xl mb-2 text-secondary mt-5">FAQ</h3>
            <Accordion
              type="single"
              collapsible
              className="w-full mb-10 border border-1"
            >
              {course?.FAQ.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-secondary px-3 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="md:col-span-5 xl:col-span-4 col-span-12">
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
                    <p className="text-black/70 text-xs mb-2 block">
                      4 Lectures
                    </p>
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
                    <p className="text-black/70 text-xs mb-2 block">
                      1 Lecture
                    </p>
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
                  ))}
                </AccordionContent>
              </AccordionItem>{" "}
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
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Course } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PropType = {
  courses: Course[];
  options?: EmblaOptionsType;
};

const CoursesCarousel: React.FC<PropType> = (props) => {
  const { courses, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, align: "start" });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className='relative'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex items-stretch justify-center'>
          {courses?.map((course) => (
            <div
              className='flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_40%] pl-4 '
              key={course.id}
            >
              <Card className='h-full flex flex-col'>
                <CardHeader className='p-0'>
                  <Image
                    alt='course image'
                    height={200}
                    width={400}
                    className='w-full h-48 object-cover rounded-t-lg'
                    src={course.imageUrl || "/placeholder.svg"}
                  />
                </CardHeader>
                <CardContent className='flex-grow p-4'>
                  <CardTitle className='text-lg mb-2 line-clamp-2'>
                    {course.title}
                  </CardTitle>
                  <p>
                    {course.description
                      ? course.description.length > 50
                        ? course.description.slice(0, 50) + "..."
                        : course.description
                      : ""}
                  </p>
                </CardContent>
                <CardFooter className='p-4 pt-0 flex gap-2 justify-between'>
                  <p className='text-primary font-semibold text-xl'>
                    &#2547;{course.price}
                  </p>
                  <Link className='w-fit' href={`/courses/${course.id}`}>
                    <Button className='w-full'>Start Course</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-4 space-x-2 items-center'>
        <div>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className='flex justify-center mt-4 items-center space-x-2 overflow-hidden max-w-10'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "w-8 h-2 bg-blue-500"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default CoursesCarousel;

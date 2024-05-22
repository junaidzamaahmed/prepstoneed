"use client";
import React from "react";
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
import styles from "./courseCarouselStyles.module.css";

type PropType = {
  courses: Course[];
  options?: EmblaOptionsType;
};

const CoursesCarousel: React.FC<PropType> = (props) => {
  const { courses, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {courses?.map((course) => (
            <div className={styles.embla__slide} key={course.id}>
              <Card className="mx-2 p-0">
                <CardHeader className="p-0">
                  <Image
                    alt="course image"
                    height={400}
                    width={400}
                    className="w-full h-full object-cover rounded-t-lg"
                    src={course.imageUrl || ""}
                  />
                  <CardTitle className="text-md px-3 py-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-primary font-semibold text-xl px-3 py-2">
                    &#2547;
                    {course.price}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between px-2 py-2">
                  <Link className="w-full" href={`/courses/${course.id}`}>
                    <Button className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/5 w-full">
                      Start
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles.embla__dot__selected : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesCarousel;

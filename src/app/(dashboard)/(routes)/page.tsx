import React from "react";
import HeroCarousel from "../_components/hero-carousel";
import AllCoursesTabs from "../_components/AllCoursesTabs";
import { db } from "@/lib/db";
import OurELearning from "../_components/our-elearning";
import HowToStart from "../_components/HowToStart";
import Testimonials from "../_components/testimonials";
import WhyPrepstone from "../_components/WhyPrepstone";

export default async function Home() {
  const categories = await db.category.findMany({
    where: {
      isCourseCategory: true,
    },
    include: {
      courses: {
        where: {
          isPublished: true,
        },
      },
    },
  });
  return (
    <>
      <HeroCarousel />
      <AllCoursesTabs categories={categories} />
      {/* <OurELearning /> */}
      <WhyPrepstone />
      <HowToStart />
      <Testimonials />
    </>
  );
}

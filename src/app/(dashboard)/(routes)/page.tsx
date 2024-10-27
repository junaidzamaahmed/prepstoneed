import React from "react";
import HeroCarousel from "../_components/hero-carousel";
import AllCoursesTabs from "../_components/AllCoursesTabs";
import { db } from "@/lib/db";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <HeroCarousel />
      <AllCoursesTabs categories={categories} />
      <WhyPrepstone />
      <HowToStart />
      <Testimonials />
    </div>
  );
}

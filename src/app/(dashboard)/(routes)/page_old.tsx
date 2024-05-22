import React from "react";
import HeroCarousel from "../_components/hero-carousel";
import AllCoursesTabs from "../_components/AllCoursesTabs";
import { db } from "@/lib/db";

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
    </>
  );
}

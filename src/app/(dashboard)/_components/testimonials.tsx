"use client";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";

const testimonials = [
  {
    name: "Tajidul Haque Protul",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/profile.jpg",
    comment:
      "I recently had the privilege of being a part of PrepStone's classes for a few months, and I must say it was an incredible experience. From the moment I enrolled, they took excellent care of me, ensuring that my learning journey was not only productive but also enjoyable. PrepStone stands out for its commitment to providing timely solutions and valuable information to help students excel. \nThank you, PrepStone, for your dedication to students.",
  },
  {
    name: "Najifa Yousuf Oishy",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/profile.jpg",
    comment:
      "Honestly,after DU exam,I was so confused how to prepare for JU IBA. Then when I got to know this platform and I didn't think about anything and got admitted myself.Now I am literally grateful that I took the right decision.The mentors are very friendly and dedicated.I got much more than I have expected from this platform. I am grateful to all mentors. JajakAllahu Khayran.",
  },
];

export default function Testimonials() {
  return (
    <div className="container my-36">
      <div className="px-5 pt-5 pb-52 bg-gradient-to-b from-primary to-primary/60 rounded-xl">
        <h3 className="text-white font-bold text-3xl">
          What Our Students Say About Us
        </h3>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="mx-auto lg:w-[40vw] -mt-40"
      >
        <CarouselContent>
          {testimonials.map((review, index) => (
            <CarouselItem key={index}>
              <div className="p-1 m-2">
                <Card className=" shadow-lg">
                  <CardContent className="flex items-center justify-center">
                    <div className="grid grid-cols-12">
                      <div className="col-span-2 p-3 row-span-2">
                        <Image
                          src={review.img}
                          alt="profile picture"
                          width={100}
                          height={100}
                          className="xl:p-2 h-full aspect-square rounded-full"
                        />
                      </div>
                      <div className="col-span-10 row-span-2 flex flex-col justify-center">
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm">{review.location}</p>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <BsStarFill
                                className="text-yellow-500 me-[2px]"
                                key={index}
                                size={12}
                              />
                            )
                          )}
                        </div>
                      </div>
                      <div className="col-span-12 text-justify p-2">
                        {review.comment}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-10" />
        <CarouselNext className="mr-10" />
      </Carousel>
    </div>
  );
}

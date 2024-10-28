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
      "I recently had the privilege of being a part of PrepStone's classes for a few months, and I must say it was an incredible experience. From the moment I enrolled, they took excellent  care of me, ensuring that my learning journey was not only productive but also enjoyable. PrepStone stands out for its commitment to providing timely solutions and valuable information to help students excel. \nThank you, PrepStone, for your dedication to students.",
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
    <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          What Our Students Say About Us
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="max-w-4xl mx-auto max-lg:px-8"
        >
          <CarouselContent>
            {testimonials.map((review, index) => (
              <CarouselItem key={index}>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <Image
                        src={review.img}
                        alt={`${review.name}'s profile picture`}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{review.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {review.location}
                        </p>
                        <div className="flex mb-4">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <BsStarFill
                                key={index}
                                className="text-yellow-500 mr-1"
                                size={16}
                              />
                            )
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center mt-8 gap-4 max-w-full">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

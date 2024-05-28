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
    name: "Junaid Ahmed",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/1632307192368.jpg",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo corporis distinctio, odit ad nostrum odio non veniam! Exercitationem impedit doloribus atque inventore? Dolorem consequuntur eligendi culpa! Laudantium, eaque nostrum. Harum.",
  },
  {
    name: "Junaid Muhammad",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/1632307192368.jpg",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo corporis distinctio, odit ad nostrum odio non veniam! Exercitationem impedit doloribus atque inventore? Dolorem consequuntur eligendi culpa! Laudantium, eaque nostrum. Harum.",
  },
  {
    name: "Junaid Zama",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/1632307192368.jpg",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo corporis distinctio, odit ad nostrum odio non veniam! Exercitationem impedit doloribus atque inventore? Dolorem consequuntur eligendi culpa! Laudantium, eaque nostrum. Harum.",
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae, quasi accusantium quae illum vel atque veritatis
                        labore cumque animi voluptate ducimus! Cum rem at
                        ratione error eligendi id enim dignissimos cupiditate
                        neque iure quaerat blanditiis, quis rerum sapiente
                        officiis non libero quibusdam. Accusantium, non.
                        Asperiores adipisci quasi ex consectetur suscipit?
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

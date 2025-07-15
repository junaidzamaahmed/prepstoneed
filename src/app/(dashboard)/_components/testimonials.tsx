"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const defaultTestimonials: Testimonial[] = [
  {
    name: "Tajidul Haque Protul",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/profile.jpg",
    comment:
      "I recently had the privilege of being a part of PrepStone's classes for a few months, and I must say it was an incredible experience. From the moment I enrolled, they took excellent care of me, ensuring that my learning journey was not only productive but also enjoyable. PrepStone stands out for its commitment to providing timely solutions and valuable information to help students excel.\nThank you, PrepStone, for your dedication to students.",
  },
  {
    name: "Najifa Yousuf Oishy",
    location: "Dhaka, Bangladesh",
    rating: 5,
    img: "/assets/profile.jpg",
    comment:
      "Honestly, after the DU exam, I was so confused about how to prepare for JU IBA. Then I discovered this platform and didn't think twice before enrolling. Now, I'm truly grateful I made that decision. The mentors are very friendly and dedicated. I received much more than I expected. I'm thankful to all the mentors. JazakAllahu Khayran.",
  },
];

type Testimonial = {
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  img: string;
  comment: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const getTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials();
      if (Array.isArray(data) && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(defaultTestimonials);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className='py-16 bg-gradient-to-b from-primary/10 to-background'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 text-primary'>
          What Our Students Say About Us
        </h2>
        <div className='w-full max-w-4xl mx-auto'>
          <Carousel
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className='w-full'
          >
            <CarouselContent className='h-[500px]'>
              {testimonials.map((review, index) => (
                <CarouselItem key={index} className='h-full flex'>
                  <Card className='border-0 shadow-none w-full h-full flex flex-col'>
                    <CardContent className='p-2 flex flex-col h-full'>
                      {/* Testimonial Text */}
                      <div className='rounded-lg p-8 flex-1 flex items-center justify-center'>
                        <p
                          className='text-center leading-relaxed text-xs
                          sm:text-sm md:text-base
                          whitespace-pre-line'
                        >
                          {review.comment}
                        </p>
                      </div>

                      {/* Profile Section */}
                      <div className='flex flex-col items-center space-y-4 mt-auto'>
                        {/* Avatar */}
                        <Avatar className='w-16 h-16'>
                          <AvatarImage
                            src={review.img || "/assets/defaultAvater.png"}
                            alt={`${review.name}'s profile picture`}
                            className='object-cover'
                          />
                          <AvatarFallback className='bg-gray-200 text-gray-600'>
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        {/* Name and Location */}
                        <div className='text-center'>
                          <h3 className='font-semibold text-gray-900 text-lg capitalize'>
                            {review.name}
                          </h3>
                          <p className='text-gray-500 text-sm capitalize'>
                            {review.location}
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div className='flex space-x-1'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className='flex justify-center items-center mt-6 space-x-4'>
              <CarouselPrevious className='relative translate-y-0 left-0' />
              <div className='flex space-x-2 items-center'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === current
                        ? "w-8 h-2 bg-blue-500"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <CarouselNext className='relative translate-y-0 right-0' />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

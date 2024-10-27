"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroCarousel: React.FC = () => {
  const options: EmblaOptionsType = {};

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="relative overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-4xl lg:text-6xl font-extrabold text-primary">
                    PrepstoneEd <span className="text-secondary">BD</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Prepstone is an online edtech platform started with a
                    motivation to assist students to its highest capacity with
                    some enthusiastic, brilliant minds. Prepstone is committed
                    to help you in a very effective way. We are here to help you
                    utilising the potential you hold and change the perception
                    that online can be better way of learning and taking
                    preparation.
                  </p>
                  <Button size="lg" className="text-lg">
                    Get Started
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <Image
                    width={600}
                    height={600}
                    alt="online learning"
                    src="/assets/undraw_online_learning_re_qw08.svg"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0">
        <div className="embla__dots flex justify-center space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;

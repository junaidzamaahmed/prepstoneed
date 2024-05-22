"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import styles from "./herostyles.module.css";

const HeroCarousel: React.FC = () => {
  const options: EmblaOptionsType = {};

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className={`${styles.embla} container`}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla__slide}>
            <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 my-4">
              <div className="flex flex-col justify-center">
                <h1 className="text-secondary font-extrabold text-5xl mb-2">
                  PrepstoneEd <span className="text-slate-600">BD</span>
                </h1>
                <p className="tracking-widest leading-6 text-sm text-justify xl:max-w-[70%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi voluptatem, autem reprehenderit iste eius quis,
                  laudantium nesciunt dolores rem, ducimus error quod fugiat.
                  Delectus ea distinctio autem similique, libero laudantium
                  soluta eveniet id temporibus officiis maiores recusandae
                  voluptas culpa dolorum veritatis fugit tempora earum
                  asperiores ex fugiat quaerat! Optio, sapiente?
                </p>
              </div>
              <div className="p-4">
                <Image
                  width={500}
                  height={500}
                  alt="online learning"
                  src={"/assets/undraw_online_learning_re_qw08.svg"}
                />
              </div>
            </div>
          </div>
          <div className={styles.embla__slide}>
            <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 my-4">
              <div className="flex flex-col justify-center">
                <h1 className="text-secondary font-extrabold text-5xl mb-2">
                  PrepstoneEd <span className="text-slate-600">BD</span>
                </h1>
                <p className="tracking-widest leading-6 text-sm text-justify xl:max-w-[70%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi voluptatem, autem reprehenderit iste eius quis,
                  laudantium nesciunt dolores rem, ducimus error quod fugiat.
                  Delectus ea distinctio autem similique, libero laudantium
                  soluta eveniet id temporibus officiis maiores recusandae
                  voluptas culpa dolorum veritatis fugit tempora earum
                  asperiores ex fugiat quaerat! Optio, sapiente?
                </p>
              </div>
              <div className="p-4">
                <Image
                  width={500}
                  height={500}
                  alt="online learning"
                  src={"/assets/undraw_online_learning_re_qw08.svg"}
                />
              </div>
            </div>
          </div>
          <div className={styles.embla__slide}>
            <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 my-4">
              <div className="flex flex-col justify-center">
                <h1 className="text-secondary font-extrabold text-5xl mb-2">
                  PrepstoneEd <span className="text-slate-600">BD</span>
                </h1>
                <p className="tracking-widest leading-6 text-sm text-justify xl:max-w-[70%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi voluptatem, autem reprehenderit iste eius quis,
                  laudantium nesciunt dolores rem, ducimus error quod fugiat.
                  Delectus ea distinctio autem similique, libero laudantium
                  soluta eveniet id temporibus officiis maiores recusandae
                  voluptas culpa dolorum veritatis fugit tempora earum
                  asperiores ex fugiat quaerat! Optio, sapiente?
                </p>
              </div>
              <div className="p-4">
                <Image
                  width={500}
                  height={500}
                  alt="online learning"
                  src={"/assets/undraw_online_learning_re_qw08.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.embla__controls}>
        {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}

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

export default HeroCarousel;

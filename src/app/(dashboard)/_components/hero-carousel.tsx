import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden px-2'>
      {/* Decorative elements */}
      <div className='absolute top-28 left-1 w-3 h-3 bg-blue-600 rounded-full'></div>
      <div className='absolute top-40 right-20 w-2 h-2 bg-red-500 rounded-full'></div>
      <div className='absolute bottom-40 left-20 w-4 h-4 border-2 border-blue-600 rounded-full'></div>
      <div className='absolute bottom-60 right-10 w-3 h-3 bg-blue-600 rounded-full'></div>

      <div className='container mx-auto px-4 py-12 lg:py-20 z-10'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20'>
          {/* Text Content */}
          <div className='flex-1 text-center lg:text-left max-w-2xl'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6'>
              <span className='text-blue-600'>PrepstoneEd</span>
              <span className='text-red-500'>BD</span>
              <span className='text-gray-900'>
                Where Confidence Meets Preparation
              </span>
            </h1>

            <p className='text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-12'>
              Prepstone is an online edtech platform started with a motivation
              to assist students to its highest capacity with some enthusiastic,
              brilliant minds. Prepstone is committed to help you in a very
              effective way. We are here to help you utilising the potential you
              hold and change the perception that online can be better way of
              learning and taking preparation.
            </p>

            <div className=' flex-col sm:flex-row gap-4 justify-center lg:justify-start hidden lg:flex'>
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold'
              >
                Get Started
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold'
              >
                Browse Courses
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className='flex-1 flex justify-center lg:justify-end'>
            <div className='relative'>
              {/* Background circle */}
              <div className='w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] bg-blue-600 rounded-full relative overflow-hidden z-10'>
                <Image
                  src='/assets/student_image.png'
                  alt='Student studying with books and materials'
                  fill
                  className='object-contain object-center'
                  priority
                />
              </div>

              {/* Decorative ring */}
              <div className='absolute -inset-2 -top-6 -left-6  bottom-3 right-3 border-2 border-red-600/50 rounded-full '></div>

              {/* Small decorative elements around the image */}
              <div className='absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full'></div>
              <div className='absolute -bottom-4 -left-4 w-4 h-4 bg-red-500 rounded-full'></div>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start lg:hidden'>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold'
            >
              Get Started
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold'
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
      <div className='absolute w-64 h-64 -inset-2 top-[80%]  left-[55%] sm:left-[75%] lg:top-[52%] lg:left-[80%] scale-75 sm:scale-95 md:scale-100'>
        <div className='flex justify-center items-center  w-64 h-64 border-2 border-red-600/10 rounded-full'>
          <div className=' flex justify-center items-center -inset-2  w-48 h-48 border-2 border-red-600/10 rounded-full'>
            <div className='flex justify-center items-center  w-32 h-32 border-2 border-red-600/10 rounded-full'>
              <div className=' w-16 h-16 border-2 border-red-600/10 rounded-full'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-48 h-48 rounded-full bg-gradient-radial from-red-600 opacity-30 via-red-300 to-transparent blur-xl sm:top-10 absolute sm:right-0 -top-12 -right-16 '></div>
    </section>
  );
}

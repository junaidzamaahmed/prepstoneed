import Image from "next/image";

export default function SAT() {
  return (
    <div className="">
      {/* <!-- ! hero section  --> */}
      <section className="w-full py-32 bg-gradient-to-tl from-[#74DBCF] to-[#34837B]">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-14 md:grid-cols-2">
          {/* <!-- left  --> */}
          <div>
            <div className="md:text-4xl text-3xl text-white text-center mb-8 md:text-left xl:max-w-[355px] w-full">
              <h1 className="mb-4 font-semibold">
                Personalized SAT Test Prep Online
              </h1>
              <p className="text-2xl text-gray-100">Master SAT</p>
            </div>

            <div className="space-y-6">
              <button className="w-full md:w-[300px] h-[56px] bg-blue-200 uppercase font-medium transition hover:bg-blue-300 rounded-[4px] ">
                GET 1 DAY FREE TRIAL
              </button>
              <hr />
              {/* <h1 className="text-lg font-medium text-white text-center">
                100-POINT SCORE IMPROVEMENT GUARANTEE!
              </h1> */}
            </div>
          </div>

          {/* <!-- right  --> */}
          <div className="relative">
            <div className="w-[20rem] mx-auto relative md:max-w-[30rem] md:w-full">
              <img src="../assets/desktop.webp" alt="" className="max-w-full" />
              <img
                src="../assets/mobile.webp"
                alt=""
                className="w-[6rem] absolute -right-3 -bottom-2"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ! hero section  --> */}

      {/* <!-- ! winter sale section  --> */}
      {/* <section className="bg-purple-500 py-4">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 flex justify-center flex-col gap-4 md:gap-2 md:flex-row items-center">
          <a
            href="#"
            className="text-purple-800 bg-purple-200 py-1 px-4 uppercase rounded-full"
          >
            winter sale
          </a>
          <p className="text-center text-white">
            up to $301 off the Target Test Prep Course! Ends February 18, 2024
          </p>
        </div>
      </section> */}
      {/* <!-- ! winter sale section  --> */}

      {/* <!-- ! sponsor --> */}
      {/* <section className="py-8 bg-white">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 flex flex-col justify-center xl:flex-row xl:justify-between"> */}
      {/* <!-- left  --> */}
      {/* <div className="flex flex-col justify-center">
            <p className="text-gray-500 uppercase text-center mb-3 xl:text-left">
              A COMPANY FEATURED IN
            </p>
            <div className="flex items-center flex-col justify-center gap-3 md:flex-row md:gap-10">
              <img
                src="../assets/forbes@2x.png"
                alt="sponsor"
                className="w-28"
              />
              <img
                src="../assets/businessbecause@2x.png"
                alt="sponsor"
                className="w-48"
              />
              <img
                src="../assets/poets-quants@2x.png"
                alt="sponsor"
                className="w-48"
              />
            </div>
          </div> */}
      {/* <!-- right  --> */}
      {/* <div className="">
            <div className="flex items-center gap-2 justify-center">
              <img src="../assets/halfStar.svg" alt="" />
              <p>WITH 5.0 ON TRUSTPILOT</p>
            </div>

            <div className="flex text-center items-center gap-1 justify-center">
              <p>Excellent</p>

              <img src="../assets/stars-5.svg" alt="star" className="w-20" />

              <img src="../assets/halfStar.svg" alt="" className="max-w-full" />
              <p className="text-sm font-medium">Trustpilot</p>
            </div>
          </div> */}
      {/* </div> */}
      {/* </section> */}
      {/* <!-- ! sponsor --> */}

      {/* <!-- ! study course  --> */}
      <section className="py-14 bg-emerald-50">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-10 xl:grid-cols-[1fr_2fr]">
          {/* <!-- left  --> */}
          <div className="max-w-[590px] w-full mx-auto xl:max-w-[380px]">
            <p className="text-3xl font-medium  text-center xl:text-left">
              Why Target Test Prep is the
              <span className="text-emerald-700"> SAT course</span> for you
              <span className="w-12 h-1 bg-emerald-900 rounded-md my-2 mx-auto  xl:inline-block xl:mr-auto"></span>
            </p>
          </div>

          {/* <!-- right  --> */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 *:shadow-2xl *:shadow-emerald-200 max-w-[600px] w-full mx-auto xl:max-w-full">
            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                Personalized for You
              </h3>
              <p className="text-gray-700 leading-snug">
                Follow a personalized study plan that guides you through every
                step of your SAT math preparation.
              </p>
            </div>
            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                Smart Analytics
              </h3>
              <p className="text-gray-700 leading-snug">
                Home in on weak areas with smart analytics and error trackers,
                and turn weaknesses into strengths.
              </p>
            </div>

            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                Higher SAT Scores Guaranteed
              </h3>
              <p className="text-gray-700 leading-snug">
                Study for your SAT exam with confidence with our 100-point Score
                Improvement Guarantee.
              </p>
            </div>

            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                Learn from the Experts
              </h3>
              <p className="text-gray-700 leading-snug">
                More than 500 instructor-led, wisdom-packed teaching videos.
              </p>
            </div>

            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                2,000+ Practice Questions
              </h3>
              <p className="text-gray-700 leading-snug">
                Practice with thousands of realistic SAT math practice
                questions.
              </p>
            </div>
            <div className="bg-white py-6  px-5 rounded-md">
              <h3 className="text-lg text-gray-900 font-medium mb-2">
                SAT Math Made Easy
              </h3>
              <p className="text-gray-700 leading-snug">
                Master every concept, strategy, skill, and technique you need to
                earn a top SAT math score.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ! study course  --> */}

      {/* <!-- ! recognized team section  --> */}
      <section className="py-14 bg-emerald-50">
        {/*<div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0"> */}
        {/* <!-- left  --> */}
        {/* <div className="max-w-[700px] w-full mx-auto mb-10">
            <p className="text-3xl font-medium  text-center ">
              From the <span className="text-emerald-700">elite</span> team that
              created
              <span className="text-emerald-700">globally recognized</span> TTP
              GMAT course
              <span className="w-12 h-1 bg-emerald-900 rounded-md my-2 mx-auto  md:inline-block md:mr-auto xl:mx-auto xl:block"></span>
            </p>
          </div> */}

        {/* <!-- right  --> */}
        {/* <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 justify-center">
            <div className="xl:max-w-[180px] max-w-[200px] w-full mx-auto">
              <img
                className="w-full mx-auto"
                src="../assets/btg@2x.webp"
                alt=""
              />
            </div>
            <div className="xl:max-w-[180px] max-w-[200px] w-full mx-auto">
              <img
                className="w-full mx-auto"
                src="../assets/gmat-club@2x.webp"
                alt=""
              />
            </div>
            <div className="xl:max-w-[180px] max-w-[200px] w-full mx-auto">
              <img
                className="w-full mx-auto"
                src="../assets/mba@2x.webp"
                alt=""
              />
            </div>

            <div className="xl:max-w-[180px] max-w-[200px] w-full mx-auto">
              <img
                className="w-full mx-auto"
                src="../assets/pq@2x.webp"
                alt=""
              />
            </div>
          </div>
        </div> */}

        {/* <!-- -------------------------------- --> */}
        <div className="pt-28 pb-10">
          <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-10 xl:grid-cols-2 xl:gap-14">
            <div className="bg-white rounded-md pt-6 pr-4 pb-14 pl-12 max-w-sm w-full mx-auto relative drop-shadow-2xl md:max-w-screen-sm">
              <Image
                width={60}
                height={60}
                src="/assets/student1@2x.webp"
                alt="profile"
                className="size-6!important xl:size-12 absolute -left-6 top-4"
              />
              <h1 className="text-gray-900 text-xl font-medium ">
                Scott Woodbury-Steward
              </h1>
              <p className="text-gray-800 text-lg mb-3">CEO & Founder</p>
              <p className="text-gray-700">
                Scott has spent more than a decade helping test-takers bust
                through score plateaus and surpass their score goals on
                standardized tests. Scott knows how to break down even the
                toughest concepts for students of any level and is a master of
                time management on test day.
              </p>
            </div>

            <div className="bg-white rounded-md pt-6 pr-4 pb-14 pl-12 max-w-sm w-full mx-auto relative drop-shadow-2xl md:max-w-screen-sm">
              <Image
                width={60}
                height={60}
                src="/assets/student1@2x.webp"
                alt="profile"
                className="size-12 absolute -left-6 top-4"
              />
              <h1 className="text-gray-900 text-xl font-medium ">
                Scott Woodbury-Steward
              </h1>
              <p className="text-gray-800 text-lg mb-3">CEO & Founder</p>
              <p className="text-gray-700">
                Scott has spent more than a decade helping test-takers bust
                through score plateaus and surpass their score goals on
                standardized tests. Scott knows how to break down even the
                toughest concepts for students of any level and is a master of
                time management on test day.
              </p>
            </div>

            <div></div>
          </div>
        </div>
      </section>
      {/* <!-- ! recognized team section  --> */}

      {/* <!-- ! free trial section  --> */}
      <section className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 py-10 rounded-md my-10 bg-gradient-to-l to-emerald-500 from-emerald-600 ">
        <div className="flex flex-col gap-8 md:items-center justify-between md:flex-row  px-10">
          <p className="text-2xl text-gray-50 ">
            Start your full-access trial of the{" "}
            <span className="font-semibold">TTP SAT</span> online course today
            for <span className="font-semibold">FREE</span>
          </p>
          <button className="w-[300px] h-[56px] bg-blue-200 uppercase font-medium transition hover:bg-blue-300 rounded-[4px]">
            start my free trial
          </button>
        </div>
      </section>
      {/* <!-- ! free trial section  --> */}

      {/* <!-- ! preparation plan section  --> */}
      {/* <section className="py-10"> */}
      {/* <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-7 md:grid-cols-2 items-center"> */}
      {/* <!-- left  --> */}
      {/* <div className="">
            <div className="max-w-[450px] md:max-w-full w-full mx-auto  mb-4">
              <h1 className="text-2xl font-semibold mb-1">
                Follow an SAT test preparation plan tailored{" "}
                <span className="text-emerald-800">for you</span>
              </h1>
              <div className="w-10  h-1 bg-emerald-950 rounded-md mb-3"></div>
              <p className="text-gray-700">
                Your personalized study plan takes the guesswork out of SAT
                prep.
              </p>
            </div>
            <ul className="*:flex *:items-center  *:gap-3 max-w-[450px] md:max-w-full w-full mx-auto *:mb-3">
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Always know what to do and when to do it.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Make consistent gains day after day, week after week.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Maximize your study efforts with expert guidance.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>
                  Succeed with an expertly curated study calendar tailored to
                  your specific goals.
                </p>
              </li>
            </ul>
          </div> */}
      {/* <!-- right  --> */}
      {/* <div className="">
            <div className="relative max-w-[450px] mx-auto w-full  sm:max-h-full">
              <img src="../assets/feat-01@3x.webp" alt="" />
              <img
                src="../assets/feat-10@3x.webp"
                alt="desktop"
                className="absolute right-0 top-32 translate-x-52 sm:hidden xl:block"
              />
              <img
                src="../assets/mobile.webp"
                alt="mobile"
                className="w-[40%]  absolute left-[-50px]  top-[100px]"
              />
            </div>
          </div> */}
      {/* </div>
      </section> */}
      {/* <!-- ! preparation plan section  --> */}

      {/* <!-- ! master topic section  --> */}
      {/* <section className="py-16 my-10">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-7 md:grid-cols-2 items-center">
          <div className=" order-2 md:order-first md:-translate-x-52">
            <div className="relative max-w-[70%] w-full md:max-w-full">
              <img src="../assets/feat-30@3x.webp" alt="desktop" />
              <img
                src="../assets/feat-21@3x.webp"
                alt="desktop"
                className="absolute right-[-220px] bottom-[-100px] "
              />
            </div>
          </div>

          <div className="order-1">
            <div className="max-w-[450px] md:max-w-full w-full mx-auto  mb-4">
              <h1 className="text-2xl font-semibold mb-1">
                Master every <span className="text-emerald-800"> SAT Math</span>{" "}
                topic
              </h1>
              <div className="w-10  h-1 bg-emerald-950 rounded-md mb-3"></div>
              <p className="text-gray-700">
                There will be no surprises on test day.
              </p>
            </div>
            <ul className="*:flex *:items-center  *:gap-3 max-w-[450px] md:max-w-full w-full mx-auto *:mb-3">
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>There will be no surprises on test day.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Crystal-clear lessons covering every SAT math concept.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Realistic example questions.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Pro tips, tricks, and expert knowledge.</p>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
      {/* <!-- ! master topic section  --> */}

      {/* <!-- ! analytics section --> */}
      {/* <section className="py-20 bg-emerald-200">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800  text-center">
            Intelligent <span className="text-emerald-600">Analytics</span>
          </h1>

          <div className="w-12 h-1 bg-emerald-900 rounded-md block mx-auto my-1"></div>
        </div>

        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 flex flex-col gap-12">
          <div className="relative full w-[80%] mx-auto order-1">
            <img src="../assets/desktop@3x.webp" alt="desktop" className="" />

            <img
              src="../assets/quant@3x.webp"
              alt=""
              className="absolute -top-6 left-0 -translate-x-14 w-[18rem] xl:max-w-[23rem] xl:w-full"
            />

            <img
              src="../assets/mobile.webp"
              alt=""
              className="w-[5rem] absolute -bottom-12 -left-7 md:max-w-[12rem] md:w-full "
            />

            <img
              src="../assets/verbal@3x.webp"
              alt=""
              className="absolute top-0 -right-36 w-[30rem] hidden md:block "
            />

            <img
              src="../assets/time@3x.webp"
              alt=""
              className="absolute -bottom-8 -right-32 w-[30rem]  hidden md:block"
            />
          </div>

          <div className="order-first sm:-order-first">
            <div className=" mb-8 w-full  mx-auto max-w-[400px] sm:max-w-full">
              <p className="text-gray-700 text-center">
                A detailed view of your progress, performance, strengths, and
                weaknesses.
              </p>
            </div>
            <ul className="*:flex *:items-center  *:gap-3 max-w-[650px]  w-full mx-auto *:mb-3 sm:grid sm:grid-cols-2 gap-8">
              <li>
                <div className="size-2 bg-emerald-700 rounded-full block"></div>
                <p>Clearly see the road ahead in your SAT math test prep.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Understand how you compare with your peers.</p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>
                  Make strategic decisions about where to focus your study
                  efforts.
                </p>
              </li>
              <li>
                <div className="size-2 bg-emerald-700 rounded-full"></div>
                <p>Take impactful steps toward improvement.</p>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
      {/* <!-- ! analytics section --> */}

      {/* <!-- ! instructor section  --> */}
      {/* <section className="py-14">
        <div className="flex gap-20 flex-col  md:flex-row">
          <div className="order-1 md:order-first">
            <div className="max-w-[650px] md:max-w-[800px] relative mx-auto">
              <img
                src="../assets/feat-40@3x.webp"
                alt=""
                className="w-full max-w-full"
              />
              <img
                src="../assets/feat-41@3x.webp"
                alt="desktop"
                className="absolute right-0 -bottom-16 max-w-[500px] md:max-w-[600px] w-full block"
              />
            </div>
          </div>
          <div className="-order-2 px-6 md:px-0">
            <div className="">
              <div className="mb-4 ">
                <h1 className="text-4xl font-semibold w-[28rem]">
                  500+ Instructor-led{" "}
                  <span className="text-emerald-600">SAT Math</span> Videos
                </h1>

                <div className="w-10 h-1 rounded-md bg-emerald-900"></div>
              </div>
              <div className=" mb-4 w-full  mx-auto max-w-[400px] sm:max-w-full">
                <p className="text-gray-700 text-center">
                  A detailed view of your progress, performance, strengths, and
                  weaknesses.
                </p>
              </div>
              <ul className="*:flex *:items-center  *:gap-3 max-w-[650px]  w-full mx-auto *:mb-3 ">
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full block"></div>
                  <p>Clearly see the road ahead in your SAT math test prep.</p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>Understand how you compare with your peers.</p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>
                    Make strategic decisions about where to focus your study
                    efforts.
                  </p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>Take impactful steps toward improvement.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      {/* 
      <section className="py-14">
        <div className="flex gap-20 flex-col md:flex-row-reverse md:items-center">
          <div className="order-1 md:order-first">
            <div className="max-w-[650px] md:max-w-[800px] relative mx-auto">
              <img
                src="../assets/feat-40@3x.webp"
                alt=""
                className="w-full max-w-full"
              />
              <img
                src="../assets/feat-51@3x.webp"
                alt="desktop"
                className="absolute left-0 -bottom-16 max-w-[500px] max-h-[20rem] h-full"
              />
            </div>
          </div>

          <div className="-order-2 px-6 md:px-0">
            <div className=" w-[35rem]  mx-auto">
              <div className="mb-4 ">
                <h1 className="text-4xl font-semibold ">
                  Custom SAT{" "}
                  <span className="text-emerald-600">practice sets</span>{" "}
                </h1>

                <div className="w-10 h-1 rounded-md bg-emerald-900"></div>
              </div>
              <div className=" mb-4 w-full  mx-auto max-w-[400px] sm:max-w-full">
                <p className="text-gray-700 text-center">
                  A detailed view of your progress, performance, strengths, and
                  weaknesses.
                </p>
              </div>
              <ul className="*:flex *:items-center  *:gap-3 max-w-[650px]  w-full mx-auto *:mb-3 ">
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full block"></div>
                  <p>Clearly see the road ahead in your SAT math test prep.</p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>Understand how you compare with your peers.</p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>
                    Make strategic decisions about where to focus your study
                    efforts.
                  </p>
                </li>
                <li>
                  <div className="size-2 bg-emerald-700 rounded-full"></div>
                  <p>Take impactful steps toward improvement.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!-- ! instructor section  --> */}

      {/* <!-- ! pre online section  --> */}
      <section className="">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 bg-gradient-to-l to-[#1D9499] from-[#227D75] py-12 rounded-md overflow-hidden grid md:grid-cols-1 xl:grid-cols-2">
          {/* <!-- left   --> */}
          <div className="md:pl-14 space-y-4 pt-7">
            <h1 className="text-3xl font-semibold text-white">
              Ready to start your SAT prep online with us?
            </h1>
            <div className="w-10  h-1  bg-white"></div>
            <p className="text-gray-100">
              This is the SAT prep course you&apos;ve been searching for, but
              don&apos;t just take our word for it. Try the Target Test Prep SAT
              Course for 5 days and see for yourself why we&apos;re changing the
              way students prepare for the SAT.
            </p>

            <button className="max-w-[300px] w-full block py-3 px-4 font-medium text-emerald-800 bg-emerald-200 rounded-[3px]  transition hover:bg-blue-100">
              TRY TTP SAT PREP FOR FREE
            </button>
          </div>
          {/* <!-- right  -->  */}
          <div className="hidden xl:block relative max-w-[25rem] mx-auto w-full translate-y-10 md:max-w-full">
            <img
              src="../assets/desktop@2x.webp"
              alt=""
              className="max-w-80 w-full absolute bottom-0 right-0"
            />
            <img
              src="../assets/mobile@2x.webp"
              alt=""
              className="absolute bottom-0 -right-0 max-h-[12rem] md:max-h-[10rem] h-full"
            />
          </div>
        </div>
      </section>
      {/* <!-- ! pre online section  --> */}
    </div>
  );
}

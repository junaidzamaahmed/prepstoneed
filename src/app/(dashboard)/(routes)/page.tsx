import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
export default async function HOME() {
  const res = await fetch("https://prepstoneedbd.com/api/get-ip-address", {
    method: "GET",
  });
  console.log(res.json());
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("../assets/banner.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 flex justify-center min-h-screen lg:min-h-[calc(100vh-80px)] flex-col">
          <div className="text-center space-y-10">
            <h1 className="text-3xl text-white font-semibold xl:text-5xl">
              CRUSH YOUR <span className="text-secondary">GOAL</span>
            </h1>
            <p className="text-[18px] md:text-[20px] text-gray-50 max-w-[580px] mx-auto">
              Our online self-study courses put test-takers on the path to rapid
              score improvement
            </p>

            <div className="relative h-max flex items-center justify-center gap-5 sm:gap-8 md:gap-10 xl:gap-24 md:max-w-[80%] mx-auto w-full">
              <hr className="w-20 md:w-[15rem] h-[1px] bg-gray-400" />
              <h3 className="text-gray-100 text-xl font-medium capitalize">
                start learning
              </h3>
              <hr className="w-20 md:w-[15rem] h-[1px] bg-gray-400" />
            </div>
          </div>

          <div className="grid gap-5 xl:gap-1 items-center *:max-w-[14rem] *:w-full *:mx-auto my-8 md:grid-cols-4">
            <Link href="/courses/279057e5-db68-49f2-9e38-44455799d79c">
              <button className="text-gray-50 xl:text-4xl text-lg  uppercase bg-primary py-4 px-6 rounded-[4px] hover:bg-blue-400 transition duration-200 text-center mx-auto w-full">
                DSAT B-04
              </button>
            </Link>
            <Link href="/courses/644b6a1c-5090-4b39-b694-49322ff733d9">
              <button className="text-gray-50 xl:text-4xl text-lg  uppercase bg-primary py-4 px-6 rounded-[4px] hover:bg-blue-400 transition duration-200 text-center mx-auto w-full">
                DSAT B-03
              </button>
            </Link>
            <Link href="/sat/satTests">
              <button className="text-gray-50 xl:text-4xl text-lg  uppercase bg-primary py-4 px-6 rounded-[4px] hover:bg-blue-400 transition duration-200 text-center mx-auto w-full">
                DSAT Mock
              </button>
            </Link>
            {/* <Link href="/comingSoon">
              <button className="text-gray-50 xl:text-4xl text-lg  uppercase bg-primary py-4 px-6 rounded-[4px] hover:bg-blue-400 transition duration-200 text-center mx-auto w-full">
                DU IBA
              </button>
            </Link> */}
            <Link href="/courses/b7a5b443-b31b-4e38-a650-793c0dce5653">
              <button className="text-gray-50 xl:text-4xl text-lg  uppercase bg-primary py-4 px-6 rounded-[4px] hover:bg-blue-400 transition duration-200 text-center mx-auto w-full">
                BUP FBS
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/*{/* <!-- ! hero section  --> */}
      {/*{/* <!-- * sponsors  --> */}
      {/* <div className="py-12 bg-gray-50">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 flex justify-center items-center flex-col gap-10 md:flex-row">
          <h1 className="text-gray-400 font-medium text-xl">As featured in:</h1>

          <Image
            width={100}
            height={100}
            src="/assets/forbes@2x.png"
            alt="sponsor img"
            className="max-w-[30%] w-full md:max-w-[15%]"
          />
          <Image
            width={100}
            height={100}
            src="/assets/businessbecause@2x.png"
            alt="sponsor img"
            className="max-w-[30%] w-full md:max-w-[15%]"
          />
          <Image
            width={100}
            height={100}
            src="/assets/poets-quants@2x.png"
            alt="sponsor img"
            className="max-w-[30%] w-full md:max-w-[15%]"
          />
        </div>
      </div> */}
      {/*{/* <!-- * sponsors  --> */}
      {/*{/* <!-- ! help students section --> */}
      {/* <div className="py-6">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 border-b border-b-green-600 my-10">
          <div className="grid gap-1 grid-cols-4 w-20">
            {Array.from({ length: 12 }, (_, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                className="size-5 opacity-20"
                src="/assets/decor-blue.svg"
                alt=""
              />
            ))}
          </div> */}

      {/* <div className="grid md:grid-cols-2 gap-8"> */}
      {/*{/* <!-- left side  --> */}
      {/* <div>
              <div className="w-[350px] text-[35px] mb-20">
                <h1 className="font-medium">
                  We help students earn top scores
                </h1>
                <span className="w-14 h-1 mt-3 bg-gray-900 block rounded-md"></span>
              </div>

              <div className="md:flex gap-28">
                <div className="space-y-4 text-center">
                  <Image
                    width={100}
                    height={100}
                    src="/assets/gmat_club@2x.png"
                    alt=""
                    className="max-w-24 mx-auto"
                  />
                  <h1 className="md:text-xl font-semibold">#1 Rated Course</h1>
                  <div className="flex items-center gap-1 justify-center">
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <Image
                    width={100}
                    height={100}
                    src="/assets/gmat_club@2x.png"
                    alt=""
                    className="max-w-24 mx-auto"
                  />
                  <h1 className="md:text-xl font-semibold">#1 Rated Course</h1>
                  <div className="flex items-center gap-1 justify-center">
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                    <Image
                      width={100}
                      height={100}
                      className="w-5"
                      src="/assets/star.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div> */}
      {/*{/* <!-- left side  --> */}
      {/*{/* <!-- right side  --> */}
      {/* <div className="flex items-center justify-between"> */}
      {/*{/* <!-- item 1 --> */}
      {/* <div> */}
      {/* <h1 className="md:text-xl text-lg py-1 px-2 bg-blue-400 w-max text-gray-50 rounded-[3px] uppercase">
                  gmat &reg;
                </h1> */}
      {/* <div className="block w-max bg-blue-100 md:py-4 py-2 md:px-10 px-3 rounded-md mb-14 relative"> */}
      {/* <h1 className="md:text-3xl font-semibold text-primary/80">
                    + 180 points
                  </h1>
                  <p className="text-gray-600 ml-2 text-sm md:text-base">
                    Above all test-takers
                  </p> */}

      {/*{/* <!-- triangle  --> */}
      {/* <div className="bg-blue-100 size-5 absolute -bottom-2 md:right-7 right-3 rotate-45"></div> */}
      {/*{/* <!-- triangle  --> */}
      {/* </div> */}

      {/* <div className="relative flex gap-6">
                  <div className="relative">
                    <h1 className="md:text-3xl text-xl font-semibold text-gray-800 flex items-center gap-1">
                      370 <img src="/assets/green-arrow.svg" alt="" />
                    </h1>
                    <p className="text-small md:text-lg text-gray-500 font-medium">
                      Avg. reported score
                    </p>
                    <p className="font-medium">
                      on the
                      <span className="text-blue-400 font-semibold text-lg">
                        GMAT®
                      </span>
                    </p>
                  </div> */}

      {/*{/* <!-- pillar --> */}
      {/* <div className="h-[12rem] w-max bg-blue-100">
                    <div className="w-full h-20 bg-gradient-to-t to-blue-300 from-blue-400 md:p-2 py-2 px-1">
                      <img src="/assets/trophy.svg" alt="" />
                    </div>
                  </div> */}
      {/* </div>
              </div> */}
      {/*{/* <!-- item 1 --> */}

      {/*{/* <!-- item 2 --> */}
      {/* <div>
                <h1 className="md:text-xl text-lg py-1 px-2 bg-green-400 w-max text-gray-50 rounded-[3px] uppercase">
                  gmat &reg;
                </h1>
                <div className="block w-max bg-green-100 md:py-4 py-2 md:px-10 px-3 rounded-md mb-14 relative">
                  <h1 className="md:text-3xl font-semibold text-green-500/80">
                    + 180 points
                  </h1>
                  <p className="text-gray-600 ml-2 text-sm md:text-base">
                    Above all test-takers
                  </p> */}

      {/*{/* <!-- triangle  --> */}
      {/* <div className="bg-green-100 size-5 absolute -bottom-2 left-2 rotate-45"></div> */}
      {/*{/* <!-- triangle  --> */}
      {/* </div> */}

      {/* <div className="relative flex gap-6"> */}
      {/*{/* <!-- pillar --> */}
      {/* <div className="h-[12rem] w-max bg-green-100"> */}
      {/* <div className="w-full h-20 bg-gradient-to-t to-green-300 from-green-400 md:p-2 py-2 px-1"> */}
      {/* <img src="/assets/trophy.svg" alt="" /> */}
      {/* </div> */}
      {/* </div> */}
      {/*{/* <!-- pillar --> */}
      {/* <div className="relative">
                    <h1 className="md:text-3xl text-xl font-semibold text-gray-800 flex items-center gap-1">
                      370 <img src="/assets/green-arrow.svg" alt="" />
                    </h1>
                    <p className="md:text-lg text-gray-500 font-medium text-base">
                      Avg. reported score
                    </p>
                    <p className="font-medium">
                      on the
                      <span className="text-green-400 font-semibold text-lg">
                        GMAT®
                      </span>
                    </p>
                  </div>
                </div>
              </div> */}
      {/*{/* <!-- item 2 --> */}
      {/* </div>
          </div>
        </div>

        <p className="text-gray-500 font-medium text-lg max-w-[1240px] w-full mx-auto px-3 xl:px-0">
          *From TTP users who posted verified reviews on GMAT Club and GRE Prep
          Club
        </p>
      </div> */}
      {/* <!-- ! help students section --> */}
      {/* <!-- ! tools section  --> */}
      {/* <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 py-10 my-10"> */}
      {/* <!-- title  --> */}
      {/* <div className="relative max-w-screen-sm mx-auto xl:max-w-screen-md">
          <h1 className="text-gray-800 text-3xl font-medium text-center">
            Get the tools you really need to conquer your test
          </h1>
          <span className="w-14 h-1 bg-gray-900 mx-auto block my-2 rounded-sm"></span>
        </div> */}

      {/* <!-- card  --> */}
      {/* <div className="my-10 grid xl:grid-cols-3 gap-8 justify-center">
          <div className="text-center max-w-screen-sm">
            <Image
              width={50}
              height={50}
              src="/assets/icon-practice.svg"
              alt=""
              className="size-10 mx-auto"
            />
            <h3 className="text-lg text-gray-700 font-semibold mb-2">
              Comprehensive Content
            </h3>
            <p className="text-gray-600">
              Target Test Prep courses are your one-stop shop for all of the
              content and strategies you need to master your exam, taught with
              unprecedented clarity and detail.
            </p>
          </div>
          <div className="text-center max-w-screen-sm">
            <Image
              width={50}
              height={50}
              src="/assets/icon-practice.svg"
              alt=""
              className="size-10 mx-auto"
            />
            <h3 className="text-lg text-gray-700 font-semibold mb-2">
              Comprehensive Content
            </h3>
            <p className="text-gray-600">
              Target Test Prep courses are your one-stop shop for all of the
              content and strategies you need to master your exam, taught with
              unprecedented clarity and detail.
            </p>
          </div>
          <div className="text-center max-w-screen-sm">
            <Image
              width={50}
              height={50}
              src="/assets/icon-practice.svg"
              alt=""
              className="size-10 mx-auto"
            />
            <h3 className="text-lg text-gray-700 font-semibold mb-2">
              Comprehensive Content
            </h3>
            <p className="text-gray-600">
              Target Test Prep courses are your one-stop shop for all of the
              content and strategies you need to master your exam, taught with
              unprecedented clarity and detail.
            </p>
          </div>
        </div> */}
      {/* <!-- card  --> */}
      {/* </div> */}
      {/* <!-- ! tools section  --> */}
      {/* <!-- ? two column section  --> */}
      {/* <div className="my-8 pb-16">
        <div className="p-12 grid xl:grid-cols-[1fr_2fr] relative">
          <div className="bg-white p-6 rounded-md shadow-2xl border-b-4 border-blue-300 mb-6 h-max xl:ml-32 max-w-[430px] mx-auto w-full">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              <span className="text-primary">Crystal-clear lessons</span> taught
              in a revolutionary way
            </h1>
            <span className="w-12 h-1 bg-blue-950 block mb-6"></span>

            <p>
              Our courses combine time-tested teaching methods with innovative
              learning science, so students can master each concept thoroughly
              and systematically. We understand that students have a lot of
              ground to cover when studying for standardized tests, so our
              lessons are both comprehensive and easy to digest, with ample
              practice and step-by-step video solutions to reinforce learning.
            </p>
          </div>
 */}
      {/* <!-- line  --> */}
      {/* <div className="w-1 h-24 bg-gray-200 absolute left-[12rem] z-20 bottom-[13rem] hidden xl:block"></div>
          <div className="w-20 h-1 bg-gray-200 absolute left-[12rem] z-20 bottom-[13rem] hidden xl:block"></div>
 */}
      {/* <!-- line  --> */}

      {/* <div className="bg-white px-6 py-8 rounded-md shadow-2xl border-b-4 border-blue-300 mb-6 h-max xl:ml-32 xl:max-w-[700px] max-w-[430px] mx-auto w-full xl:absolute xl:left-[12rem] xl:-bottom-4">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              <span className="text-primary">Courses engineered</span> taught in
              a for efficient learning
            </h1>
            <span className="w-12 h-1 bg-blue-950 block mb-6"></span>

            <p>
              Our courses combine time-tested teaching methods with innovative
              learning science, so students can master each concept thoroughly
              and systematically. We understand that students have a lot of
              ground to cover when studying for standardized tests, so our
              lessons are both comprehensive and easy to digest, with ample
              practice and step-by-step video solutions to reinforce learning.
            </p>
          </div>

          <div className="xl:ml-32 max-w-[80vh]">
            <img
              src="/assets/feat-01@3x.webp"
              alt=""
              className="max-w-full h-full"
            />
          </div>
        </div>
      </div> */}
      {/* <!-- ? two column section  --> */}
      {/* <!-- ! teachers and students section  --> */}
      {/* <div className="w-full py-24 bg-[#0E2D42]">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-20 xl:gap-14 xl:grid-cols-2">
          <div className="max-w-screen-sm mx-auto w-full">
            <h1 className="text-4xl font-medium text-white">
              Teachers who know how to get big wins for their students
            </h1>
            <span className="w-14 h-1 bg-white inline-block rounded-md"></span>
          </div>

          <div className="pt-14 px-7 pb-5 bg-[#10334B] rounded-md relative max-w-screen-sm mx-auto w-full">
            <Image
              width={80}
              height={80}
              src="/assets/student1@2x.webp"
              alt="profile image"
              className="absolute -top-9 left-5 size-20"
            />
            <h1 className="text-[1.5rem] text-blue-400 font-medium mb-1">
              Scott Woodbury-Stewart
            </h1>
            <p className="text-white uppercase">FOUNDER & CEO</p>
            <div className="w-4 mb-3 flex items-center gap-1">
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
            </div>
            <p className="text-gray-100">
              An expert in the test prep game, Scott has spent more than a
              decade helping test-takers bust through score plateaus and surpass
              their score goals on standardized tests. With a background in
              teaching math, physics, chemistry, and biology, Scott knows how to
              break down even the toughest concepts for students of any level.
            </p>
          </div>

          <div className="pt-14 px-7 pb-5 bg-[#10334B] rounded-md relative max-w-screen-sm mx-auto w-full">
            <Image
              width={80}
              height={80}
              src="/assets/student2@2x.webp"
              alt="profile image"
              className="absolute -top-9 left-5 size-20"
            />
            <h1 className="text-[1.5rem] text-blue-400 font-medium mb-1">
              Jeff Miller
            </h1>
            <p className="text-white uppercase">
              HEAD OF GMAT/GRE/EA INSTRUCTION
            </p>
            <div className="w-4 mb-3 flex items-center gap-1">
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
              <Image width={50} height={50} src="/assets/blueStar.png" alt="" />
            </div>
            <p className="text-gray-100">
              Jeff has logged more than 10,000 hours of tutoring, helping
              students from around the world earn the test scores they needed to
              gain entry to their top-choice schools. In addition to knowing how
              to think like the test-makers, Jeff is a master performance coach
              who helps his students develop a winning mindset.
            </p>
          </div>
        </div>
      </div> */}
      {/* <!-- ! teachers and students section  --> */}
      {/* <!-- * community section  --> */}
      {/* <div className="w-full py-16">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0">
          <div className="w-full max-w-[450px] mx-auto my-8">
            <h1 className="text-3xl font-semibold text-gray-800 text-center tracking-wide">
              Join the global community of students who prefer to study with
              <span className="font-bold">TTP™</span>
            </h1>
            <span className="w-14 h-1 bg-gray-900 mx-auto block my-2 rounded-md"></span>
          </div>

          <div className="grid gap-16 md:grid-cols-2 md:gap-8"> */}
      {/* <!-- card 1 --> */}
      {/* <div className="bg-white pt-6 px-8 pb-4 flex flex-col justify-between gap-10 max-w-screen-sm w-full mx-auto shadow-2xl relative">
              <div>
                <Image
                  width={50}
                  height={50}
                  src="/assets/quote.svg"
                  alt=""
                  className="size-10 mx-auto mb-4"
                />
                <p className="text-gray-700 text-lg">
                  Amazing course, both Verbal and Quant. 10/10. The entire team
                  was super approachable on chat, with all my random queries or
                  advice requested.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Vedant
                </h3>
                <p className="text-gray-600">Scored 760 on the GMAT®</p>
                <div className="w-4 mb-3 flex items-center gap-1">
                  <Image
                    width={50}
                    height={50}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={50}
                    height={50}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={50}
                    height={50}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={50}
                    height={50}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={50}
                    height={50}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                </div>
              </div> */}

      {/* <!-- author --> */}
      {/* <Image
                width={100}
                height={100}
                src="/assets/vedant@3x.png"
                alt="author"
                className="absolute bottom-0 right-0 w-40"
              /> */}
      {/* <!-- author --> */}
      {/* </div> */}

      {/* <!-- card 2 --> */}
      {/* <div className="bg-white pt-6 px-8 pb-4 flex flex-col justify-between gap-10 max-w-screen-sm w-full mx-auto shadow-2xl relative">
              <div>
                <Image
                  width={50}
                  height={50}
                  src="/assets/quote.svg"
                  alt=""
                  className="size-10 mx-auto mb-4"
                />
                <p className="text-gray-700 text-lg">
                  Amazing course, both Verbal and Quant. 10/10. The entire team
                  was super approachable on chat, with all my random queries or
                  advice requested.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Vedant
                </h3>
                <p className="text-gray-600">Scored 760 on the GMAT®</p>
                <div className="w-4 mb-3 flex items-center gap-1">
                  <Image
                    width={100}
                    height={100}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={100}
                    height={100}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={100}
                    height={100}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={100}
                    height={100}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                  <Image
                    width={100}
                    height={100}
                    src="/assets/blueStar.png"
                    alt=""
                  />
                </div>
              </div> */}

      {/* <!-- author --> */}
      {/* <Image
                width={100}
                height={100}
                src="/assets/emma@3x.png"
                alt="author"
                className="absolute bottom-0 right-0 w-40"
              /> */}
      {/* <!-- author --> */}
      {/* </div>
          </div>
        </div>
      </div> */}
      {/* <!-- * community section  --> */}
      {/* <!-- ! map section --> */}
      {/* <div className="py-20">
        <div className="max-w-[1240px] w-full mx-auto px-3 xl:px-0 grid gap-24 xl:grid-cols-[2fr_1fr]"> */}
      {/* <!-- left  --> */}
      {/* <div
            style={{
              backgroundImage: `url("../assets/map.svg")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            className="p-10 max-w-[820px] w-full min-h-[400px] h-full relative flex flex-col justify-between order-1"
          >
            <div className="flex items-center gap-4 relative -translate-y-20">
              <Image
                width={50}
                height={50}
                src="/assets/student1@2x.jpg"
                alt=""
                className="size-14 rounded-full ring-4 ring-green-400 relative z-10"
              /> */}

      {/* <!-- line  --> */}
      {/* <span className="w-[2px] h-20 bg-green-500 block absolute left-[28px] -bottom-[4rem] -z-10 after:'' after:size-2 after:bg-green-500 after:absolute after:left-[-3px] after:bottom-0 after:rounded-full after:block"></span>
              <div>
                <h3 className="text-green-500 font-medium">Emma (USA)</h3>
                <p>Earned a Q168 / V166 on the GRE®</p>
              </div>
            </div>

            <div className="hidden items-center gap-4 absolute top-30 right-24 md:flex">
              <div>
                <h3 className="text-green-500 font-medium text-right">
                  Emma (USA)
                </h3>
                <p>Earned a Q168 / V166 on the GRE®</p>
              </div>
              <Image
                width={50}
                height={50}
                src="/assets/student1@2x.jpg"
                alt=""
                className=" rounded-full ring-4 ring-green-400 relative z-10"
              /> */}

      {/* <!-- line  --> */}
      {/* <span className="w-[2px] h-20 bg-green-500 block absolute right-[28px] -bottom-[4rem] -z-10 after:'' after:size-2 after:bg-green-500 after:absolute after:left-[-3px] after:bottom-0 after:rounded-full after:block"></span>
            </div>

            <div className="items-center gap-4 ml-auto absolute left-0 bottom-[6rem] hidden md:flex">
              <Image
                width={50}
                height={50}
                src="/assets/student1@2x.jpg"
                alt=""
                className=" rounded-full ring-4 ring-green-400 relative z-10"
              /> */}

      {/* <!-- line  --> */}
      {/* <span className="w-[2px] h-20 bg-green-500 block absolute left-[28px] -top-[4rem] -z-10 after:'' after:size-2 after:bg-green-500 after:absolute after:left-[-3px] after:top-0 after:rounded-full after:block"></span>

              <div className="">
                <h3 className="text-green-500 font-medium">Emma (USA)</h3>
                <p>Earned a Q168 / V166 on the GRE®</p>
              </div>
            </div>

            <div className="flex items-center gap-4 relative ml-auto">
              <div className="text-right">
                <h3 className="text-green-500 font-medium">Emma (USA)</h3>
                <p>Earned a Q168 / V166 on the GRE®</p>
              </div>
              <Image
                width={50}
                height={50}
                src="/assets/student1@2x.jpg"
                alt=""
                className=" rounded-full ring-4 ring-green-400 relative z-10"
              /> */}

      {/* <!-- line  --> */}
      {/* <span className="w-[2px] h-20 bg-green-500 block absolute right-[28px] -top-[4rem] -z-10 after:'' after:size-2 after:bg-green-500 after:absolute after:left-[-3px] after:top-0 after:rounded-full after:block"></span>
            </div>
          </div> */}

      {/* <!-- right  --> */}
      {/* <div className="bg-blue-100/70 p-6 rounded-md max-w-[370px] w-auto mx-auto space-y-16 xl:order-3 relative"> */}
      {/* <!--* border top --> */}
      {/* <div className="w-14 h-1 bg-blue-100 top-[-30px] right-[-25px] absolute"></div>
            <div className="w-1 h-14 bg-blue-100 top-[-94px] right-[-28px] absolute"></div> */}
      {/* <!--* border top --> */}
      {/* <!--* border bottom --> */}
      {/* <div className="w-14 h-1 bg-blue-100 bottom-[-30px] left-[-25px] absolute"></div>
            <div className="w-1 h-14 bg-blue-100 bottom-[-30px] left-[-28px] absolute"></div> */}
      {/* <!--* border bottom --> */}

      {/* <div className="flex items-center gap-6">
              <Image
                width={50}
                height={50}
                src="/assets/user.svg"
                alt=""
                className="size-12"
              />
              <div>
                <p className="text-3xl font-semibold text-blue-400">66,839</p>
                <p className="font-medium text-gray-500 text-lg">STUDENTS</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Image
                width={50}
                height={50}
                src="/assets/globe.svg"
                alt=""
                className="size-12"
              />
              <div>
                <p className="text-3xl font-semibold text-blue-400">839</p>
                <p className="font-medium text-gray-500 text-lg">COUNTRIES</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Image
                width={50}
                height={50}
                src="/assets/file.svg"
                alt=""
                className="size-12"
              />
              <div>
                <p className="text-3xl font-semibold text-blue-400">
                  6,734,4609
                </p>
                <p className="font-medium text-gray-500 text-lg">
                  LESSONS STUDIED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/*{/* <!-- ! map section --> */}
    </div>
  );
}

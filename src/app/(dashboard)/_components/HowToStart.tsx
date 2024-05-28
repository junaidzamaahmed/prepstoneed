import Image from "next/image";

export default function HowToStart() {
  return (
    <div className="bg-muted">
      <div className="container bg-muted py-36">
        <h3 className="font-bold text-3xl text-center">
          How to start at <span className="text-secondary">PrepstoneEd</span>?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/1.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                1
              </span>{" "}
              Create an Account
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/2.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                2
              </span>{" "}
              Choose Your Course
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/3.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                3
              </span>{" "}
              Get Enrolled
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/4.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                4
              </span>{" "}
              Start Your Course
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/5.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                4
              </span>{" "}
              Video Lectures
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/6.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                6
              </span>{" "}
              Quizzes & Assignments
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/7.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                7
              </span>{" "}
              Take The Mocks
            </h4>
          </div>
          <div>
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                className="w-44 h-44"
                src={"/howtostart/8.png"}
                alt="how to start step image"
              />
            </div>
            <h4 className="font-bold text-lg text-center mt-2">
              <span className="bg-secondary px-3 py-1 text-white rounded-full ">
                8
              </span>{" "}
              Get Your Desired Score
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

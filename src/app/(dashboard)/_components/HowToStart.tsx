import Image from "next/image";

const steps = [
  { image: "/howtostart/1.png", title: "Create an Account" },
  { image: "/howtostart/2.png", title: "Choose Your Course" },
  { image: "/howtostart/3.png", title: "Get Enrolled" },
  { image: "/howtostart/4.png", title: "Start Your Course" },
  { image: "/howtostart/5.png", title: "Video Lectures" },
  { image: "/howtostart/6.png", title: "Quizzes & Assignments" },
  { image: "/howtostart/7.png", title: "Take The Mocks" },
  { image: "/howtostart/8.png", title: "Get Your Desired Score" },
];

export default function HowToStart() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How to Start at <span className="text-secondary">PrepstoneEd</span>?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-4">
                <Image
                  width={150}
                  height={150}
                  className="w-36 h-36 object-contain"
                  src={step.image}
                  alt={`Step ${index + 1}`}
                />
                <div className="absolute -top-2 -left-2 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-semibold text-center">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

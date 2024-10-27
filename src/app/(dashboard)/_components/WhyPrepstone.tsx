import { Group, PlayCircle, Users2, VideoIcon } from "lucide-react";
import { FcDocument } from "react-icons/fc";
import { PiHandshake, PiMoney, PiPaperPlane } from "react-icons/pi";
import { VscVmConnect } from "react-icons/vsc";

export default function WhyPrepstone() {
  const features = [
    {
      icon: <PiPaperPlane size={48} />,
      title: "Easy",
      description: "Easy to access our interactive classes",
    },
    {
      icon: <PiHandshake size={48} />,
      title: "1v1",
      description: "1v1 sessions need based",
    },
    {
      icon: <Users2 size={48} />,
      title: "Groups",
      description: "Dedicated Problem solving Telegram Groups",
    },
    {
      icon: <VideoIcon size={48} />,
      title: "Videos",
      description: "High quality recorded videos",
    },
    {
      icon: <PiMoney size={48} />,
      title: "Affordable",
      description: "Affordable Course fees",
    },
    {
      icon: <VscVmConnect size={48} />,
      title: "Interactive",
      description: "Small class size for making classes more interactive",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
          Why Choose Prepstone?
        </h2>
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Prepstone is committed to helping students ace their Academic and
          Admission Tests. Here's what makes us stand out:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

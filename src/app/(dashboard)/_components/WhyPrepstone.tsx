import { Group, PlayCircle, Users2, VideoIcon } from "lucide-react";
import { FcDocument } from "react-icons/fc";
import { PiHandshake, PiMoney, PiPaperPlane } from "react-icons/pi";
import { VscVmConnect } from "react-icons/vsc";

export default function WhyPrepstone() {
  return (
    <div className="my-36 container">
      <h3 className="text-center text-3xl font-semibold text-primary">
        Why should you choose Prepstone ?
      </h3>
      <p className="text-center mx-auto my-5">
        Prepstone is committed to help students to ace their Academic and
        Admission Tests. These things will make you have a better experience-
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PiPaperPlane size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">Easy</p>
          <p className="text-sm">Easy to access our interactive classes</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PiHandshake size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">1v1</p>
          <p className="text-sm">1v1 sessions need based</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <Users2 size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">Groups</p>
          <p className="text-sm">Dedicated Problem solving Telegram Groups</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <VideoIcon size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">Videos</p>
          <p className="text-sm">High quality recorded videos</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PiMoney size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">Affordable</p>
          <p className="text-sm">Affordable Course fees</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <VscVmConnect size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">Interactive</p>
          <p className="text-sm">
            Small class size for making classes more interactive
          </p>
        </div>
      </div>
    </div>
  );
}

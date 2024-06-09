import { PlayCircle } from "lucide-react";

export default function OurELearning() {
  return (
    <div className="my-36 container">
      <h3 className="text-center text-3xl font-semibold text-primary">
        Our E-Learning
      </h3>
      <p className="text-center mx-auto my-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem hic,
        ducimus architecto eos necessitatibus totam fugit soluta cumque labore
        non. Molestiae est facere corrupti iste necessitatibus non esse
        praesentium pariatur, mollitia neque placeat iusto minima rerum repellat
        sapiente quibusdam eaque veritatis distinctio odio unde consectetur id
        atque? Vel, iure distinctio impedit quam nemo voluptates aperiam qui
        ducimus nostrum recusandae autem tempore accusamus enim reiciendis
        aliquid repellendus! Maiores blanditiis aliquid recusandae earum
        accusamus fugiat iusto modi officiis provident maxime, omnis reiciendis
        assumenda ad animi dicta deleniti vel unde eveniet non totam alias
        aliquam! Officia asperiores qui atque sapiente accusantium. Ipsum, fuga.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PlayCircle size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">3000+</p>
          <p className="text-sm">Minutes of Video Lessons</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PlayCircle size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">3000+</p>
          <p className="text-sm">Minutes of Video Lessons</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PlayCircle size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">3000+</p>
          <p className="text-sm">Minutes of Video Lessons</p>
        </div>
        <div className=" bg-blue-900 text-white rounded-xl p-8 text-center">
          <div className="flex justify-center w-full">
            <PlayCircle size={48} />
          </div>
          <p className="my-1 text-2xl font-semibold">3000+</p>
          <p className="text-sm">Minutes of Video Lessons</p>
        </div>
      </div>
    </div>
  );
}

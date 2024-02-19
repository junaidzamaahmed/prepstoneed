import Image from "next/image";

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Coming Soon</h1>
      <p className="mt-4 text-gray-600">
        We&apos;re working on something awesome!
      </p>
      <div className="mt-8">
        <Image
          width={100}
          height={50}
          src="/logo.png"
          alt="Logo"
          className="w-44 h-24"
        />
      </div>
    </div>
  );
};

export default ComingSoonPage;

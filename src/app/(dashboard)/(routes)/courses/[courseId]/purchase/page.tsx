import Image from "next/image";

const PurchasePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[92vh] bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Payment system is yet to be added!
      </h1>
      <p className="mt-4 text-gray-600">Please contact us for course access.</p>
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

export default PurchasePage;

import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 bg-primary text-white">
      <div className="container grid grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <div>
            <Image src={"/logo.png"} alt="logo" width={100} height={100} />
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-2 lg:col-span-1"></div>
      </div>
    </footer>
  );
}

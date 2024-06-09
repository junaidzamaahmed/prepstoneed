import { db } from "@/lib/db";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const cat = await db.category.findMany({
    include: { _count: { select: { courses: true } } },
  });
  return (
    <footer className="py-10 bg-primary/90 text-white">
      <div className="container grid grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1 max-sm:pb-3">
          <div className="flex justify-center">
            <Image src={"/logo.png"} alt="logo" width={100} height={100} />
          </div>
          <p className="text-center font-semibold text-xl my-3">PrepstoneEd</p>
          <div className="flex justify-center space-x-3 mt-2">
            <Link href={"https://facebook.com"} target="_blank">
              <FacebookIcon />
            </Link>
            <Link href={"https://instagram.com"} target="_blank">
              <InstagramIcon />
            </Link>
            <Link href={"https://linkedin.com"} target="_blank">
              <LinkedinIcon />
            </Link>
            <Link href={"mailto:support@prepstoneedbd.com"} target="_blank">
              <MailIcon />
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <p className="text-lg font-medium">Courses</p>
          <ul className="list-none">
            {cat.map((category) =>
              category._count.courses > 0 ? (
                <li
                  key={category.id}
                  className="me-4 py-2 font-medium hover:bg-black/10 ps-2 rounded-sm"
                >
                  <Link href={`/courses/`}>{category.name}</Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="col-span-1">
          <p className="text-lg font-medium">Company</p>
          <ul className="list-none">
            <li className="me-4 py-2 font-medium hover:bg-black/10 ps-2 rounded-sm">
              <Link href={`/about-us/`}>About Us</Link>
            </li>
            <li className="me-4 py-2 font-medium hover:bg-black/10 ps-2 rounded-sm">
              <Link href={`/contact-us/`}>Contact Us</Link>
            </li>
            <li className="me-4 py-2 font-medium hover:bg-black/10 ps-2 rounded-sm">
              <Link href={`/success-story/`}>Success Story</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 max-sm:pt-2">
          <p className="text-lg font-medium">Pay with</p>
          <ul className="list-none flex mt-3">
            <Image
              src={"/assets/bkash.png"}
              alt="bkash logo"
              className="w-10 h-8 rounded-sm me-2"
              width={500}
              height={500}
            />
            <Image
              src={"/assets/nagad.jpg"}
              alt="nagad logo"
              className="w-10 h-8 rounded-sm me-2"
              width={500}
              height={500}
            />
          </ul>
        </div>
      </div>
      <div className="py-2 md:flex justify-between container mt-3 max-sm:text-center max-sm:space-y-2">
        <p className="text-sm font-medium">&copy; 2024 Prepstone</p>
        <div className="space-x-3">
          <Link className="font-medium text-sm" href={"/terms-and-conditions"}>
            Terms and Conditions
          </Link>
          <Link className="font-medium text-sm" href={"/privacy-policy"}>
            Privacy Policy
          </Link>
          <Link className="font-medium text-sm" href={"/refund-policy"}>
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

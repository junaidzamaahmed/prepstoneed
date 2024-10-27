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
import { Separator } from "@/components/ui/separator";

export default async function Footer() {
  const cat = await db.category.findMany({
    include: { _count: { select: { courses: true } } },
  });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo.png"
                alt="PrepstoneEd logo"
                width={100}
                height={100}
              />
            </div>
            <p className="text-xl font-semibold text-center md:text-left">
              PrepstoneEd
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-6 h-6 hover:text-primary-foreground/80 transition-colors" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6 hover:text-primary-foreground/80 transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6 hover:text-primary-foreground/80 transition-colors" />
              </Link>
              <Link href="mailto:support@prepstoneedbd.com" aria-label="Email">
                <MailIcon className="w-6 h-6 hover:text-primary-foreground/80 transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              {cat.map((category) =>
                category._count.courses > 0 ? (
                  <li key={category.id}>
                    <Link
                      href={`/courses`}
                      className="hover:text-primary-foreground/80 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/success-story"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Success Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Pay with</h3>
            <div className="flex space-x-4">
              <Image
                src="/assets/bkash.png"
                alt="bKash logo"
                width={60}
                height={40}
                className="rounded-sm"
              />
              <Image
                src="/assets/nagad.jpg"
                alt="Nagad logo"
                width={60}
                height={40}
                className="rounded-sm"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Prepstone. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
            <Link
              href="/terms-and-conditions"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-primary-foreground/80 transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

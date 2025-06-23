import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const testimonials = await db.testimonial.findMany();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.log("[TESTIMONIALS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  const testimonial = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const newTestimonial = await db.testimonial.create({
      data: {
        ...testimonial,
      },
    });
    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.log("[TESTIMONIALS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

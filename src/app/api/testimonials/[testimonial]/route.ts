import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { testimonial: string } }
) {
  try {
    const { userId } = auth();
    const { testimonial } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const deletedTestimonial = await db.testimonial.delete({
      where: {
        id: testimonial,
      },
    });
    return NextResponse.json({
      message: "Testimonial deleted successfully",
      testimonial: deletedTestimonial,
    });
  } catch (error) {
    console.log("[TESTIMONIAL_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { testimonial: string } }
) {
  try {
    const { userId } = auth();
    const { testimonial } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const updatedTestimonial = await db.testimonial.update({
      where: {
        id: testimonial,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

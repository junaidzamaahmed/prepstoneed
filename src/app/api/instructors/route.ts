import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, bio, imageUrl } = await req.json();
    const instructor = await db.instructor.create({
      data: {
        name,
        email,
        bio,
        imageUrl,
      },
    });
    return NextResponse.json(instructor);
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const instructors = await db.instructor.findMany();
    return NextResponse.json(instructors);
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { instructorId } = await req.json();
    const instructor = await db.instructor.delete({
      where: {
        id: instructorId,
      },
    });
    return NextResponse.json(instructor);
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...values } = await req.json();
    const instructor = await db.instructor.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(instructor);
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

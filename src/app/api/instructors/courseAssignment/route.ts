import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const instructor = await db.instructorInstructs.create({
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
export async function DELETE(req: Request) {
  try {
    const header = req.headers;
    const instructor = await db.instructorInstructs.delete({
      where: {
        instructorId_courseId: {
          courseId: header.get("courseId") as string,
          instructorId: header.get("instructorId") as string,
        },
      },
    });
    return NextResponse.json(instructor);
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

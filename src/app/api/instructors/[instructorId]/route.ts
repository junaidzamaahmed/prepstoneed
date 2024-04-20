import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { instructorId: string } }) {
  try {
    // const instructors = await db.instructor.findUnique({
    //   where: {
    //     id: params.instructorId,
    //   },
    // });
    return NextResponse.json({
      name: "John Doe",
      bio: "Instructor Bio",
      imageUrl: "https://via.placeholder.com/150",
    });
  } catch (error) {
    console.log("[INSTRUCTORS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

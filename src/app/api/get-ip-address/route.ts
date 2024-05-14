import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let forwardedFor = headers().get("x-forwarded-for");
  let realIp = headers().get("x-real-ip");
  console.log(forwardedFor, "\n", realIp);

  //   const data = {
  //     ok: true,
  //     ip: req.ip ? req.ip : "127.0.0.1",
  //     message: "Hello from the API",
  //   };
  //   console.log(data);
  return new NextResponse(
    forwardedFor ? forwardedFor.split(",")[0].trim() : realIp && realIp.trim()
  );
}

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = {
    ok: true,
    ip: req.headers.get("x-real-ip") ?? "127.0.0.1",
    message: "Hello from the API",
  };
  console.log(data);
  return new NextResponse("OK", { status: 200 });
}

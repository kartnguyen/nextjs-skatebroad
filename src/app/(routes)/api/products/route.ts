import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(process.env.PATH_URL_BACKEND + "/skates", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return NextResponse.json({ result });
}

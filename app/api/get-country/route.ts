import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://geolocation-db.com/json/");
    const data = await res.json();

    return NextResponse.json({ country: data.country_name });
  } catch (error) {
    console.error("Error fetching country:", error);
    return NextResponse.json(
      { error: "Failed to detect country" },
      { status: 500 }
    );
  }
}

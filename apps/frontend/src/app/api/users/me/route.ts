import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

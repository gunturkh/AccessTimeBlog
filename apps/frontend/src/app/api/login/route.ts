import { UserAccessResponse } from "@/types/user";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();

    const response = await fetch(process.env.BACKEND_URL + "/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    return Response.json(result as UserAccessResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

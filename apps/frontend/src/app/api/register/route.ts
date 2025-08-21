import { UserRegister, UserAccessResponse } from "@/types/user";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user: UserRegister = await request.json();

    const response = await fetch(
      process.env.BACKEND_URL + "/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      }
    );

    const result = await response.json();

    return Response.json(result as UserAccessResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

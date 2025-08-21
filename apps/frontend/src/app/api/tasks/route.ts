import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { TaskResponse } from "@/types/task";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") ?? 1;
    const limit = request.nextUrl.searchParams.get("limit") ?? 25;

    const headersList = await headers();
    const token = headersList.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.decode(token) as {
      id: string;
      exp: number;
      iat: number;
    };
    const userId = decoded.id;

    if (decoded.exp < Date.now() / 1000) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = `${process.env.BACKEND_URL}/tasks`;
    const searchParams = new URLSearchParams();

    searchParams.append("filters[user][id][$eq]", userId);

    searchParams.append("pagination[page]", page.toString());
    searchParams.append("pagination[pageSize]", limit.toString());

    searchParams.append("populate", "*");

    searchParams.append("sort", "createdAt:desc");

    const result = await fetch(`${baseUrl}?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = (await result.json()) as TaskResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.decode(token) as {
      id: string;
      exp: number;
      iat: number;
    };
    const userId = decoded.id;

    if (decoded.exp < Date.now() / 1000) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(process.env.BACKEND_URL + "/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...body,
          user: { id: userId },
        },
      }),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

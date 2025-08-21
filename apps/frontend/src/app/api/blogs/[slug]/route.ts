import { BlogBySlugResponse } from "@/types/blog";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const slug = req.nextUrl.pathname.split("/").at(-1);
    const searchParams = new URLSearchParams();
    const baseUrl = `${process.env.BACKEND_URL}/blogs`;
    searchParams.append("filters[slug]", slug?.toString() ?? "");
    searchParams.append("populate", '*');

    const result = await fetch(`${baseUrl}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = (await result.json()) as BlogBySlugResponse;
    return NextResponse.json(data);
};

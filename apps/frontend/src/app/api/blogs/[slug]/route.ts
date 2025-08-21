import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.pathname.split("/").at(-1);
  const response = await fetch(process.env.BACKEND_URL + "/blogs/" + slug, {
    method: "GET",
  });
  if (!response)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  return NextResponse.json(response);
};

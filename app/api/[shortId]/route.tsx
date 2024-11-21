import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const shortId = request.nextUrl.pathname.split("/").pop();

  const redirectURL = await prisma.url.findFirst({
    where: {
      shorturl: String(shortId),
    },
  });

  if (redirectURL) {
    await prisma.url.update({
      where: {
        id: redirectURL.id,
      },
      data: {
        visitCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.redirect(new URL(redirectURL.redirecturl));
  }

  return NextResponse.json({ message: "No link found" });
}

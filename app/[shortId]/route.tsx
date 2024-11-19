import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  const { shortId } = await params;
  const redirectURL = await prisma.url.findFirst({
    where: {
      shorturl: shortId,
    },
  });

  if (redirectURL) {
    const updateUser = await prisma.url.update({
      where: {
        id: redirectURL.id,
      },
      data: {
        visitCount: {
          increment: 1,
        },
      },
    });
    console.log(redirectURL.redirecturl);
    return NextResponse.redirect(new URL(redirectURL.redirecturl));
  }
  return NextResponse.json({ message: "Got you" });
}

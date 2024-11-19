import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  var url = formData.get("url") as string;

  if (!url.includes("https://")) {
    url = "https://" + url;
  }
  if (!url.includes("www.") && !url.includes("https://")) {
    url = "www." + url;
  }
  if (!url.includes(".com")) {
    url = url + ".com";
  }

  const uniqueString = nanoid(5);
  await prisma.url.create({
    data: {
      shorturl: uniqueString,
      redirecturl: url,
    },
  });
  console.log(uniqueString);
  return NextResponse.json({ data: uniqueString });
}

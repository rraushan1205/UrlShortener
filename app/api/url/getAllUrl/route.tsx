import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const Urls = await prisma.url.findMany({});
  return NextResponse.json({ message: "Done", data: Urls });
}

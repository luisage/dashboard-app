import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'asc' },
    include: { user: { select: { name: true, role: true } } }
  })
  return NextResponse.json(comments)
}
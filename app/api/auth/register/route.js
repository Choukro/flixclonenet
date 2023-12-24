import { NextResponse } from "next/server";
import prisma from "../../../../_lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse("champs requis", { status: 400 });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    throw new Error("email déjà utilisé");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}

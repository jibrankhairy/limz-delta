// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import prisma dari file inisialisasi (ganti connectDB)
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // await connectDB() sudah tidak diperlukan lagi

  const { email, password } = await req.json();

  try {
    // Ganti query Mongoose dengan Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // `user.id` sekarang adalah integer, bukan `_id`
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

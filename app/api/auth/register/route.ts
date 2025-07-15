// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db"; // tanpa kurung kurawal, karena export default
import User from "@/models/User"; // juga harus export default dari User.ts
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectDB();

  const { fullName, email, password } = await req.json();

  try {
    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Pendaftaran berhasil" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

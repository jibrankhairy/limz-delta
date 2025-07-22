import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { formData, rincian } = body;

    const fpps = new Fpps({ ...formData, rincian });
    await fpps.save();

    return NextResponse.json(
      { message: "FPPS berhasil disimpan" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("FPPS Save Error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: `Nomor FPPS '${error.keyValue.nomorFpps}' sudah ada.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Gagal menyimpan FPPS", error: error.message },
      { status: 500 }
    );
  }
}

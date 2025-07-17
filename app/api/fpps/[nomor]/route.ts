export const dynamicParams = true;

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomor: string } }
) {
  await connectDB();

  try {
    const nomor = params.nomor;

    const data = await Fpps.findOne({ nomorFpps: nomor });

    if (!data) {
      return NextResponse.json(
        { message: `FPPS ${nomor} tidak ditemukan` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        formData: {
          nomorFpps: data.nomorFpps,
          namaPelanggan: data.namaPelanggan,
          alamatPelanggan: data.alamatPelanggan,
          noTelp: data.noTelp,
        },
        rincian: data.rincian,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch FPPS Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data FPPS", error },
      { status: 500 }
    );
  }
}

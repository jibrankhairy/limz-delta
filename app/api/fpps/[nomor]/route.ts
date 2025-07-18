export const dynamicParams = true;

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const nomor = url.pathname.split("/").pop(); // ambil terakhir dari path

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
          tanggalMasuk: data.tanggalMasuk,
          petugas: data.petugas,
          emailPpic: data.emailPpic,
          namaPpic: data.namaPpic,
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

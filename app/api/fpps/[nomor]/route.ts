import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomor: string } }
) {
  await connectDB();
  try {
    const { nomor } = params;
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
          nomorQuotation: data.nomorQuotation,
          kegiatan: data.kegiatan,
        },
        rincian: data.rincian,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch FPPS Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data FPPS" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { nomor: string } }
) {
  const { nomor } = params;

  try {
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json(
        { message: "Status baru harus disertakan" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedFpps = await Fpps.findOneAndUpdate(
      { nomorFpps: nomor },
      { status: status },
      { new: true }
    );

    if (!updatedFpps) {
      return NextResponse.json(
        { message: `FPPS dengan nomor ${nomor} tidak ditemukan` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Status FPPS berhasil diperbarui",
      data: updatedFpps,
    });
  } catch (error) {
    console.error(`API FPPS Status Update Error (nomor: ${nomor}):`, error);
    return NextResponse.json(
      { message: "Gagal mengupdate status FPPS" },
      { status: 500 }
    );
  }
}

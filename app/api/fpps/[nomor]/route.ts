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
    await connectDB();
    const body = await request.json();

    if (body.formData && body.rincian) {
      const { formData, rincian } = body;
      const updatedFpps = await Fpps.findOneAndUpdate(
        { nomorFpps: nomor },
        { ...formData, rincian },
        { new: true, runValidators: true }
      );

      if (!updatedFpps) {
        return NextResponse.json(
          { message: `Data dengan nomor ${nomor} tidak ditemukan` },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Data FPPS berhasil diperbarui", data: updatedFpps },
        { status: 200 }
      );
    } else if (body.status) {
      const { status } = body;
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
      return NextResponse.json(
        { message: "Status FPPS berhasil diperbarui", data: updatedFpps },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Payload request tidak valid" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(`API FPPS Update Error (nomor: ${nomor}):`, error);
    return NextResponse.json(
      { message: "Gagal memperbarui data", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { nomor: string } }
) {
  const idToDelete = params.nomor;

  try {
    await connectDB();

    const deletedFpps = await Fpps.findByIdAndDelete(idToDelete);

    if (!deletedFpps) {
      return NextResponse.json(
        { message: `Data dengan ID ${idToDelete} tidak ditemukan` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "FPPS berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete FPPS Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data FPPS" },
      { status: 500 }
    );
  }
}

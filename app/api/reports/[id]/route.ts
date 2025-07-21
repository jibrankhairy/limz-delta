import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Report from "@/models/Report";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDatabase();
    const report = await Report.findById(id);

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json();
    await connectToDatabase();
    const updatedReport = await Report.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedReport) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengupdate laporan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDatabase();
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Laporan berhasil dihapus.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus laporan" },
      { status: 500 }
    );
  }
}

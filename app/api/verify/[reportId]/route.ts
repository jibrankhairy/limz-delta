import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  const { reportId } = params;

  try {
    const report = await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan di database." },
        { status: 404 }
      );
    }

    const coverData = report.coverData as any;
    const verificationData = {
      certificateNo: coverData?.certificateNo || "-",
      customer: coverData?.customer || "-",
      reportDate: coverData?.reportDate || "-",
      nomorFpps: coverData?.nomorFpps || "-",
    };

    return NextResponse.json({ success: true, data: verificationData });
  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "ID laporan tidak valid atau terjadi kesalahan server.",
      },
      { status: 500 }
    );
  }
}

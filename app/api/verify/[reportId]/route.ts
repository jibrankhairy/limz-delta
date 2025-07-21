import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Report from '@/models/Report';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectToDatabase();
    
    // Cari laporan di database berdasarkan ID dari URL
    const report = await Report.findById(id);

    // Jika laporan tidak ditemukan, kirim error 404
    if (!report) {
      return NextResponse.json({ success: false, error: "Laporan tidak ditemukan di database." }, { status: 404 });
    }

    // Jika ditemukan, siapkan data yang akan ditampilkan di halaman verifikasi
    const verificationData = {
      certificateNo: report.coverData?.certificateNo || '-',
      customer: report.coverData?.customer || '-',
      reportDate: report.coverData?.reportDate || '-',
      nomorFpps: report.coverData?.nomorFpps || '-',
    };
    
    // Kirim data kembali ke halaman frontend
    return NextResponse.json({ success: true, data: verificationData });

  } catch (error) {
    console.error("Verification API Error:", error);
    // Tangani error jika ID tidak valid atau ada masalah server
    return NextResponse.json({ success: false, error: 'ID laporan tidak valid atau terjadi kesalahan server.' }, { status: 500 });
  }
}
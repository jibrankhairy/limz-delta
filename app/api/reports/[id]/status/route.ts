import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Report from '@/models/Report';
import Fpps from '@/models/Fpps'; // Kita butuh model Fpps di sini

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ success: false, error: 'Status baru harus disertakan' }, { status: 400 });
    }

    await connectToDatabase();

    // 1. Update status di model Report
    const updatedReport = await Report.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!updatedReport) {
      return NextResponse.json({ success: false, error: 'Laporan tidak ditemukan' }, { status: 404 });
    }
    
    // 2. Update status di model Fpps agar dashboard ikut berubah
    // Kita asumsikan ada hubungan melalui nomorFpps
    if (updatedReport.coverData?.nomorFpps) {
      await Fpps.findOneAndUpdate(
        { nomorFpps: updatedReport.coverData.nomorFpps },
        { status: status }, // Status di Fpps juga di-update
        { new: true }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedReport });

  } catch (error) {
    console.error(`API Status Update Error (id: ${id}):`, error);
    return NextResponse.json({ success: false, error: 'Gagal mengupdate status' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Report from '@/models/Report';

// FUNGSI UNTUK MENGAMBIL SEMUA LAPORAN
export async function GET() {
  try {
    await connectToDatabase();
    const reports = await Report.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil data laporan' }, { status: 500 });
  }
}

// FUNGSI UNTUK MEMBUAT LAPORAN BARU
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Gunakan new Report() untuk membuat instance baru berdasarkan skema
    const newReport = new Report(body);
    const savedReport = await newReport.save();
    
    return NextResponse.json({ success: true, data: savedReport }, { status: 201 }); // 201 = Created
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, error: 'Gagal menyimpan laporan baru' }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Report from "@/models/Report";

export async function GET() {
  try {
    await connectToDatabase();
    const reports = await Report.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data laporan" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const newReport = new Report(body);
    const savedReport = await newReport.save();

    return NextResponse.json(
      { success: true, data: savedReport },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan laporan baru" },
      { status: 500 }
    );
  }
}

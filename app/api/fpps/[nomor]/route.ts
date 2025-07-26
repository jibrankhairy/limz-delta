import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomor: string } }
) {
  const { nomor } = params;
  try {
    const data = await prisma.fpps.findUnique({
      where: { nomorFpps: nomor },
      include: { rincian: true },
    });

    if (!data) {
      return NextResponse.json(
        { message: `FPPS ${nomor} tidak ditemukan` },
        { status: 404 }
      );
    }

    const { rincian, ...formData } = data;
    return NextResponse.json(
      {
        formData: formData,
        rincian: rincian.map((r) => ({ ...r, id: r.idRincian })),
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
    const body = await request.json();

    if (body.formData && body.rincian) {
      const { formData, rincian } = body;
      const updatedFpps = await prisma.fpps.update({
        where: { nomorFpps: nomor },
        data: {
          ...formData,
          rincian: {
            deleteMany: {},
            create: rincian.map((item: any) => ({
              idRincian: item.id,
              area: item.area,
              matriks: item.matriks,
              parameter: item.parameter,
              regulasi: item.regulasi,
              metode: item.metode,
            })),
          },
        },
      });
      return NextResponse.json(
        { message: "Data FPPS berhasil diperbarui", data: updatedFpps },
        { status: 200 }
      );
    } else if (body.status) {
      const { status } = body;
      const updatedFpps = await prisma.fpps.update({
        where: { nomorFpps: nomor },
        data: { status },
      });
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
  const nomorToDelete = params.nomor;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const fpps = await tx.fpps.findUnique({
        where: { nomorFpps: nomorToDelete },
        select: { id: true },
      });

      if (!fpps) {
        throw new Error(`FPPS dengan nomor ${nomorToDelete} tidak ditemukan.`);
      }

      await tx.rincian.deleteMany({
        where: { fppsId: fpps.id },
      });

      await tx.fpps.delete({
        where: { nomorFpps: nomorToDelete },
      });
    });

    return NextResponse.json(
      { message: "FPPS dan semua rincian terkait berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete FPPS Error:", error);
    const errorMessage = error.message || "Gagal menghapus data FPPS";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

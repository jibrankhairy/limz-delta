import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";
import { DataTable } from "./components/DataTable";
import { SectionCards } from "./components/SectionCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function DashboardPage() {
  await connectDB();

  type FppsDoc = {
    _id: any;
    nomorFpps: string;
    namaPelanggan: string;
    namaPpic: string;
    emailPpic: string;
    noTelp: string;
    status?: string;
  };

  const allData = (await Fpps.find().lean()) as unknown as FppsDoc[];

  const totalClients = new Set(allData.map((item) => item.namaPelanggan)).size;

  const onProgressCount = allData.filter(
    (item) => item.status?.toLowerCase() !== "selesai"
  ).length;

  const finalCoaCount = allData.filter(
    (item) => item.status?.toLowerCase() === "selesai"
  ).length;

  const dataForTable = allData.map((item) => ({
    id: item._id.toString(),
    nomorFpps: item.nomorFpps,
    header: item.namaPelanggan,
    ppic: item.namaPpic,
    email: item.emailPpic,
    limit: item.noTelp,
    status: item.status || "Pendaftaran",
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Tabel Pelanggan</h1>
      </div>

      <SectionCards
        totalClients={totalClients}
        onProgress={onProgressCount}
        finalCoa={finalCoaCount}
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Lihat semua pelanggan yang sedang berjalan dan yang telah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={dataForTable} />
        </CardContent>
      </Card>
    </main>
  );
}

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
    namaPelanggan: string;
    namaPpic: string;
    emailPpic: string;
    noTelp: string;
    status?: string;
    target?: string;
    reviewer?: string;
  };

  const allData = (await Fpps.find().lean()) as unknown as FppsDoc[];
  
  const totalClients = new Set(allData.map((item) => item.namaPelanggan)).size;
  const onProgressCount = allData.filter(
    (item) => !item.status || item.status.toLowerCase() === "process"
  ).length;
  const finalCoaCount = allData.filter(
    (item) =>
      item.status && (item.status.toLowerCase() === "completed" || item.status.toLowerCase() === "done")
  ).length;

  const dataForTable = allData.map((item) => ({
    id: item._id.toString(),
    header: item.namaPelanggan,
    ppic: item.namaPpic,
    email: item.emailPpic,
    limit: item.noTelp,
    status: item.status || "Process",
    target: item.target || "",
    reviewer: item.reviewer || "",
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {/* 1. Header Halaman yang Jelas */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      {/* 2. Kartu Statistik */}
      <SectionCards
        totalClients={totalClients}
        onProgress={onProgressCount}
        finalCoa={finalCoaCount}
      />

      {/* 3. Tabel Data Dibungkus Dalam Card */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proyek Terbaru</CardTitle>
          <CardDescription>
            Lihat semua proyek yang sedang berjalan dan yang telah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={dataForTable} />
        </CardContent>
      </Card>
    </main>
  );
}
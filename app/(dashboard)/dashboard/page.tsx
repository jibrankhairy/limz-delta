import connectDB from "@/lib/db";
import Fpps from "@/models/Fpps";
import { DataTable } from "./components/DataTable";
import { SectionCards } from "./components/SectionCards";

export default async function DashboardPage() {
  await connectDB();

  // Tipe data FPPS dari MongoDB
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

  const data = allData.map((item) => ({
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
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

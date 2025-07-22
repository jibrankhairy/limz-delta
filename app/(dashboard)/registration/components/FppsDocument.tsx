import React from "react";

interface RincianUji {
  id: string;
  area: string;
  matriks: string;
  parameter: string;
  regulasi: string;
  metode: string;
}

interface FppsDocumentProps {
  data: {
    nomorFpps: string;
    nomorQuotation: string;
    petugas: string;
    namaPelanggan: string;
    alamatPelanggan: string;
    noTelp: string;
    tanggalMasuk: string;
    kegiatan: string;
    rincian: RincianUji[];
  };
}

export const FppsDocument = React.forwardRef<HTMLDivElement, FppsDocumentProps>(
  ({ data }, ref) => {
    const formatTanggalIndo = (tanggalISO: string) => {
      if (!tanggalISO) return "";
      const date = new Date(tanggalISO);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    return (
      <div
        ref={ref}
        className="bg-white p-8 text-black text-xs font-[Times_New_Roman]"
      >
        <div className="text-center mb-6">
          <h1 className="text-sm font-bold uppercase">
            Permintaan Contoh Uji dan Atau Kaji Ulang Permintaan Pengujian
          </h1>
        </div>

        <h2 className="font-bold mb-2">I. PERMINTAAN PENGUJIAN</h2>
        <div className="border border-black p-2 mb-4">
          <h3 className="font-bold mb-2">FORM CONTOH UJI</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p>1) Nama Pelanggan: {data.namaPelanggan}</p>
              <p>2) Alamat Pelanggan: {data.alamatPelanggan}</p>
              <p>3) No. Telp/HP: {data.noTelp}</p>
              <p>
                4) Tanggal Masuk Contoh Uji:{" "}
                {formatTanggalIndo(data.tanggalMasuk)}
              </p>

              <p>5) Kegiatan/Paket Pekerjaan: {data.kegiatan}</p>
            </div>
            <div>
              <p>Nomor FPPS: {data.nomorFpps}</p>
              <p>Nomor Quotation: {data.nomorQuotation}</p>
              <div className="flex items-start">
                <span className="whitespace-nowrap mr-2">Petugas:</span>
                <div className="flex flex-col">
                  {Array.isArray(data.petugas) &&
                    data.petugas.map((nama, i) => (
                      <span key={i}>
                        {i + 1}. {nama}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-bold mb-2">II. Rincian Pengujian</h2>
        <div className="border border-black">
          <div className="flex font-bold bg-gray-200 border-b border-black">
            <div className="w-8 p-1 border-r border-black text-center">No.</div>
            <div className="w-28 p-1 border-r border-black text-center">
              Stamp ID
            </div>
            <div className="flex-1 p-1 border-r border-black text-center">
              Area
            </div>
            <div className="w-16 p-1 border-r border-black text-center">
              Matriks
            </div>
            <div className="w-64 p-1 border-r border-black text-center">
              Parameter
            </div>
            <div className="flex-1 p-1 border-r border-black text-center">
              Regulasi
            </div>
            <div className="w-24 p-1 text-center">Metode</div>
          </div>

          {/* Rows */}
          {data.rincian.map((item, index) => (
            <div
              key={item.id}
              className="flex border-b border-black last:border-b-0"
            >
              <div className="w-8 p-1 border-r border-black text-center">
                {index + 1}
              </div>
              <div className="w-28 p-1 border-r border-black">{item.id}</div>
              <div className="flex-1 p-1 border-r border-black">
                {item.area}
              </div>
              <div className="w-16 p-1 border-r border-black text-center">
                {item.matriks}
              </div>
              <div className="w-64 p-1 border-r border-black whitespace-pre-wrap">
                {item.parameter}
              </div>
              <div className="flex-1 p-1 border-r border-black whitespace-pre-wrap">
                {item.regulasi}
              </div>
              <div className="w-24 p-1 text-center">{item.metode}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

FppsDocument.displayName = "FppsDocument";

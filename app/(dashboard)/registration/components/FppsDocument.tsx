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
    petugas: string[];
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
    const alamatArray = data.alamatPelanggan.split("Cikarang Barat");
    const alamatL1 = alamatArray[0] ? `${alamatArray[0]}Cikarang Barat` : "";
    const alamatL2 = alamatArray[1]
      ? alamatArray[1].replace(",", "").trim()
      : "";

    return (
      <div
        ref={ref}
        className="bg-white p-8 text-black text-xs font-[Times_New_Roman]"
      >
        <div className="flex justify-between items-start">
          <img
            src="/images/logo-delta-big.png"
            alt="Logo Delta Indonesia Laboratory"
            className="h-20 w-auto"
          />
          <div className="text-right text-[10px]">
            <p className="font-bold text-xl">PT. Delta Indonesia Laboratory</p>
            <p>Jl. Perum Prima Harapan Regency</p>
            <p>Gedung Prima Orchard Block C, No. 2</p>
            <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
            <p>Telp: 021 – 88382018</p>
          </div>
        </div>
        <hr className="border-t-2 border-black" />
        <div className="text-center mb-4">
          <h1 className="text-sm font-bold underline uppercase">
            PERMINTAAN PENGUJIAN
          </h1>
          <h1 className="text-sm font-bold underline">
            Penerimaan Contoh Uji dan Atau Kaji Ulang Permintaan Pengujian
          </h1>
        </div>

        <div>
          <div className="font-bold">I. PERMINTAAN PENGUJIAN</div>
          <div className="border border-black">
            <div className="p-1 font-bold border-b border-black">
              KODE CONTOH UJI
            </div>
            <div className="flex">
              <div className="w-[65%]">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-1 w-8 font-bold">1)</td>
                      <td className="p-1 w-48 font-bold">Nama Pelanggan</td>
                      <td className="p-1 w-4">:</td>
                      <td className="p-1">{data.namaPelanggan}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 align-top font-bold">2)</td>
                      <td className="p-1 align-top font-bold">
                        Alamat Pelanggan
                      </td>
                      <td className="p-1 align-top">:</td>
                      <td className="p-1">
                        <div>{alamatL1}</div>
                        <div>{alamatL2}</div>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1"></td>
                      <td className="p-1 font-bold">No. Telp/HP.</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.noTelp}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 font-bold">3)</td>
                      <td className="p-1 font-bold">
                        Tanggal Masuk Contoh Uji
                      </td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.tanggalMasuk}</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">4)</td>
                      <td className="p-1 font-bold">
                        Kegiatan/Paket Pekerjaan
                      </td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.kegiatan}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-[35%] border-l border-black">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-1 w-32 font-bold">Nomor FPPS</td>
                      <td className="p-1 w-4">:</td>
                      <td className="p-1 font-bold">{data.nomorFpps}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 font-bold">Nomor Quotation</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.nomorQuotation}</td>
                    </tr>
                    <tr>
                      <td className="p-1 align-top font-bold">Petugas</td>
                      <td className="p-1 align-top">:</td>
                      <td className="p-1">
                        <div className="grid grid-cols-2">
                          <div>
                            {data.petugas.slice(0, 3).map((nama, i) => (
                              <div key={i}>{`${i + 1} ${nama}`}</div>
                            ))}
                          </div>
                          <div>
                            {data.petugas.slice(3).map((nama, i) => (
                              <div key={i}>{`${i + 4} ${nama}`}</div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <table className="w-full border-collapse border border-black text-xs">
            <thead className="font-bold bg-gray-100">
              <tr>
                <th
                  className="border-r border-b border-black p-1 text-left"
                  colSpan={1}
                >
                  5)
                </th>
                <th className="text-left p-1">Rincian Pengujian</th>
              </tr>
              <tr>
                <th className="border border-black p-1 w-[1%]">No.</th>
                <th className="border border-black p-1 w-[10%]">Sample ID</th>
                <th className="border border-black p-1 w-[15%]">Area</th>
                <th className="border border-black p-1 w-[10%]">Matriks</th>
                <th className="border border-black p-1 w-[25%]">Parameter</th>
                <th className="border border-black p-1">Regulasi</th>
                <th className="border border-black p-1 w-[15%]">Metode</th>
              </tr>
            </thead>
            <tbody>
              {data.rincian.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-black p-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black p-1">{item.id}</td>
                  <td className="border border-black p-1">{item.area}</td>
                  <td className="border border-black p-1 text-center">
                    {item.matriks}
                  </td>
                  <td className="border border-black p-1 whitespace-pre-wrap">
                    {item.parameter}
                  </td>
                  <td className="border border-black p-1 whitespace-pre-wrap">
                    {item.regulasi}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {item.metode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 text-[9px]">
          <p>FB-7.1.1</p>
        </div>
      </div>
    );
  }
);

FppsDocument.displayName = "FppsDocument";

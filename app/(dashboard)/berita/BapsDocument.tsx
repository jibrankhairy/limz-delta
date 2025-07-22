"use client";

import React from "react";
import { Logo } from "@/components/logo";
import Image from "next/image";

interface BapsDocumentProps {
  data: {
    nomorFpps: string;
    perusahaan: string;
    alamat: string;
    noTelp: string;
    hariTanggal: string;
    titikPengujian: {
      udaraAmbien: string;
      emisiCerobong: string;
      pencahayaan: string;
      heatStress: string;
      udaraRuangKerja: string;
      kebauan: string;
      kebisingan: string;
      airLimbah: string;
    };
    rincianUji: Array<{
      id: string;
      lokasi: string;
      parameter: string;
      regulasi: string;
      jenisSampel: string;
      waktuPengambilan: string;
    }>;
    penandaTangan: {
      pihakLab: string;
      signatureUrlLab: string;
      pihakPerusahaan: string;
      signatureUrlPerusahaan: string;
    };
  };
}

export const BapsDocument = React.forwardRef<HTMLDivElement, BapsDocumentProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="p-10 font-[Times_New_Roman] text-xs text-black bg-white relative"
      >
        <div className="absolute inset-30 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-[200px] h-[200px] opacity-30">
            <Image
              src="/images/logo-delta-transparan.png"
              alt="Logo DIL Watermark"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="relative z-10">
          <header className="flex items-start justify-between border-b-4 border-black pb-2">
            <div className="w-24">
              <Logo />
            </div>
            <div className="text-right">
              <p className="font-bold">PT. Delta Indonesia Laboratory</p>
              <p>
                Jln. Perum Prima Harapan Regency, Gedung Prima Orchard Block C,
                No. 2
              </p>
              <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
              <p>Telp: 021 – 88982018</p>
            </div>
          </header>

          <div className="text-center my-6">
            <h1 className="text-sm font-bold underline">
              Berita Acara Pengambilan Sampel
            </h1>
            {(() => {
              const bulanRomawi = [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
              ];
              const bulan = new Date().getMonth();
              const tahun = new Date().getFullYear();
              const suffix = data.nomorFpps.slice(-3).padStart(3, "0");
              const nomorLengkap = `${suffix}/DIL/${bulanRomawi[bulan]}/${tahun}/BA`;
              return <p>Nomor: {nomorLengkap}</p>;
            })()}
          </div>

          <main>
            <p className="mb-4">
              Telah dilakukan pengambilan sampel oleh pihak PT Delta Indonesia
              Laboratory pada:
            </p>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td className="w-1/4">Perusahaan</td>
                  <td>: {data.perusahaan}</td>
                </tr>
                <tr>
                  <td className="w-1/4">Alamat</td>
                  <td>: {data.alamat}</td>
                </tr>
                <tr>
                  <td className="w-1/4">Telp./Fax</td>
                  <td>: {data.noTelp}</td>
                </tr>
                <tr>
                  <td className="w-1/4">Pada hari, tgl</td>
                  <td>: {data.hariTanggal}</td>
                </tr>
              </tbody>
            </table>
            <p>Dengan lokasi masing-masing:</p>
            <div className="grid grid-cols-2 gap-x-8 text-xs mt-2">
              <div>
                <p>
                  Udara Ambien: {data.titikPengujian.udaraAmbien || "..."} titik
                </p>
                <p>
                  Emisi Cerobong: {data.titikPengujian.emisiCerobong || "..."}{" "}
                  titik
                </p>
                <p>
                  Pencahayaan: {data.titikPengujian.pencahayaan || "..."} titik
                </p>
                <p>
                  Heat Stress: {data.titikPengujian.heatStress || "..."} titik
                </p>
              </div>
              <div>
                <p>
                  Udara Ruang Kerja:{" "}
                  {data.titikPengujian.udaraRuangKerja || "..."} titik
                </p>
                <p>Kebauan: {data.titikPengujian.kebauan || "..."} titik</p>
                <p>
                  Kebisingan: {data.titikPengujian.kebisingan || "..."} titik
                </p>
                <p>
                  Air Limbah: {data.titikPengujian.airLimbah || "..."} titik
                </p>
              </div>
            </div>
            <div className="border border-black mt-4">
              <div className="flex font-bold bg-gray-200 border-b border-black">
                <div className="w-8 p-1 border-r border-black text-center">
                  No
                </div>
                <div className="flex-1 p-1 border-r border-black text-center">
                  Lokasi
                </div>
                <div className="w-48 p-1 border-r border-black text-center">
                  Parameter
                </div>
                <div className="flex-1 p-1 border-r border-black text-center">
                  Regulasi
                </div>
                <div className="w-24 p-1 border-r border-black text-center">
                  Jenis Sampel
                </div>
                <div className="w-32 p-1 text-center">
                  Waktu Pengambilan (Jam)
                </div>
              </div>
              {data.rincianUji.map((item, index) => (
                <div
                  key={item.id}
                  className="flex border-b border-black last:border-b-0 break-inside-avoid"
                >
                  <div className="w-8 p-1 border-r border-black text-center">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-1 border-r border-black">
                    {item.lokasi}
                  </div>
                  <div
                    className="w-48 p-1 border-r border-black"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {item.parameter}
                  </div>
                  <div
                    className="flex-1 p-1 border-r border-black"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {item.regulasi}
                  </div>
                  <div className="w-24 p-1 border-r border-black text-center">
                    {item.jenisSampel}
                  </div>
                  <div className="w-32 p-1 text-center">
                    {item.waktuPengambilan}
                  </div>
                </div>
              ))}
            </div>
          </main>

          <footer className="mt-16">
            <div className="flex justify-between text-center">
              <div className="w-1/3">
                <p>Pihak Laboratorium,</p>
                <p>PT. Delta Indonesia Laboratory</p>
                <div className="relative h-24 w-full">
                  {data.penandaTangan.signatureUrlLab && (
                    <Image
                      src={data.penandaTangan.signatureUrlLab}
                      alt="TTD Pihak Lab"
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
                <p className="font-bold underline">
                  {data.penandaTangan.pihakLab || "(.........................)"}
                </p>
                <p>Petugas Pengambil Sampel</p>
              </div>
              <div className="w-1/3">
                <p>Pihak Perusahaan,</p>
                <p>{data.perusahaan}</p>
                <div className="relative h-24 w-full">
                  {data.penandaTangan.signatureUrlPerusahaan && (
                    <Image
                      src={data.penandaTangan.signatureUrlPerusahaan}
                      alt="TTD Pihak Perusahaan"
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
                <p className="font-bold underline">
                  {data.penandaTangan.pihakPerusahaan ||
                    "(.........................)"}
                </p>
                <p>Perwakilan Perusahaan</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
);

BapsDocument.displayName = "BapsDocument";

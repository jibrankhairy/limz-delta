"use client";

import React from "react";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PengujianDocummentProps {
  nomorSurat: string;
  petugas: string[];
  sampelData: any[];
  signatureData: {
    pjTeknis: string;
    admin: string;
    signatureUrlPj: string | null;
    signatureUrlAdmin: string | null;
  };
}

export const PengujianDocumment = React.forwardRef<
  HTMLDivElement,
  PengujianDocummentProps
>(({ nomorSurat, petugas, sampelData, signatureData }, ref) => {
  const today = format(new Date(), "dd MMMM yyyy", { locale: id });

  return (
    <div
      ref={ref}
      className="bg-white p-12 font-[Times_New_Roman] text-black relative"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      <div className="absolute inset-30 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[500px] h-[500px] opacity-30">
          <Image
            src="/images/logo-delta-transparan.png"
            alt="Logo DIL Watermark"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="relative z-10">
        <header className="flex items-start justify-between border-b-2 border-black pb-4">
          <div className="w-1/4">
            <Logo />
            <p className="text-sm font-bold">Delta Indonesia Laboratory</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">PT. Delta Indonesia Laboratory</p>
            <p>Jln. Porum Prima Harapan Regency,</p>
            <p>Gedung Prima Orchard Blok C, No. 2</p>
            <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
            <p>Telp. 021 - 88982018</p>
          </div>
        </header>

        {/* [PERBAIKAN] Judul dipindahkan ke dalam main content */}
        <main className="mt-10 text-sm">
          <h1 className="text-center text-lg font-bold underline">
            SURAT TUGAS PENGUJIAN SAMPEL
          </h1>
          <p className="text-center text-sm">
            No: {nomorSurat || "___/DIL/___/____/STP"}
          </p>

          <div className="mt-8">
            <p>Memerintahkan kepada:</p>
            <div className="pl-4 mt-2">
              {petugas.map((nama, index) => (
                <div key={index} className="flex">
                  <span className="w-6">{index + 1}.</span>
                  <span>{nama}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="font-bold text-center bg-gray-200">
                  <th className="border border-black p-1 w-[5%]">No.</th>
                  <th className="border border-black p-1 w-[15%]">Sampel ID</th>
                  <th className="border border-black p-1 w-[35%]">
                    Parameter Uji
                  </th>
                  <th className="border border-black p-1 w-[10%]">
                    Tipe Sampel
                  </th>
                  <th className="border border-black p-1 w-[15%]">
                    Deadline Pengujian
                  </th>
                  <th className="border border-black p-1 w-[20%]">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {sampelData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-1">{row.id}</td>
                    <td className="border border-black p-1">{row.parameter}</td>
                    <td className="border border-black p-1 text-center">
                      {row.tipeSampel}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {row.deadline
                        ? format(new Date(row.deadline), "dd/MM/yyyy")
                        : ""}
                    </td>
                    <td className="border border-black p-1">
                      {row.keterangan}
                    </td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(0, 10 - sampelData.length),
                }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td
                      className="border border-black p-1 h-6"
                      colSpan={6}
                    ></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 flex justify-between text-center text-sm">
            <div className="w-1/3">
              <p>Admin,</p>
              <div className="relative h-24 w-full">
                {signatureData.signatureUrlAdmin && (
                  <img
                    src={signatureData.signatureUrlAdmin}
                    alt="TTD Admin"
                    className="absolute inset-0 mx-auto h-full w-full object-contain"
                  />
                )}
              </div>
              <p className="font-bold underline">
                {signatureData.admin || "....................."}
              </p>
            </div>
            <div className="w-1/3">
              <p>Bekasi, {today}</p>
              <p>PT Delta Indonesia Laboratory</p>
              <div className="relative h-24 w-full">
                {signatureData.signatureUrlPj && (
                  <img
                    src={signatureData.signatureUrlPj}
                    alt="TTD PJ Teknis"
                    className="absolute inset-0 mx-auto h-full w-full object-contain"
                  />
                )}
              </div>
              <p className="font-bold underline">
                {signatureData.pjTeknis || "....................."}
              </p>
              <p>PJ Teknis</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

PengujianDocumment.displayName = "PengujianDocumment";

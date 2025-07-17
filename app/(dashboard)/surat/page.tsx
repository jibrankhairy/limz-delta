"use client";

import React, { useEffect, useRef, useState } from "react";
import FormSurat from "./components/FormSurat";
import PreviewDialog from "./components/PreviewDialog";
import { StpsDocument } from "./components/StpsDocument";

export default function SuratPage() {
  const [nomorSurat, setNomorSurat] = useState({
    nomorFpps: "",
    nomorStpsLengkap: "",
  });
  const [customerData, setCustomerData] = useState({
    hariTanggal: "",
    namaPelanggan: "",
    alamat: "",
    contactPerson: "",
  });
  const [petugas, setPetugas] = useState([""]);
  const [signatureData, setSignatureData] = useState({
    pjTeknis: "",
    signatureUrl: null as string | null,
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nomorSurat.nomorFpps) {
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

      const last3 = nomorSurat.nomorFpps.slice(-3);
      const formattedNomor = `${last3[0]}.${last3.slice(1)}`; // misalnya "095" → "0.95"

      setNomorSurat((prev) => ({
        ...prev,
        nomorStpsLengkap: `${formattedNomor}/DIL/${bulanRomawi[bulan]}/${tahun}/STPS`,
      }));
    }
  }, [nomorSurat.nomorFpps]);

  useEffect(() => {
    if (!nomorSurat.nomorFpps) return;

    const fetchFppsData = async () => {
      try {
        const res = await fetch(`/api/fpps/${nomorSurat.nomorFpps}`);
        if (!res.ok) throw new Error("Nomor FPPS tidak ditemukan");

        const result = await res.json();

        setCustomerData({
          hariTanggal: result.formData.tanggalMasuk || "",
          namaPelanggan: result.formData.namaPelanggan || "",
          alamat: result.formData.alamatPelanggan || "",
          contactPerson: "",
        });

        setPetugas(result.formData.petugas || [""]);
      } catch (error) {
        console.error("Gagal mengambil data FPPS:", error);
        setCustomerData({
          hariTanggal: "",
          namaPelanggan: "",
          alamat: "",
          contactPerson: "",
        });
        setPetugas([""]);
      }
    };

    fetchFppsData();
  }, [nomorSurat.nomorFpps]);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-6 pt-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
          Surat Tugas Pengambilan Sampel
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
          Isi data untuk menerbitkan STPS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        <FormSurat
          nomorSurat={nomorSurat}
          setNomorSurat={setNomorSurat}
          customerData={customerData}
          setCustomerData={setCustomerData}
          petugas={petugas}
          setPetugas={setPetugas}
          signatureData={signatureData}
          setSignatureData={setSignatureData}
          onSubmit={handlePreview}
        />

        <div className=" print-only border border-muted rounded-lg shadow-sm max-h-[90vh]">
          <StpsDocument
            ref={documentRef}
            nomorSurat={nomorSurat.nomorStpsLengkap}
            data={{
              ...customerData,
              petugas: petugas.filter((p) => p.trim() !== ""),
              ...signatureData,
            }}
          />
        </div>
      </div>

      <PreviewDialog
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        handlePrint={handlePrint}
      />
    </div>
  );
}

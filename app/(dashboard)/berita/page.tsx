"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CariForm } from "./components/CariForm";
import { TitikPengujianForm } from "./components/TitikPengujianForm";
import { RincianForm } from "./components/RincianForm";
import { BapsPreviewDialog } from "./components/BapsPreviewDialog";
import { BapsDocument } from "./BapsDocument";

interface BapsData {
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
  // Perubahan: Menambahkan data untuk penanda tangan
  penandaTangan: {
    pihakLab: string;
    pihakPerusahaan: string;
  };
}

export default function BeritaPage() {
  const [bapsData, setBapsData] = useState<BapsData | null>(null);
  const [fppsInput, setFppsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleCariFpps = async () => {
    if (!fppsInput) return alert("Masukkan nomor FPPS");
    setIsLoading(true);
    setBapsData(null);

    const searchKey = `DIL-${fppsInput}`;

    try {
      const res = await fetch(`/api/fpps/${searchKey}`);
      if (!res.ok) throw new Error("Gagal ambil data");
      const data = await res.json();
      setBapsData({
        nomorFpps: data.formData.nomorFpps,
        perusahaan: data.formData.namaPelanggan,
        alamat: data.formData.alamatPelanggan,
        noTelp: data.formData.noTelp,
        hariTanggal: "",
        titikPengujian: {
          udaraAmbien: "",
          emisiCerobong: "",
          pencahayaan: "",
          heatStress: "",
          udaraRuangKerja: "",
          kebauan: "",
          kebisingan: "",
          airLimbah: "",
        },
        rincianUji: data.rincian.map((item: any) => ({
          id: item.id,
          lokasi: item.area,
          parameter: item.parameter,
          regulasi: item.regulasi,
          jenisSampel: "",
          waktuPengambilan: "",
        })),
        // Perubahan: Inisialisasi data penanda tangan
        penandaTangan: {
          pihakLab: "",
          pihakPerusahaan: "",
        },
      });
    } catch (err) {
      console.error(err);
      alert("Data tidak ditemukan.");
    } finally {
      setIsLoading(false);
    }
  };

  // Perubahan: Fungsi ini diupdate untuk menangani data bertingkat (nested)
  const handleBapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!bapsData) return;
    const { name, value } = e.target;

    if (name === "pihakLab" || name === "pihakPerusahaan") {
      setBapsData({
        ...bapsData,
        penandaTangan: { ...bapsData.penandaTangan, [name]: value },
      });
    } else if (name in bapsData.titikPengujian) {
      setBapsData({
        ...bapsData,
        titikPengujian: { ...bapsData.titikPengujian, [name]: value },
      });
    } else {
      setBapsData({ ...bapsData, [name]: value });
    }
  };

  const handleRincianChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!bapsData) return;
    const { name, value } = e.target;
    const updated = [...bapsData.rincianUji];
    updated[index] = { ...updated[index], [name]: value };
    setBapsData({ ...bapsData, rincianUji: updated });
  };

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-6 pt-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
          Berita Acara Pengambilan Sampel
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
          Cari data berdasarkan Nomor FPPS untuk mengisi Berita Acara.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6">
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-4">
            <h2 className="text-base font-medium mb-2">Cari Data FPPS</h2>
            <CariForm
              value={fppsInput}
              loading={isLoading}
              onChange={setFppsInput}
              onSubmit={handleCariFpps}
            />
          </div>

          {bapsData && (
            <>
              <div className="border border-border rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Perusahaan
                    </Label>
                    <p className="text-base font-semibold mt-1">
                      {bapsData.perusahaan}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      No. Telp
                    </Label>
                    <p className="text-base font-semibold mt-1">
                      {bapsData.noTelp}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-foreground">
                      Alamat
                    </Label>
                    <p className="text-base font-semibold mt-1">
                      {bapsData.alamat}
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="hariTanggal" className="text-sm font-medium text-foreground">
                    Hari, Tanggal Pengambilan Sampel
                  </Label>
                  <Input
                    id="hariTanggal"
                    name="hariTanggal"
                    value={bapsData.hariTanggal}
                    onChange={handleBapsChange}
                    className="bg-transparent border border-input text-foreground mt-1"
                  />
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <TitikPengujianForm
                  data={bapsData.titikPengujian}
                  onChange={handleBapsChange}
                />
              </div>

              <div className="border border-border rounded-lg p-4">
                <RincianForm
                  rincianUji={bapsData.rincianUji}
                  onChange={handleRincianChange}
                />
              </div>
              
              {/* Perubahan: Form untuk nama penanda tangan */}
              <div className="border border-border rounded-lg p-4">
                <h2 className="text-base font-medium mb-4">Penanda Tangan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pihakLab" className="text-sm font-medium text-foreground">
                      Pihak Laboratorium
                    </Label>
                    <Input
                      id="pihakLab"
                      name="pihakLab"
                      value={bapsData.penandaTangan.pihakLab}
                      onChange={handleBapsChange}
                      placeholder="Masukkan nama..."
                      className="bg-transparent border border-input text-foreground mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pihakPerusahaan" className="text-sm font-medium text-foreground">
                      Pihak Perusahaan
                    </Label>
                    <Input
                      id="pihakPerusahaan"
                      name="pihakPerusahaan"
                      value={bapsData.penandaTangan.pihakPerusahaan}
                      onChange={handleBapsChange}
                      placeholder="Masukkan nama..."
                      className="bg-transparent border border-input text-foreground mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsPreviewOpen(true)}>
                  Simpan & Cetak
                </Button>
              </div>
            </>
          )}
        </div>

        {bapsData && (
          <div className="print-only max-h-[90vh] overflow-auto sticky top-20">
            <BapsDocument data={bapsData} />
          </div>
        )}
      </div>

      <BapsPreviewDialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onPrint={() => window.print()}
      />
    </div>
  );
}
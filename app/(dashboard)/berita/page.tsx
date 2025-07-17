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
      });
    } catch (err) {
      console.error(err);
      alert("Data tidak ditemukan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!bapsData) return;
    const { name, value } = e.target;
    if (name in bapsData.titikPengujian) {
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
    <div className="px-4 md:px-6 lg:px-10 py-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
          Berita Acara Pengambilan Sampel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cari data berdasarkan Nomor FPPS untuk mengisi Berita Acara.
        </p>
      </div>

      <Card className="border border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Cari Data FPPS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CariForm
            value={fppsInput}
            loading={isLoading}
            onChange={setFppsInput}
            onSubmit={handleCariFpps}
          />
        </CardContent>
      </Card>

      {bapsData && (
        <Card className="mt-6 border border-border shadow-none">
          <CardContent className="space-y-6">
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
              <Label
                htmlFor="hariTanggal"
                className="text-sm font-medium text-foreground"
              >
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

            <TitikPengujianForm
              data={bapsData.titikPengujian}
              onChange={handleBapsChange}
            />
            <RincianForm
              rincianUji={bapsData.rincianUji}
              onChange={handleRincianChange}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={() => setIsPreviewOpen(true)}>
              Simpan & Cetak
            </Button>
          </CardFooter>
        </Card>
      )}

      <BapsPreviewDialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onPrint={() => window.print()}
      />

      {bapsData && (
        <div className="print-only">
          <BapsDocument data={bapsData} />
        </div>
      )}
    </div>
  );
}

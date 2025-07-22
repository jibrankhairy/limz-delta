"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CariForm } from "./components/CariForm";
import { TitikPengujianForm } from "./components/TitikPengujianForm";
import { RincianForm } from "./components/RincianForm";
import { BapsPreviewDialog } from "./components/BapsPreviewDialog";
import { BapsDocument } from "./BapsDocument";
import { toast } from "sonner";
import { Printer, Save } from "lucide-react";

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
  penandaTangan: {
    pihakLab: string;
    signatureUrlLab: string;
    pihakPerusahaan: string;
    signatureUrlPerusahaan: string;
  };
}

export default function BeritaPage() {
  const [bapsData, setBapsData] = useState<BapsData | null>(null);
  const [fppsInput, setFppsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleCariFpps = async () => {
    if (!fppsInput) return toast.error("Masukkan nomor FPPS");
    setIsLoading(true);
    setBapsData(null);

    const searchKey = fppsInput.startsWith("DIL-")
      ? fppsInput
      : `DIL-${fppsInput}`;

    try {
      const res = await fetch(`/api/fpps/${searchKey}`);
      if (!res.ok) throw new Error("Gagal mengambil data FPPS");
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
        penandaTangan: {
          pihakLab: "",
          signatureUrlLab: "",
          pihakPerusahaan: "",
          signatureUrlPerusahaan: "",
        },
      });
      toast.success("Data FPPS berhasil dimuat.");
    } catch (err) {
      console.error(err);
      toast.error("Data tidak ditemukan atau terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!bapsData) return;
    const { name, value } = e.target;

    if (name in bapsData.penandaTangan) {
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

  const handleSignatureUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "signatureUrlLab" | "signatureUrlPerusahaan"
  ) => {
    if (!bapsData) return;
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBapsData({
          ...bapsData,
          penandaTangan: {
            ...bapsData.penandaTangan,
            [field]: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast.error("Harap unggah file gambar yang valid.");
    }
  };

  const handleSaveStatus = async () => {
    if (!bapsData) return toast.error("Data Berita Acara belum dimuat.");

    try {
      const res = await fetch(`/api/fpps/${bapsData.nomorFpps}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "analisis" }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui status FPPS.");

      toast.success("Status FPPS berhasil diubah menjadi 'Analisis'.");
    } catch (error: any) {
      console.error("Update FPPS Status Error:", error);
      toast.error(error.message || "Terjadi kesalahan saat menyimpan.");
    }
  };

  return (
    <div className="space-y-8 px-4 pt-6 md:px-8 lg:px-6">
      <div>
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          Berita Acara Pengambilan Sampel
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Cari data berdasarkan Nomor FPPS untuk mengisi Berita Acara.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-border p-4">
            <h2 className="mb-2 text-base font-medium">Cari Data FPPS</h2>
            <CariForm
              value={fppsInput}
              loading={isLoading}
              onChange={setFppsInput}
              onSubmit={handleCariFpps}
            />
          </div>

          {bapsData && (
            <>
              <div className="space-y-4 rounded-lg border border-border p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Perusahaan</Label>
                    <p className="mt-1 text-base font-semibold">
                      {bapsData.perusahaan}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">No. Telp</Label>
                    <p className="mt-1 text-base font-semibold">
                      {bapsData.noTelp}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium">Alamat</Label>
                    <p className="mt-1 text-base font-semibold">
                      {bapsData.alamat}
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="hariTanggal" className="text-sm font-medium">
                    Hari, Tanggal Pengambilan Sampel
                  </Label>
                  <Input
                    id="hariTanggal"
                    name="hariTanggal"
                    value={bapsData.hariTanggal}
                    onChange={handleBapsChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <TitikPengujianForm
                  data={bapsData.titikPengujian}
                  onChange={handleBapsChange}
                />
              </div>
              <div className="rounded-lg border border-border p-4">
                <RincianForm
                  rincianUji={bapsData.rincianUji}
                  onChange={handleRincianChange}
                />
              </div>

              <div className="rounded-lg border border-border p-4">
                <h2 className="mb-4 text-base font-medium">Penanda Tangan</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pihakLab">Pihak Laboratorium</Label>
                    <Input
                      id="pihakLab"
                      name="pihakLab"
                      value={bapsData.penandaTangan.pihakLab}
                      onChange={handleBapsChange}
                      placeholder="Nama..."
                    />
                    <Label
                      htmlFor="ttd-lab"
                      className="text-xs text-muted-foreground"
                    >
                      Tanda Tangan (PNG)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="ttd-lab"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSignatureUpload(e, "signatureUrlLab")
                        }
                        className="text-xs file:text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pihakPerusahaan">Pihak Perusahaan</Label>
                    <Input
                      id="pihakPerusahaan"
                      name="pihakPerusahaan"
                      value={bapsData.penandaTangan.pihakPerusahaan}
                      onChange={handleBapsChange}
                      placeholder="Nama..."
                    />
                    <Label
                      htmlFor="ttd-perusahaan"
                      className="text-xs text-muted-foreground"
                    >
                      Tanda Tangan (PNG)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="ttd-perusahaan"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSignatureUpload(e, "signatureUrlPerusahaan")
                        }
                        className="text-xs file:text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={handleSaveStatus}>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </>
          )}
        </div>

        {bapsData && (
          <div className="print-only sticky top-20 max-h-[90vh] overflow-auto">
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

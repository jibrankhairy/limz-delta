"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

export default function FormDasar({ formData, setFormData, goToStep2 }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nomorFpps") {
      const onlyNumber = value.startsWith("DIL-") ? value.slice(4) : value;
      if (/^\d*$/.test(onlyNumber)) {
        setFormData((prev) => ({ ...prev, [name]: onlyNumber }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goToStep2();
      }}
    >
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="nomorFpps"
              className="text-sm font-medium text-foreground"
            >
              Nomor FPPS
            </Label>
            <Input
              id="nomorFpps"
              name="nomorFpps"
              value={`DIL-${formData.nomorFpps}`}
              onChange={handleChange}
              required
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="nomorQuotation"
              className="text-sm font-medium text-foreground"
            >
              Nomor Quotation
            </Label>
            <Input
              name="nomorQuotation"
              value={formData.nomorQuotation}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="petugas"
              className="text-sm font-medium text-foreground"
            >
              Petugas
            </Label>
            <Input
              name="petugas"
              value={formData.petugas}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="tanggalMasuk"
              className="text-sm font-medium text-foreground"
            >
              Tanggal Masuk
            </Label>
            <Input
              type="date"
              name="tanggalMasuk"
              value={formData.tanggalMasuk}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="namaPelanggan"
              className="text-sm font-medium text-foreground"
            >
              Nama Pelanggan
            </Label>
            <Input
              name="namaPelanggan"
              value={formData.namaPelanggan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="noTelp"
              className="text-sm font-medium text-foreground"
            >
              No. Telp/HP
            </Label>
            <Input
              name="noTelp"
              value={formData.noTelp}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="alamatPelanggan"
              className="text-sm font-medium text-foreground"
            >
              Alamat Pelanggan
            </Label>
            <Textarea
              name="alamatPelanggan"
              value={formData.alamatPelanggan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="kegiatan"
              className="text-sm font-medium text-foreground"
            >
              Kegiatan
            </Label>
            <Input
              name="kegiatan"
              value={formData.kegiatan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end px-6 py-4">
        <Button type="submit">Selanjutnya</Button>
      </CardFooter>
    </form>
  );
}

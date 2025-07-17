"use client";

import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Printer, XCircle } from "lucide-react";

export default function FormSurat({
  nomorSurat,
  setNomorSurat,
  customerData,
  setCustomerData,
  petugas,
  setPetugas,
  signatureData,
  setSignatureData,
  onSubmit,
  onPrint,
}: any) {
  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePetugasChange = (index: number, value: string) => {
    const newPetugas = [...petugas];
    newPetugas[index] = value;
    setPetugas(newPetugas);
  };

  const handlePjTeknisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureData((prev: any) => ({ ...prev, pjTeknis: e.target.value }));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureData((prev: any) => ({
          ...prev,
          signatureUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addPetugas = () => setPetugas([...petugas, ""]);
  const removePetugas = (index: number) => {
    if (petugas.length > 1) {
      setPetugas(petugas.filter((_: any, i: number) => i !== index));
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[600px] w-full">
      <CardContent className="space-y-10">
        {/* Nomor Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nomor FPPS"
            name="nomorFpps"
            value={nomorSurat.nomorFpps}
            onChange={(e: any) =>
              setNomorSurat((prev: any) => ({
                ...prev,
                nomorFpps: e.target.value,
              }))
            }
            required
          />
          <InputField
            label="Nomor STPS (Otomatis)"
            name="nomorStpsLengkap"
            value={nomorSurat.nomorStpsLengkap}
            readOnly
          />
        </div>

        {/* Petugas */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Petugas
          </h2>
          <div className="space-y-4">
            {petugas.map((nama: string, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <label className="w-10 text-sm font-medium text-foreground">
                  {index + 1}.
                </label>
                <Input
                  type="text"
                  placeholder={`Nama Petugas ${index + 1}`}
                  value={nama}
                  onChange={(e) => handlePetugasChange(index, e.target.value)}
                  required
                  className="flex-1 bg-transparent border border-input text-foreground mt-1"
                />
                {petugas.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePetugas(index)}
                    className="text-red-500 hover:bg-red-500/10"
                  >
                    <XCircle size={22} />
                  </Button>
                )}
              </div>
            ))}
            <div className="pl-14">
              <Button
                type="button"
                onClick={addPetugas}
                variant="outline"
                className="mt-2 flex items-center gap-2"
              >
                <PlusCircle size={18} /> Tambah Petugas
              </Button>
            </div>
          </div>
        </div>

        {/* Info Pelanggan */}
        <div className="space-y-6">
          <InputField
            label="Hari/Tanggal"
            name="hariTanggal"
            value={customerData.hariTanggal}
            onChange={handleCustomerChange}
            required
          />
          <InputField
            label="Nama Pelanggan"
            name="namaPelanggan"
            value={customerData.namaPelanggan}
            onChange={handleCustomerChange}
            required
          />
          <TextareaField
            label="Alamat"
            name="alamat"
            value={customerData.alamat}
            onChange={handleCustomerChange}
            required
          />
          <InputField
            label="Contact Person"
            name="contactPerson"
            value={customerData.contactPerson}
            onChange={handleCustomerChange}
            required
          />
        </div>

        {/* Penanggung Jawab */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            label="PJ Teknis"
            name="pjTeknis"
            value={signatureData.pjTeknis}
            onChange={handlePjTeknisChange}
          />
          <div>
            <Label className="block mb-1 text-foreground">
              Tanda Tangan Digital (PNG)
            </Label>
            <input
              id="signature-upload"
              type="file"
              accept="image/png"
              onChange={handleSignatureUpload}
              className="w-full text-sm text-muted-foreground file:mr-4 file:rounded file:border file:border-input file:bg-background file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted"
            />
            {signatureData.signatureUrl && (
              <img
                src={signatureData.signatureUrl}
                className="mt-3 h-16 w-32 object-contain border border-input"
              />
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end pt-6">
        <Button onClick={onPrint}>
          <Printer />
          Print
        </Button>
      </CardFooter>
    </form>
  );
}

const InputField = ({ label, ...props }: any) => (
  <div>
    <Label className="block mb-1 text-foreground">{label}</Label>
    <Input
      {...props}
      className="w-full bg-transparent border border-input text-foreground mt-1"
    />
  </div>
);

const TextareaField = ({ label, ...props }: any) => (
  <div>
    <Label className="block mb-1 text-foreground">{label}</Label>
    <Textarea
      {...props}
      className="w-full bg-transparent border border-input text-foreground mt-1"
    />
  </div>
);

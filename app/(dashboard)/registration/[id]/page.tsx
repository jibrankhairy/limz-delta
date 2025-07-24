"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import FormDasar from "../components/FormDasar";
import FormRincian from "../components/FormRincian";
import { FppsDocument } from "../components/FppsDocument";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoading } from "@/components/context/LoadingContext";

interface RincianItem {
  id: string;
  area: string;
  matriks: string;
  parameter: string;
  regulasi: string;
  metode: string;
}

// Komponen Skeleton untuk loading
const FormSkeleton = () => (
  <div className="p-6 space-y-6">
    <Skeleton className="h-8 w-1/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  </div>
);

export default function EditRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [step, setStep] = useState(2);
  const { setIsLoading, isLoading } = useLoading();

  const [formData, setFormData] = useState({
    nomorFpps: "",
    nomorQuotation: "",
    petugas: [""],
    namaPelanggan: "",
    alamatPelanggan: "",
    noTelp: "",
    tanggalMasuk: "",
    kegiatan: "",
    namaPpic: "",
    emailPpic: "",
  });
  const [rincian, setRincian] = useState<RincianItem[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/fpps/${id}`);
        const existingData = res.data;

        const nomorFppsWithoutPrefix =
          existingData.formData.nomorFpps.replace("DIL-", "") || "";

        setFormData({
          ...existingData.formData,
          nomorFpps: nomorFppsWithoutPrefix,
        });
        setRincian(existingData.rincian);
      } catch (error) {
        console.error("Gagal mengambil data untuk diedit:", error);
        toast.error("Gagal mengambil data. Mungkin data tidak ditemukan.");
        router.push("/overview");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setIsLoading, router]);

  const handleUpdate = async () => {
    const nomorFppsFinal = `DIL-${formData.nomorFpps}`;
    const payload = {
      formData: { ...formData, nomorFpps: nomorFppsFinal },
      rincian,
    };

    setIsLoading(true);
    try {
      await axios.put(`/api/fpps/${id}`, payload);
      toast.success(`Data untuk ${nomorFppsFinal} berhasil diperbarui!`);
      router.push("/overview");
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Gagal memperbarui: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.nomorFpps) {
    return <FormSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="px-4 pt-6 md:px-8 lg:px-6">
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          Edit Form Pendaftaran Pengujian
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Ubah data pelanggan dan rincian pengujian di bawah ini.
        </p>
      </div>

      {step === 1 ? (
        <FormDasar
          formData={formData}
          setFormData={setFormData}
          goToStep2={() => setStep(2)}
        />
      ) : (
        <FormRincian
          formData={formData}
          rincian={rincian}
          setRincian={setRincian}
          goBack={() => setStep(1)}
          onSubmit={handleUpdate}
          onPrint={() => {}}
        />
      )}
    </div>
  );
}

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Eye, EyeOff, Settings, ChevronLeft } from "lucide-react";

export function WorkplaceAirForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {
  const handleParameterChange = (index, field, value) => {
    const newResults = [...template.results];
    // Pastikan kita membuat salinan objek sebelum mengubahnya
    newResults[index] = { ...newResults[index], [field]: value };
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  return (
    // Card utama, class warna dihapus agar otomatis adaptif
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Workplace Air</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>

      {/* Konten dengan spacing vertikal yang konsisten */}
      <CardContent className="space-y-8">
        {/* === SEKSI INFORMASI SAMPEL === */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Informasi Sampel & Catatan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sampleNo">Sampel No.</Label>
              <Input
                id="sampleNo"
                name="sampleNo"
                value={template.sampleInfo.sampleNo || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingLocation">Lokasi Sampling</Label>
              <Input
                id="samplingLocation"
                name="samplingLocation"
                value={template.sampleInfo.samplingLocation || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingTime">Waktu Sampling</Label>
              <Input
                id="samplingTime"
                name="samplingTime"
                value={template.sampleInfo.samplingTime || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Kaki (Regulatory Standard)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={template.sampleInfo.notes || ""}
              onChange={handleSampleInfoChange}
              placeholder="Contoh: ** Peraturan Menteri Ketenagakerjaan..."
            />
          </div>
        </div>

        {/* === SEKSI KONDISI LINGKUNGAN (Hanya jika Permenaker A) === */}
        {template.regulation === "permenaker_a" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-3">
              Kondisi Lingkungan Kerja
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="temperature">Suhu</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  value={template.sampleInfo.temperature || ""}
                  onChange={handleSampleInfoChange}
                  placeholder="... °C"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Kelembapan</Label>
                <Input
                  id="humidity"
                  name="humidity"
                  value={template.sampleInfo.humidity || ""}
                  onChange={handleSampleInfoChange}
                  placeholder="... %RH"
                />
              </div>
            </div>
          </div>
        )}

        {/* === SEKSI HASIL PENGUJIAN PARAMETER === */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Hasil Pengujian Parameter
          </h3>
          <div className="space-y-4">
            {template.results.map((param, index) => (
              <div
                key={`${param.name}-${index}`}
                className="p-4 rounded-lg border bg-muted/30 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{param.name}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleParameterChange(
                        index,
                        "isVisible",
                        !param.isVisible
                      )
                    }
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                  >
                    {param.isVisible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {param.isVisible && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                    <div className="space-y-2">
                      <Label>Hasil Uji</Label>
                      <Input
                        value={param.testingResult || ""}
                        onChange={(e) =>
                          handleParameterChange(
                            index,
                            "testingResult",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Unit{" "}
                        <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
                      </Label>
                      <Input
                        value={param.unit}
                        onChange={(e) =>
                          handleParameterChange(index, "unit", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Baku Mutu{" "}
                        <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
                      </Label>
                      <Input
                        value={param.standard}
                        onChange={(e) =>
                          handleParameterChange(
                            index,
                            "standard",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Metode{" "}
                        <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
                      </Label>
                      <Input
                        value={param.method}
                        onChange={(e) =>
                          handleParameterChange(index, "method", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* === SEKSI PENGATURAN HALAMAN === */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-3 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan Halaman
          </h3>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="kan-logo-switch" className="text-base">
                Tampilkan Logo KAN
              </Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan untuk menampilkan logo KAN di header halaman ini.
              </p>
            </div>
            <Switch
              id="kan-logo-switch"
              checked={template.showKanLogo}
              onCheckedChange={(value) =>
                onTemplateChange({ ...template, showKanLogo: value })
              }
            />
          </div>
        </div>
      </CardContent>

      {/* Footer dengan posisi tombol seperti semula */}
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onPreview}>
          Preview Halaman
        </Button>
        <Button onClick={() => onSave(template)}>Simpan Perubahan</Button>
      </CardFooter>
    </Card>
  );
}

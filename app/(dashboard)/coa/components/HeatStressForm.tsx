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
import {
  PlusCircle,
  Trash2,
  ChevronLeft,
  Save,
  FileSearch,
} from "lucide-react";
import { nanoid } from "nanoid";
import { defaultHeatStressRow } from "../data/heatstress-data"; // Impor di luar fungsi

export function HeatStressForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {
  const handleChange = (index, field, value) => {
    const newResults = [...template.results];
    newResults[index] = { ...newResults[index], [field]: value };
    onTemplateChange({ ...template, results: newResults });
  };

  const handleAddRow = () => {
    const newRow = { id: nanoid(), ...defaultHeatStressRow };
    const newResults = [...template.results, newRow];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (index) => {
    const newResults = template.results.filter((_, i) => i !== index);
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  // Helper untuk mempersingkat pemanggilan input dan label
  const renderField = (label, id, value, onChange) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        className="bg-transparent border border-input text-foreground mt-1"
      />
    </div>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Detail & Hasil Tes Heat Stress (Iklim Kerja)</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* === Bagian Informasi Sampel === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Informasi Sampel Umum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {renderField(
              "Sampel No.",
              "sampleNo",
              template.sampleInfo.sampleNo,
              handleSampleInfoChange
            )}
          </div>
        </div>

        {/* === Bagian Hasil Pengujian === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Hasil Pengujian per Lokasi
          </h3>
          <div className="space-y-4 pt-2">
            {template.results.map((row, index) => (
              <div
                key={row.id}
                className="border rounded-lg p-4 space-y-4 bg-muted/20"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">
                    Lokasi #{index + 1}
                  </p>
                  {template.results.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRow(index)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                  {renderField(
                    "Lokasi Sampling",
                    `location-${index}`,
                    row.location,
                    (e) => handleChange(index, "location", e.target.value)
                  )}
                  {renderField("Waktu", `time-${index}`, row.time, (e) =>
                    handleChange(index, "time", e.target.value)
                  )}
                  {renderField(
                    "Kelembapan (%)",
                    `humidity-${index}`,
                    row.humidity,
                    (e) => handleChange(index, "humidity", e.target.value)
                  )}
                  {renderField(
                    "Suhu Basah (°C)",
                    `wetTemp-${index}`,
                    row.wetTemp,
                    (e) => handleChange(index, "wetTemp", e.target.value)
                  )}
                  {renderField(
                    "Suhu Kering (°C)",
                    `dewTemp-${index}`,
                    row.dewTemp,
                    (e) => handleChange(index, "dewTemp", e.target.value)
                  )}
                  {renderField(
                    "Suhu Globe (°C)",
                    `globeTemp-${index}`,
                    row.globeTemp,
                    (e) => handleChange(index, "globeTemp", e.target.value)
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddRow}
              className="w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Lokasi
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onPreview}
          className="w-full sm:w-auto"
        >
          <FileSearch className="mr-2 h-4 w-4" />
          Preview Halaman
        </Button>
        <Button onClick={() => onSave(template)} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </Button>
      </CardFooter>
    </Card>
  );
}

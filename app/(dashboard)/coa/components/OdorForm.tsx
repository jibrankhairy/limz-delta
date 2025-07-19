"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil, Settings, ChevronLeft, Save, FileSearch } from "lucide-react";

export function OdorForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {
  // Judul dinamis berdasarkan regulasi yang dipilih
  const regulationTitle = React.useMemo(() => {
    if (template.regulation.startsWith("permenaker"))
      return "Permenaker No. 05 Tahun 2018";
    if (template.regulation === "kepmenlh")
      return "Kepmen LH No. 50 Tahun 1996";
    return "Template Odor";
  }, [template.regulation]);

  const handleParameterChange = (index, field, value) => {
    const newResults = [...template.results];
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

  // Helper untuk mempersingkat pemanggilan input dan label
  const renderField = (
    label,
    id,
    value,
    onChange,
    placeholder = "",
    isEditable = false
  ) => (
    <div>
      <Label
        htmlFor={id}
        className="text-sm font-medium text-foreground flex items-center"
      >
        {label}
        {isEditable && (
          <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
        )}
      </Label>
      <Input
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent border border-input text-foreground mt-1"
      />
    </div>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex-grow">
            <CardTitle>Detail & Hasil Tes Odor</CardTitle>
            <CardDescription className="mt-1">
              Menggunakan standar: {regulationTitle}
            </CardDescription>
          </div>
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
            {renderField(
              "Lokasi Sampling",
              "samplingLocation",
              template.sampleInfo.samplingLocation,
              handleSampleInfoChange,
              "(See Table)"
            )}
            {renderField(
              "Waktu Sampling",
              "samplingTime",
              template.sampleInfo.samplingTime,
              handleSampleInfoChange,
              "(See Table)"
            )}
          </div>
        </div>

        {/* === Bagian Hasil Pengujian === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Hasil Pengujian Parameter
          </h3>
          <div className="space-y-4 pt-2">
            {template.results.map((param, index) => (
              <div
                key={param.id}
                className="border rounded-lg p-4 space-y-4 bg-muted/20"
              >
                <p className="font-semibold text-foreground">{param.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField(
                    "Hasil Tes",
                    `testingResult-${index}`,
                    param.testingResult,
                    (e) =>
                      handleParameterChange(
                        index,
                        "testingResult",
                        e.target.value
                      )
                  )}
                  {renderField(
                    "Unit",
                    `unit-${index}`,
                    param.unit,
                    (e) => handleParameterChange(index, "unit", e.target.value),
                    "",
                    true
                  )}
                  {renderField(
                    "Standar Baku Mutu",
                    `standard-${index}`,
                    param.standard,
                    (e) =>
                      handleParameterChange(index, "standard", e.target.value),
                    "",
                    true
                  )}
                  {renderField(
                    "Metode",
                    `method-${index}`,
                    param.method,
                    (e) =>
                      handleParameterChange(index, "method", e.target.value),
                    "",
                    true
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Bagian Kondisi Lingkungan === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            {template.regulation.startsWith("permenaker")
              ? "Kondisi Lingkungan Kerja"
              : "Kondisi Lingkugan Ambien"}
          </h3>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-2`}>
            {template.regulation.startsWith("permenaker") ? (
              <>
                {renderField(
                  "Suhu",
                  "temperatureWorkplace",
                  template.sampleInfo.temperatureWorkplace,
                  handleSampleInfoChange,
                  "... °C"
                )}
                {renderField(
                  "Kelembapan",
                  "humidityWorkplace",
                  template.sampleInfo.humidityWorkplace,
                  handleSampleInfoChange,
                  "... %RH"
                )}
              </>
            ) : (
              <>
                {renderField(
                  "Koordinat",
                  "coordinate",
                  template.sampleInfo.coordinate,
                  handleSampleInfoChange
                )}
                {renderField(
                  "Suhu",
                  "temperatureAmbient",
                  template.sampleInfo.temperatureAmbient,
                  handleSampleInfoChange,
                  "... °C"
                )}
                {renderField(
                  "Tekanan",
                  "pressure",
                  template.sampleInfo.pressure,
                  handleSampleInfoChange,
                  "... mmHg"
                )}
                {renderField(
                  "Kelembapan",
                  "humidityAmbient",
                  template.sampleInfo.humidityAmbient,
                  handleSampleInfoChange,
                  "... %RH"
                )}
                {renderField(
                  "Kecepatan Angin",
                  "windSpeed",
                  template.sampleInfo.windSpeed,
                  handleSampleInfoChange,
                  "... m/s"
                )}
                {renderField(
                  "Arah Angin",
                  "windDirection",
                  template.sampleInfo.windDirection,
                  handleSampleInfoChange
                )}
                {renderField(
                  "Cuaca",
                  "weather",
                  template.sampleInfo.weather,
                  handleSampleInfoChange
                )}
              </>
            )}
          </div>
        </div>

        {/* === Bagian Pengaturan Halaman === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3 flex items-center">
            <Settings className="w-5 h-5 mr-3" />
            Pengaturan Halaman
          </h3>
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 mt-2">
            <div>
              <Label
                htmlFor="kan-logo-switch"
                className="text-sm font-medium text-foreground"
              >
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

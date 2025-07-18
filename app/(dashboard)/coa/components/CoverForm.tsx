"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

const allSubjects = [
  "Ambient Outdoor Air Quality",
  "Workplace Air Quality",
  "Noise",
  "Odor",
  "Illumination",
  "Heat Stress",
  "Wastewater",
];
const sampleTakenByOptions = [
  "PT. Delta Indonesia Laboratory",
  "Customer",
  "Third Party",
];

export function CoverForm({
  coaData,
  handleCheckboxChange,
  handleCoaChange,
  handleSignatureUpload,
  onNextStep,
}) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleSignatureUpload(file);
    }
  };

  return (
    <Card className="w-full max-w-4xl border border-border bg-background text-foreground">
      <CardHeader>
        <CardTitle>Lengkapi Data COA (Halaman 1)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-4 rounded-md border border-border">
          <p>
            Customer: <span className="font-semibold">{coaData.customer}</span>
          </p>
          <p>
            Address: <span className="font-semibold">{coaData.address}</span>
          </p>
          <p>
            Phone: <span className="font-semibold">{coaData.phone}</span>
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Subject</Label>
          <div className="p-4 mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border border-border">
            {allSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={coaData.subjects.includes(subject)}
                  onCheckedChange={() =>
                    handleCheckboxChange("subjects", subject)
                  }
                />
                <label
                  htmlFor={subject}
                  className="text-sm font-medium text-foreground"
                >
                  {subject}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            Sample taken by
          </Label>
          <div className="mt-2 p-4 flex flex-col md:flex-row gap-4 rounded-md border border-border">
            {sampleTakenByOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={coaData.sampleTakenBy.includes(option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("sampleTakenBy", option)
                  }
                />
                <label
                  htmlFor={option}
                  className="text-sm font-medium text-foreground"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Tanggal</Label>
          <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-md border border-border">
            <div>
              <Label className="text-sm font-medium text-foreground">
                Receive Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1 bg-transparent border border-input text-foreground"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {coaData.receiveDate ? (
                      format(coaData.receiveDate, "PPP", { locale: id })
                    ) : (
                      <span className="text-muted-foreground">
                        Pilih tanggal
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={coaData.receiveDate}
                    onSelect={(date) => handleCoaChange("receiveDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Analysis Start
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1 bg-transparent border border-input text-foreground"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {coaData.analysisDateStart ? (
                      format(coaData.analysisDateStart, "PPP", { locale: id })
                    ) : (
                      <span className="text-muted-foreground">
                        Pilih tanggal
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={coaData.analysisDateStart}
                    onSelect={(date) =>
                      handleCoaChange("analysisDateStart", date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Analysis End
              </Label>
              <Input
                readOnly
                value={coaData.analysisDateEnd}
                className="mt-1 bg-transparent border border-input text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Report Date
              </Label>
              <Input
                readOnly
                value={coaData.reportDate}
                className="mt-1 bg-transparent border border-input text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            Pengesahan
          </Label>
          <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md border border-border">
            <div>
              <Label
                htmlFor="directorName"
                className="text-sm font-medium text-foreground"
              >
                Nama Direktur Utama
              </Label>
              <Input
                id="directorName"
                value={coaData.directorName}
                onChange={(e) =>
                  handleCoaChange("directorName", e.target.value)
                }
                className="mt-1 bg-transparent border border-input text-foreground"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Tanda Tangan Digital (PNG)
              </Label>
              <div className="mt-1 flex items-center gap-4">
                <Input
                  id="signature-upload"
                  type="file"
                  accept="image/png"
                  onChange={onFileChange}
                  className="flex-1 file:text-white"
                />

                {coaData.signatureUrl && (
                  <div className="h-10 w-20 p-1 rounded border border-border bg-white flex items-center justify-center">
                    <Image
                      src={coaData.signatureUrl}
                      alt="Preview TTD"
                      width={80}
                      height={40}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2 flex items-center space-x-2 pt-2">
              <Switch
                id="kan-logo"
                checked={coaData.showKanLogo}
                onCheckedChange={(checked) =>
                  handleCoaChange("showKanLogo", checked)
                }
              />
              <Label
                htmlFor="kan-logo"
                className="text-sm font-medium text-foreground"
              >
                Tampilkan Logo KAN di Dokumen
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNextStep}>Selanjutnya</Button>
      </CardFooter>
    </Card>
  );
}

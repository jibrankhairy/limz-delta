"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchCardProps {
  fppsInput: string;
  setFppsInput: (value: string) => void;
  handleCariFpps: () => void;
  isLoading: boolean;
}

export function SearchCard({
  fppsInput,
  setFppsInput,
  handleCariFpps,
  isLoading,
}: SearchCardProps) {
  return (
    <Card className="w-full max-w-lg border border-border bg-background text-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Cari Data FPPS
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Masukkan nomor FPPS untuk mengambil data customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 w-full">
            <label
              htmlFor="search-fpps"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Nomor FPPS
            </label>
            <Input
              id="search-fpps"
              type="text"
              placeholder="Ketik nomornya saja, cth: 001"
              value={fppsInput}
              onChange={(e) => setFppsInput(e.target.value)}
              className="bg-transparent border border-input text-foreground mt-1 w-full"
            />
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={handleCariFpps}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Mencari..." : "Cari"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

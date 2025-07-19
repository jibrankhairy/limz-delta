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
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";

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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoading) {
      handleCariFpps();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Cari Data FPPS</CardTitle>
        <CardDescription>
          Masukkan nomor FPPS untuk mengambil data customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex-grow">
              <Label
                htmlFor="search-fpps"
                className="text-sm font-medium text-foreground"
              >
                Nomor FPPS
              </Label>
              <Input
                id="search-fpps"
                type="text"
                placeholder="Ketik nomornya saja, cth: 001"
                value={fppsInput}
                onChange={(e) => setFppsInput(e.target.value)}
                className="bg-transparent border border-input text-foreground mt-1 w-full"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !fppsInput}
              className="flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isLoading ? "Mencari..." : "Cari"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

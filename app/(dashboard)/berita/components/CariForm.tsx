"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface CariFormProps {
  value: string;
  loading: boolean;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export function CariForm({
  value,
  loading,
  onChange,
  onSubmit,
}: CariFormProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <Input
        type="text"
        placeholder="Ketik nomornya saja, cth: 250712001"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-input text-foreground mt-1"
      />
      <Button onClick={onSubmit} disabled={loading}>
        <Search className="h-4 w-4" />
        {loading ? "Mencari..." : "Cari"}
      </Button>
    </div>
  );
}

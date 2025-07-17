"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface BapsPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export function BapsPreviewDialog({
  open,
  onClose,
  onPrint,
}: BapsPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Siap Mencetak Berita Acara?</DialogTitle>
          <DialogDescription>
            Pastikan semua data sudah benar. Klik 'Print' untuk melanjutkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

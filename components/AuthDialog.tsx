"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  mode: "signin" | "signup";
};

export const AuthDialog = ({ mode }: Props) => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.querySelector("#email") as HTMLInputElement).value;
    const password = (form.querySelector("#password") as HTMLInputElement)
      .value;
    const name =
      mode === "signup"
        ? (form.querySelector("#name") as HTMLInputElement).value
        : "";

    // Validasi sederhana
    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const endpoint =
        mode === "signup" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        mode === "signup"
          ? { fullName: name, email, password }
          : { email, password };

      const res = await axios.post(endpoint, payload);

      toast.success(`${mode === "signin" ? "Sign In" : "Sign Up"} successful!`);

      if (mode === "signin") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/dashboard");
      }

      setOpen(false);
    } catch (err: any) {
      console.error("Auth error:", err);
      const msg = err.response?.data?.message || "Server error";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "signin" ? "outline" : "default"} size="sm">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" />
            </>
          )}

          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input id="password" type="password" placeholder="••••••" />
          </div>

          <Button type="submit" className="w-full">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

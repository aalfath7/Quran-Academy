"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/lib/auth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export type LoginState = { error?: string; email?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });
  const email = String(formData.get("email") ?? "");

  if (!parsed.success) return { error: "Masukkan email dan password yang valid.", email };
  if (!(await signIn(parsed.data.email, parsed.data.password))) {
    return { error: "Email atau password salah.", email };
  }

  redirect("/admin");
}

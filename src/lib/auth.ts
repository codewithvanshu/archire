
import { supabase } from "./supabase";

export async function resendVerificationEmail(email: string): Promise<void> {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) throw error;
}

export async function resetPasswordForEmail(email: string, role: "architect" | "client"): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/${role}/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

export async function signInWithGoogle(role: "architect" | "client"): Promise<void> {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error("NEXT_PUBLIC_APP_URL environment variable is required");
  }
  
  window.location.href = `/api/auth/google?role=${role}`;
}

export async function getClient() {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) throw error;
  return userData?.user;
}

export async function getArchitect() {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) throw error;
  return userData?.user;
}
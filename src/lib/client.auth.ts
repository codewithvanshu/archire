"use client";
import { supabase } from "./supabase";

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return null;
    }
    return user;
}
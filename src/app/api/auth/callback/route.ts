import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma"; // Import Prisma client

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => cookieStore.set({ name, value, ...options }),
    deleteCookie: (name, options) => cookieStore.delete({ name, ...options }),
  });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") as "architect" | "client" | null;

  if (!code || !role) {
    return NextResponse.redirect(new URL("/error?message=Invalid callback", request.url));
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/error?message=Authentication failed", request.url));
  }

  if (data.user && data.user.user_metadata.role !== role) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/error?message=Unauthorized role", request.url));
  }

  // Sync user with Prisma User table
  await prisma.user.upsert({
    where: { email: data.user.email! },
    update: {
      role: role.toUpperCase() === "ARCHITECT" ? "ARCHITECT" : "CLIENT",
      name: data.user.user_metadata.fullname || undefined,
    },
    create: {
      id: data.user.id,
      email: data.user.email!,
      role: role.toUpperCase() === "ARCHITECT" ? "ARCHITECT" : "CLIENT",
      name: data.user.user_metadata.fullname || null,
    },
  });

  const response = NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  if (data.session) {
    response.cookies.delete("sb-access-token");
    response.cookies.delete("sb-refresh-token");
    response.cookies.set("sb-access-token", data.session.access_token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return response;
}
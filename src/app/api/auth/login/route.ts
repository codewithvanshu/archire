import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma"; // Import Prisma client

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => cookieStore.set({ name, value, ...options }),
    deleteCookie: (name, options) => cookieStore.delete({ name, ...options }),
  });

  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (!data.user || !data.session) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    const userRole = data.user.user_metadata.role;
    if (userRole !== role) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Unauthorized: Incorrect role" }, { status: 403 });
    }

    // Sync user with Prisma User table
    await prisma.user.upsert({
      where: { email: data.user.email },
      update: {
        role: userRole.toUpperCase() === "ARCHITECT" ? "ARCHITECT" : "CLIENT",
        name: data.user.user_metadata.fullname || undefined, // Update name if available
      },
      create: {
        id: data.user.id,
        email: data.user.email ?? (() => { throw new Error("User email is undefined"); })(),
        role: userRole.toUpperCase() === "ARCHITECT" ? "ARCHITECT" : "CLIENT",
        name: data.user.user_metadata.fullname || null,
      },
    });

    const response = NextResponse.json({
      success: true,
      user: { id: data.user.id, email: data.user.email, role: userRole },
    });

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

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 401 }
    );
  }
}
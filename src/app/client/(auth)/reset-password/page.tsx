import ResetPasswordForm from "@/components/auth/reset-password/form";
import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <Link
        href="/client/dashboard"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Logo className="size-16" />
        </div>
        ArcHire
      </Link>
      <ResetPasswordForm
        back={
          <Link href="/client/login" className="w-full">
            <Button variant="ghost" className="w-full">
              Back To Login
            </Button>
          </Link>
        }
      />
    </div>
  );
}

export default Page;

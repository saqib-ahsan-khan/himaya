"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configError = searchParams.get("error") === "Configuration";
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    setAuthError(false);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error === "Configuration") {
        router.replace("/admin/login?error=Configuration");
        return;
      }
      setAuthError(true);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-warmCream px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-deepNavy/[0.08] bg-white p-10 shadow-[0_8px_40px_rgba(7,24,39,0.08)]">
        <div className="text-center">
          <img src="/assets/images/logos/himaya-logo.png" alt="HIMAYA" className="mx-auto h-10 w-auto" />
          <div className="mx-auto mt-4 h-px w-12 bg-metallicGold" />
          <h1 className="mt-5 font-heading text-[1.4rem] font-bold text-deepNavy">Admin Login</h1>
          <p className="mt-2 text-[0.82rem] text-mutedText">HIMAYA internal access only.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label className="mb-1 block text-xs font-semibold text-deepNavy">Email</label>
            <input type="email" className="w-full rounded-md border border-deepNavy/12 px-3 py-2.5 text-sm" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-dangerRed">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-deepNavy">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border border-deepNavy/12 px-3 py-2.5 pr-10 text-sm"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-mutedText"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-dangerRed">{errors.password.message}</p>}
          </div>

          {configError && (
            <div className="flex items-start gap-2 rounded-md border border-warningAmber/30 bg-warningAmber/10 px-3 py-2.5 text-sm text-deepNavy">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-warningAmber" />
              <p>
                Auth is not configured. Add AUTH_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD_HASH to .env.local, run npm run auth:setup,
                then restart the dev server.
              </p>
            </div>
          )}

          {authError && !configError && (
            <div className="flex items-start gap-2 rounded-md border border-dangerRed/20 bg-dangerRed/5 px-3 py-2.5 text-sm text-dangerRed">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p>Incorrect email or password. Please try again.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-3 text-sm font-bold text-deepNavy disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-[0.72rem] leading-relaxed text-mutedText">
          This login is for HIMAYA administrators only. Not a client login.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-warmCream">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}

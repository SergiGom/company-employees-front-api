"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

import {
  loginSchema,
  LoginFormData,
} from "../schemas/login.schema";

import { useLogin } from "../hooks/use-login";

import { getProfile } from "../api/auth.api";

import { useAuth } from "../hooks/use-auth";

import { setToken } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();

  const { setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const { mutateAsync } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setIsSubmitting(true);

      const response =
        await mutateAsync(data);

      setToken(
        response.access_token
      );

      const profile =
        await getProfile();

      setUser(profile);

      toast.success(
        "Inicio de sesión exitoso"
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        "Correo o contraseña incorrectos"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Company Hub
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Inicia sesión para administrar
          compañías y empleados
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Correo
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              {...register("correo")}
              placeholder="correo@empresa.com"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
            />
          </div>

          {errors.correo && (
            <p className="mt-1 text-sm text-red-500">
              {errors.correo.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Contraseña
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...register(
                "password"
              )}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Ingresando..."
            : "Iniciar sesión"}
        </button>

        <div className="text-center text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
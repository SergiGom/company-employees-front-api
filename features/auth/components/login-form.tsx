"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

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

      setToken(response.access_token);

      const profile =
        await getProfile();

      setUser(profile);

      toast.success(
        "Inicio de sesión exitoso"
      );

      router.push("/");
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
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Company Employees
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Inicia sesión para continuar
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

          <input
            type="email"
            {...register("correo")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

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

          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

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
      </form>
    </div>
  );
}
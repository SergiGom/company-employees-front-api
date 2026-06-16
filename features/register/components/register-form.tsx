"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  registerSchema,
  RegisterFormValues,
} from "../schemas/register.schema";

import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const { mutateAsync } =
    useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver:
      zodResolver(registerSchema),
  });

  const onSubmit = async (
    values: RegisterFormValues
  ) => {
    try {
      setIsSubmitting(true);

      await mutateAsync({
        correo: values.correo,
        password:
          values.password,
        role: values.role,
        ciudad:
          values.ciudad,
      });

      toast.success(
        "Cuenta creada correctamente"
      );

      router.push("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        "No fue posible crear la cuenta"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Company Hub
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Crea tu cuenta
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
              {
                errors.correo
                  .message
              }
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
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirmar contraseña
          </label>

          <input
            type="password"
            {...register(
              "confirmPassword"
            )}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors
                  .confirmPassword
                  .message
              }
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Ciudad
          </label>

          <select
            {...register("ciudad")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">
              Seleccione una ciudad
            </option>

            <option value="MEDELLIN">
              Medellín
            </option>

            <option value="BOGOTA">
              Bogotá
            </option>

          </select>

          {errors.ciudad && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors.ciudad
                  .message
              }
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Rol
          </label>

          <select
            {...register("role")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">
              Seleccione un rol
            </option>

            <option value="ADMIN">
              Admin
            </option>

          </select>

          {errors.role && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors.role
                  .message
              }
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Creando cuenta..."
            : "Crear cuenta"}
        </button>

        <div className="text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600"
          >
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
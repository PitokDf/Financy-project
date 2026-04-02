"use client"

import { FormFieldConfig, ReusableForm } from "@/components/ui/reuseable-form";
import { useRegister } from "@/hooks/use-auth";
import { RegisterFormValues, RegisterSchema } from "@/schemas/auth-schema";
import Link from "next/link";
import { useCallback, useState } from "react";

const fields: FormFieldConfig<RegisterFormValues>[] = [
    {
        name: "name",
        label: "Nama",
        placeholder: "Contoh: Jono Iskandar",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "user@email.com",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password minimal 6"
    },
    {
        name: "confirmPassword",
        label: "Konfirmasi Password",
        type: "password",
        placeholder: "Masukkan konfirmasi password"
    },

]

export function RegisterForm() {
    const [successMessage, setSuccessMessage] = useState("")
    const [formKey, setFormKey] = useState(1)
    const { mutateAsync } = useRegister()

    const handleSubmit = useCallback(async (data: RegisterFormValues) => {
        await mutateAsync({
            name: data.name,
            email: data.email,
            password: data.password
        })

        setSuccessMessage("Akun berhasil dibuat. Silakan login untuk melanjutkan.")
        setFormKey(prev => prev + 1)
    }, [mutateAsync])

    return (
        <>
            {successMessage && (
                <p className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-500">
                    {successMessage}
                </p>
            )}

            {successMessage && (
                <Link
                    href="/auth/login"
                    className="mb-4 block rounded-md border px-3 py-2 text-center text-sm font-medium hover:bg-muted"
                >
                    Lanjut ke halaman login
                </Link>
            )}

            <ReusableForm
                key={formKey}
                fields={fields}
                onSubmit={handleSubmit}
                schema={RegisterSchema}
                submitText="Buat Akun"
                loadingText="Memproses..."
            />
        </>
    )
}

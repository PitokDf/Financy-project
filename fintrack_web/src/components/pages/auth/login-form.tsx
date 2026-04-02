"use client"

import { FormFieldConfig, ReusableForm } from "@/components/ui/reuseable-form";
import { useLogin } from "@/hooks/use-auth";
import { LoginFormValues, LoginSchema } from "@/schemas/auth-schema";
import { getCurrentUser } from "@/service/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter, useSearchParams } from "next/navigation";

const fields: FormFieldConfig<LoginFormValues>[] = [
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
    }
]

export function LoginForm() {
    const { mutateAsync } = useLogin()
    const setSession = useAuthStore(s => s.setSession)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrlParam = searchParams.get(`callbackUrl`) ?? `/home`
    const isInternalPath = callbackUrlParam.startsWith('/')
    const isAuthPath = callbackUrlParam.startsWith('/auth')
    const callbackUrl = isInternalPath && !isAuthPath ? callbackUrlParam : '/home'

    const handleLogin = async (values: LoginFormValues) => {
        await mutateAsync(values)
        const user = await getCurrentUser()

        if (user) {
            setSession(user)
        }

        router.replace(callbackUrl)
    }

    return (
        <ReusableForm
            fields={fields}
            onSubmit={handleLogin}
            schema={LoginSchema}
            submitText="Masuk"
            loadingText="Memproses..."
        />
    )
}

import { LoginFormValues, RegisterFormValues } from "@/schemas/auth-schema";
import { saveAccessToken, saveRefreshToken } from "@/lib/auth-token";
import { loginService, registerService } from "@/service/auth-service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: LoginFormValues) => await loginService(payload),
        onSuccess: (result) => {
            saveAccessToken(result.accessToken)
            saveRefreshToken(result.refreshToken)
        },
        mutationKey: ['login-mutation']
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: Omit<RegisterFormValues, 'confirmPassword'>) => {
            await registerService(payload)
        },
        mutationKey: ['register-mutation']
    })
}
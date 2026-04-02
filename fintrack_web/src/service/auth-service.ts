import { ApiResponse, api } from "@/api/client"
import { LoginFormValues, RegisterFormValues } from "@/schemas/auth-schema"

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

export interface SessionUser {
    id: string;
    email: string;
    name: string;
    role: string;
}

export const loginService = async (data: LoginFormValues) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", data)
    return response.data.data
}

export const getCurrentUser = async () => {
    const response = await api.get<ApiResponse<SessionUser>>('/auth/me')
    return response.data.data
}

export const registerService = async (data: Omit<RegisterFormValues, `confirmPassword`>) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/register", data)
    return response.data.data
}
import { clearTokens, dispatchAuthLogout, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from '@/lib/auth-token'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + `/api/v1`,
    withCredentials: true
})

const rawApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + `/api/v1`,
    withCredentials: true
})

export interface ApiResponse<T = unknown> {
    success: boolean
    message: string
    data: T
    errors?: unknown
    path?: string
}

export interface ApiErrorResponse {
    success?: boolean
    message: string
    data?: unknown
    errors?: {
        path: string
        message: string
    }[]
    path?: string
}

export type ApiAxiosError = AxiosError<ApiErrorResponse>

interface RefreshTokenResponse {
    accessToken: string
    refreshToken: string
}

interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

api.interceptors.request.use(async (config) => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: ApiAxiosError) => {
        const originalRequest = error.config as RetryRequestConfig | undefined

        if (!originalRequest) {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const storedRefreshToken = getRefreshToken()
                if (!storedRefreshToken) {
                    clearTokens()
                    dispatchAuthLogout()
                    return Promise.reject(error)
                }

                const refreshResult = await rawApi.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
                    refreshToken: storedRefreshToken
                })

                const tokens = refreshResult.data.data
                saveAccessToken(tokens.accessToken)
                saveRefreshToken(tokens.refreshToken)
                originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                clearTokens()
                dispatchAuthLogout()
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
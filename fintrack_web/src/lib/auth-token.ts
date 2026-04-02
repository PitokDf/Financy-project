const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const hasWindow = () => typeof window !== 'undefined'

export const saveAccessToken = (token: string) => {
    if (!hasWindow()) return
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const saveRefreshToken = (token: string) => {
    if (!hasWindow()) return
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export const getAccessToken = () => {
    if (!hasWindow()) return null
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
    if (!hasWindow()) return null
    return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const clearTokens = () => {
    if (!hasWindow()) return
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const dispatchAuthLogout = () => {
    if (!hasWindow()) return
    window.dispatchEvent(new Event('auth:logout'))
}

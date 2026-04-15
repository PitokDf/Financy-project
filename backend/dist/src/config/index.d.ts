export declare const config: {
    readonly PORT: number;
    readonly NODE_ENV: string;
    readonly CLIENT_URL: string;
    readonly BASE_URL: string;
    readonly ML_SERVICE_URL: string;
    readonly JWT_SECRET: string;
    readonly JWT_ISSUER: string;
    readonly SERVICE: string;
    readonly isProduction: boolean;
    readonly COOKIES_DOMAIN: string;
    readonly TOKEN_SET_IN: "cookie" | "header";
    readonly rateLimit: {
        readonly WINDOW_MS: number;
        readonly MAX: number;
    };
    readonly UPLOAD_MAX_SIZE: number;
    readonly UPLOAD_DIR: string;
    readonly CACHE_TTL: number;
    readonly CACHE_CHECK_PERIOD: number;
    readonly ALLOWED_ORIGINS: string[];
    readonly HEALTH_CHECK_TIMEOUT: number;
};
//# sourceMappingURL=index.d.ts.map
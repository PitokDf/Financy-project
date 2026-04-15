"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const config_1 = require("../config");
class Auth {
    static setTokenCookieHttpOnly(res, token, expiresIn) {
        let maxAge;
        switch (expiresIn?.unit) {
            case "m":
                maxAge = expiresIn.duration * 60 * 1000;
                break;
            case "h":
                maxAge = expiresIn.duration * 60 * 60 * 1000;
                break;
            case "d":
                maxAge = expiresIn.duration * 24 * 60 * 60 * 1000;
                break;
            case "w":
                maxAge = expiresIn.duration * 7 * 24 * 60 * 60 * 1000;
                break;
            case "infinity":
                maxAge = 10 * 365 * 24 * 60 * 60 * 1000;
                break;
            default: maxAge = 24 * 60 * 60 * 1000;
        }
        res.cookie("token", token, {
            httpOnly: true,
            secure: config_1.config.NODE_ENV === 'production',
            sameSite: config_1.config.NODE_ENV === 'production' ? "none" : "lax",
            domain: config_1.config.NODE_ENV === 'production' ? config_1.config.COOKIES_DOMAIN : undefined,
            maxAge,
            path: "/",
        });
    }
    static clearTokenCookieHttpOnly(res) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: config_1.config.NODE_ENV === 'production',
            sameSite: config_1.config.NODE_ENV === 'production' ? 'none' : 'lax',
            domain: config_1.config.NODE_ENV === 'production' ? config_1.config.COOKIES_DOMAIN : undefined,
            path: '/'
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map
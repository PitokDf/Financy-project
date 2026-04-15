"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const config_1 = require("../config");
const message_1 = require("../constants/message");
const utils_1 = require("../utils");
const auth_1 = require("../utils/auth");
function authMiddleware(req, res, next) {
    const authCookie = req.cookies;
    const authHeader = req.headers.authorization;
    if ((!authCookie && config_1.config.TOKEN_SET_IN == "cookie") || ((!authHeader || !authHeader?.startsWith("Bearer ")) && config_1.config.TOKEN_SET_IN == "header")) {
        return utils_1.ResponseUtil.forbidden(res, message_1.Messages.FORBIDDEN);
    }
    try {
        let token;
        switch (config_1.config.TOKEN_SET_IN) {
            case "cookie":
                token = authCookie.token;
                break;
            case "header":
                token = authHeader?.split(" ")[1];
                break;
        }
        const today = Math.floor(new Date().getTime() / 1000);
        const decoded = utils_1.JwtUtil.verify(token);
        const isExpirytoken = today > decoded.exp;
        if (isExpirytoken)
            auth_1.Auth.clearTokenCookieHttpOnly(res);
        req.auth_user = decoded;
        return next();
    }
    catch (err) {
        console.error(err);
        return utils_1.ResponseUtil.forbidden(res, "Invalid or expired token");
    }
}
//# sourceMappingURL=auth.middleware.js.map
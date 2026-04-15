"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.JwtUtil = {
    generate(payload, expiresIn = '1D') {
        return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn,
            issuer: config_1.config.JWT_ISSUER
        });
    },
    verify(token) {
        return jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET, {
            algorithms: ["HS256"],
            issuer: config_1.config.JWT_ISSUER
        });
    },
    decode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
};
//# sourceMappingURL=jwt.js.map
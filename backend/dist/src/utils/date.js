"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const date_fns_1 = require("date-fns");
exports.DateUtil = {
    now() {
        return new Date().toISOString();
    },
    formatDate(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
        return (0, date_fns_1.format)(date, fmt);
    }
};
//# sourceMappingURL=date.js.map
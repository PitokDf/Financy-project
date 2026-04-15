"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const user_setting_service_1 = require("../service/user-setting.service");
const utils_1 = require("../utils");
class UserSettingController {
}
exports.UserSettingController = UserSettingController;
_a = UserSettingController;
UserSettingController.getSettings = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.auth_user.user_id;
    const settings = await user_setting_service_1.UserSettingService.getSettings(userId);
    return utils_1.ResponseUtil.success(res, settings);
});
UserSettingController.updateSettings = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.auth_user.user_id;
    const data = req.body;
    console.log(data);
    const settings = await user_setting_service_1.UserSettingService.updateSettings(userId, data);
    return utils_1.ResponseUtil.success(res, settings);
});
//# sourceMappingURL=user-setting.controller.js.map
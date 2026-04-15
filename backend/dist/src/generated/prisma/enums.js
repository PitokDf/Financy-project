"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.NotificationType = exports.BudgetPeriod = exports.TransactionSource = exports.TransactionType = exports.ChallengeType = void 0;
exports.ChallengeType = {
    WEEKLY_TRANSACTIONS: 'WEEKLY_TRANSACTIONS',
    MONTHLY_SAVINGS: 'MONTHLY_SAVINGS',
    BUDGET_GOALS: 'BUDGET_GOALS',
    ANALYSIS_COUNT: 'ANALYSIS_COUNT',
    STREAK_MAINTAIN: 'STREAK_MAINTAIN'
};
exports.TransactionType = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE'
};
exports.TransactionSource = {
    MANUAL: 'MANUAL',
    CSV_IMPORT: 'CSV_IMPORT',
    API: 'API'
};
exports.BudgetPeriod = {
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY'
};
exports.NotificationType = {
    BUDGET_ALERT: 'BUDGET_ALERT',
    PATTERN_FOUND: 'PATTERN_FOUND',
    ACHIEVEMENT: 'ACHIEVEMENT',
    LEVEL_UP: 'LEVEL_UP',
    REMINDER: 'REMINDER',
    STREAK_WARNING: 'STREAK_WARNING',
    CHALLENGE_COMPLETE: 'CHALLENGE_COMPLETE'
};
exports.ActivityType = {
    TRANSACTION: 'TRANSACTION',
    ANALYSIS: 'ANALYSIS',
    BUDGET: 'BUDGET',
    ACHIEVEMENT: 'ACHIEVEMENT',
    CATEGORY: 'CATEGORY',
    EXPORT: 'EXPORT',
    IMPORT: 'IMPORT',
    SETTINGS: 'SETTINGS'
};
//# sourceMappingURL=enums.js.map
export declare const ChallengeType: {
    readonly WEEKLY_TRANSACTIONS: "WEEKLY_TRANSACTIONS";
    readonly MONTHLY_SAVINGS: "MONTHLY_SAVINGS";
    readonly BUDGET_GOALS: "BUDGET_GOALS";
    readonly ANALYSIS_COUNT: "ANALYSIS_COUNT";
    readonly STREAK_MAINTAIN: "STREAK_MAINTAIN";
};
export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType];
export declare const TransactionType: {
    readonly INCOME: "INCOME";
    readonly EXPENSE: "EXPENSE";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const TransactionSource: {
    readonly MANUAL: "MANUAL";
    readonly CSV_IMPORT: "CSV_IMPORT";
    readonly API: "API";
};
export type TransactionSource = (typeof TransactionSource)[keyof typeof TransactionSource];
export declare const BudgetPeriod: {
    readonly WEEKLY: "WEEKLY";
    readonly MONTHLY: "MONTHLY";
    readonly YEARLY: "YEARLY";
};
export type BudgetPeriod = (typeof BudgetPeriod)[keyof typeof BudgetPeriod];
export declare const NotificationType: {
    readonly BUDGET_ALERT: "BUDGET_ALERT";
    readonly PATTERN_FOUND: "PATTERN_FOUND";
    readonly ACHIEVEMENT: "ACHIEVEMENT";
    readonly LEVEL_UP: "LEVEL_UP";
    readonly REMINDER: "REMINDER";
    readonly STREAK_WARNING: "STREAK_WARNING";
    readonly CHALLENGE_COMPLETE: "CHALLENGE_COMPLETE";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const ActivityType: {
    readonly TRANSACTION: "TRANSACTION";
    readonly ANALYSIS: "ANALYSIS";
    readonly BUDGET: "BUDGET";
    readonly ACHIEVEMENT: "ACHIEVEMENT";
    readonly CATEGORY: "CATEGORY";
    readonly EXPORT: "EXPORT";
    readonly IMPORT: "IMPORT";
    readonly SETTINGS: "SETTINGS";
};
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];
//# sourceMappingURL=enums.d.ts.map
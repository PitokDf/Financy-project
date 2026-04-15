"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.NullableJsonNullValueInput = exports.SortOrder = exports.PushSubscriptionScalarFieldEnum = exports.ReminderConfigScalarFieldEnum = exports.UserSettingScalarFieldEnum = exports.AnalysisRunScalarFieldEnum = exports.CategoryFeedbackEventScalarFieldEnum = exports.RecommendationLogScalarFieldEnum = exports.ForecastScalarFieldEnum = exports.ForecastCacheScalarFieldEnum = exports.ExportLogScalarFieldEnum = exports.CsvImportScalarFieldEnum = exports.ActivityLogScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.ClusterScalarFieldEnum = exports.BudgetGoalScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.TransactionScalarFieldEnum = exports.UserChallengeScalarFieldEnum = exports.ChallengeScalarFieldEnum = exports.UserBadgeScalarFieldEnum = exports.BadgeScalarFieldEnum = exports.UserStatsScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    UserStats: 'UserStats',
    Badge: 'Badge',
    UserBadge: 'UserBadge',
    Challenge: 'Challenge',
    UserChallenge: 'UserChallenge',
    Transaction: 'Transaction',
    Category: 'Category',
    BudgetGoal: 'BudgetGoal',
    Cluster: 'Cluster',
    Notification: 'Notification',
    ActivityLog: 'ActivityLog',
    CsvImport: 'CsvImport',
    ExportLog: 'ExportLog',
    ForecastCache: 'ForecastCache',
    Forecast: 'Forecast',
    RecommendationLog: 'RecommendationLog',
    CategoryFeedbackEvent: 'CategoryFeedbackEvent',
    AnalysisRun: 'AnalysisRun',
    UserSetting: 'UserSetting',
    ReminderConfig: 'ReminderConfig',
    PushSubscription: 'PushSubscription'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserStatsScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    xp: 'xp',
    level: 'level',
    streak: 'streak',
    longestStreak: 'longestStreak',
    lastTransactionAt: 'lastTransactionAt',
    totalTransactions: 'totalTransactions',
    totalIncome: 'totalIncome',
    totalExpense: 'totalExpense',
    hasExported: 'hasExported',
    hasAnalyzed: 'hasAnalyzed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BadgeScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    condition: 'condition',
    xpReward: 'xpReward',
    color: 'color',
    createdAt: 'createdAt'
};
exports.UserBadgeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    badgeId: 'badgeId',
    unlockedAt: 'unlockedAt'
};
exports.ChallengeScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    target: 'target',
    xpReward: 'xpReward',
    type: 'type',
    createdAt: 'createdAt'
};
exports.UserChallengeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    challengeId: 'challengeId',
    current: 'current',
    isCompleted: 'isCompleted',
    completedAt: 'completedAt',
    deadline: 'deadline',
    weekNumber: 'weekNumber',
    year: 'year',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    description: 'description',
    amount: 'amount',
    type: 'type',
    date: 'date',
    categoryId: 'categoryId',
    clusterId: 'clusterId',
    source: 'source',
    csvImportId: 'csvImportId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    color: 'color',
    icon: 'icon',
    type: 'type',
    isAutoGenerated: 'isAutoGenerated',
    aiConfidence: 'aiConfidence',
    aiKeywords: 'aiKeywords',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BudgetGoalScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    amount: 'amount',
    period: 'period',
    alertThreshold: 'alertThreshold',
    alertSent80: 'alertSent80',
    alertSent100: 'alertSent100',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ClusterScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    analysisRunId: 'analysisRunId',
    name: 'name',
    suggestedName: 'suggestedName',
    color: 'color',
    index: 'index',
    silhouetteScore: 'silhouetteScore',
    wcss: 'wcss',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    metadata: 'metadata',
    createdAt: 'createdAt',
    readAt: 'readAt'
};
exports.ActivityLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    type: 'type',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.CsvImportScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    filename: 'filename',
    rowCount: 'rowCount',
    successCount: 'successCount',
    errorCount: 'errorCount',
    createdAt: 'createdAt'
};
exports.ExportLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    format: 'format',
    status: 'status',
    month: 'month',
    year: 'year',
    fileUrl: 'fileUrl',
    fileSize: 'fileSize',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
};
exports.ForecastCacheScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    method: 'method',
    period: 'period',
    forecast: 'forecast',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ForecastScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    targetMonth: 'targetMonth',
    targetYear: 'targetYear',
    predictedAmount: 'predictedAmount',
    createdAt: 'createdAt'
};
exports.RecommendationLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    modelVariant: 'modelVariant',
    top1Correct: 'top1Correct',
    inTop3: 'inTop3',
    inputLatencyMs: 'inputLatencyMs',
    createdAt: 'createdAt'
};
exports.CategoryFeedbackEventScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    action: 'action',
    createdAt: 'createdAt'
};
exports.AnalysisRunScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    status: 'status',
    totalTransactions: 'totalTransactions',
    kOptimal: 'kOptimal',
    silhouetteScore: 'silhouetteScore',
    wcssValues: 'wcssValues',
    durationMs: 'durationMs',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
};
exports.UserSettingScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    pushNotifications: 'pushNotifications',
    budgetAlerts: 'budgetAlerts',
    dailyReminder: 'dailyReminder',
    reminderTime: 'reminderTime',
    currency: 'currency',
    language: 'language',
    showGamification: 'showGamification',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReminderConfigScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    isEnabled: 'isEnabled',
    reminderTime: 'reminderTime',
    reminderDays: 'reminderDays',
    lastReminderAt: 'lastReminderAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PushSubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    endpoint: 'endpoint',
    p256dh: 'p256dh',
    auth: 'auth',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map
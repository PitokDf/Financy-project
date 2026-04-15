import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userStats(): Prisma.UserStatsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get badge(): Prisma.BadgeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userBadge(): Prisma.UserBadgeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get challenge(): Prisma.ChallengeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userChallenge(): Prisma.UserChallengeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get transaction(): Prisma.TransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get budgetGoal(): Prisma.BudgetGoalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cluster(): Prisma.ClusterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get csvImport(): Prisma.CsvImportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get exportLog(): Prisma.ExportLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get forecastCache(): Prisma.ForecastCacheDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get forecast(): Prisma.ForecastDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recommendationLog(): Prisma.RecommendationLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get categoryFeedbackEvent(): Prisma.CategoryFeedbackEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get analysisRun(): Prisma.AnalysisRunDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userSetting(): Prisma.UserSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get reminderConfig(): Prisma.ReminderConfigDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pushSubscription(): Prisma.PushSubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map
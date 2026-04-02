import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.routes";
import transactionRouter from "./transaction.route";
import categoryRouter from "./category.route";
import budgetGoalRouter from "./budget-goal.route";
import reminderConfigRouter from "./reminder-config.route";
import notificationRouter from "./notification.route";
import importBatchRouter from "./import-batch.route";
import forecastRouter from "./forecast.route";
import exportLogRouter from "./export-log.route";

const apiRouter = Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/transactions', transactionRouter)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/budget-goals', budgetGoalRouter)
apiRouter.use('/reminder-config', reminderConfigRouter)
apiRouter.use('/notifications', notificationRouter)
apiRouter.use('/import-batches', importBatchRouter)
apiRouter.use('/forecasts', forecastRouter)
apiRouter.use('/export-logs', exportLogRouter)

export default apiRouter
import { Router } from "express";
import analysisRouter from "./analysis.route";
import userRouter from "./user.route";
import authRouter from "./auth.routes";
import authGoogleRouter from "./auth-google.routes";
import transactionRouter from "./transaction.route";
import gamificationRouter from "./gamification.route";
import dashboardRouter from "./dashboard.route";
import categoryRouter from "./category.route";
import notificationRouter from "./notification.routes";
import pushRouter from "./push.route";
import budgetRouter from "./budget.route";
import forecastRouter from "./forecast.route";
import exportRouter from "./export.route";

const apiRouter = Router()

apiRouter.use('/analysis', analysisRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/auth/google', authGoogleRouter)
apiRouter.use('/transactions', transactionRouter)
apiRouter.use('/gamification', gamificationRouter)
apiRouter.use('/dashboard', dashboardRouter)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/notifications', notificationRouter)
apiRouter.use('/push', pushRouter)
apiRouter.use('/budgets', budgetRouter)
apiRouter.use('/forecast', forecastRouter)
apiRouter.use('/export', exportRouter)

export default apiRouter
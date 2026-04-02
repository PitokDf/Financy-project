import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.routes";
import transactionRouter from "./transaction.route";

const apiRouter = Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/transactions', transactionRouter)

export default apiRouter
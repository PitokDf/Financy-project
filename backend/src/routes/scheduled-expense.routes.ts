import { Router } from "express";
import authMiddleware from "@/middleware/auth.middleware";
import { ScheduledExpenseController } from "@/controller/scheduled-expense.controller";

const router = Router();
const controller = new ScheduledExpenseController();

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/approve', controller.approve);

export default router;

import Router from "express-promise-router";
import ItemsRouter from "./items.router";
import errorHandler from "../middlewares/errorHandler.middleware";

const router = Router();

router.use("/", ItemsRouter);

// Error Handler Middleware
router.use(errorHandler);

export default router;

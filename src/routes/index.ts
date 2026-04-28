import { Router } from "express";

import { healthRouter } from "./health.routes";
import { meRouter } from "./me.routes";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/me", meRouter);

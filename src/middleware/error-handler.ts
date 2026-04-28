import type { ErrorRequestHandler } from "express";

import { env } from "../config/env";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error(error.message, error);

  const statusCode = typeof error.status === "number" && error.status >= 400 ? error.status : 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error" : error.message,
    ...(env.NODE_ENV === "development" ? { stack: error.stack } : {})
  });
};

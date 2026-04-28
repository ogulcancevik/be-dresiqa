import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed. Check MONGODB_URI and Atlas Network Access/IP allowlist.", {
      message: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}

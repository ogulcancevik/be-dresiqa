import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";

const RECONNECT_INTERVAL_MS = 30000;
let reconnectTimer: NodeJS.Timeout | null = null;

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    clearReconnectTimer();
    logger.info("MongoDB connected");
    return true;
  } catch (error) {
    logger.error("MongoDB connection failed. Check MONGODB_URI and Atlas Network Access/IP allowlist.", {
      message: error instanceof Error ? error.message : String(error)
    });
    return false;
  }
}

export function scheduleDatabaseReconnect() {
  if (reconnectTimer) {
    return;
  }

  reconnectTimer = setInterval(async () => {
    if (mongoose.connection.readyState === 1) {
      clearReconnectTimer();
      return;
    }

    logger.info("Retrying MongoDB connection...");
    await connectDatabase();
  }, RECONNECT_INTERVAL_MS);
}

export async function disconnectDatabase() {
  clearReconnectTimer();
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}

function clearReconnectTimer() {
  if (!reconnectTimer) {
    return;
  }

  clearInterval(reconnectTimer);
  reconnectTimer = null;
}

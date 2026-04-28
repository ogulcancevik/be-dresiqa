import { createServer } from "node:http";

import { createApp } from "./app";
import { connectDatabase, disconnectDatabase, scheduleDatabaseReconnect } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger";

async function bootstrap() {
  logger.info("Starting server", {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    hasMongoUri: Boolean(env.MONGODB_URI),
    hasClerkSecretKey: Boolean(env.CLERK_SECRET_KEY),
    corsOrigins: env.CORS_ORIGIN
  });

  const isDatabaseConnected = await connectDatabase();

  if (!isDatabaseConnected) {
    logger.warn("Server will start without MongoDB. Health check will report database as disconnected.");
    scheduleDatabaseReconnect();
  }

  const app = createApp();
  const server = createServer(app);

  server.on("error", (error) => {
    logger.error("HTTP server failed", error);
    process.exit(1);
  });

  server.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal: NodeJS.Signals) => {
    logger.info(`${signal} received. Shutting down...`);

    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  logger.error("Server failed to start", error);
  process.exit(1);
});

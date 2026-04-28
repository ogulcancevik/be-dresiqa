export const logger = {
  info(message: string, meta?: unknown) {
    console.info(formatMessage("info", message), meta ?? "");
  },
  warn(message: string, meta?: unknown) {
    console.warn(formatMessage("warn", message), meta ?? "");
  },
  error(message: string, meta?: unknown) {
    console.error(formatMessage("error", message), meta ?? "");
  }
};

function formatMessage(level: string, message: string) {
  return `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`;
}

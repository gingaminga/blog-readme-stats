import { LOG, PROJECT } from "@utils/constants";
import colors from "ansi-colors";
import path from "node:path";
import winston from "winston";
import WinstonDailyLog from "winston-daily-rotate-file";

const { combine, label, printf, splat, timestamp } = winston.format;

const logFormat = printf((info) => {
  const { label: logLabel, level: logLevel, message: logMessage, timestamp: logTimestamp } = info;

  let message = logMessage;
  let level = logLevel;

  switch (logLevel) {
    case LOG.LEVEL.DEBUG: {
      level = colors.grey(logLevel);
      message = colors.grey(String(logMessage));

      break;
    }
    case LOG.LEVEL.ERROR: {
      level = colors.red(logLevel);
      message = colors.red(String(logMessage));

      break;
    }
    case LOG.LEVEL.HTTP: {
      break;
    }
    case LOG.LEVEL.SILLY: {
      break;
    }
    case LOG.LEVEL.VERBOSE: {
      break;
    }
    case LOG.LEVEL.WARN: {
      level = colors.yellow(logLevel);
      message = colors.yellow(String(logMessage));

      break;
    }
    default: {
      break;
    }
  }

  return `[${colors.bgRedBright(String(logLabel))}] ${colors.whiteBright(String(logTimestamp))} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), label({ label: PROJECT.NAME }), splat(), logFormat),
  transports: [
    new winston.transports.Console({ level: PROJECT.NODE_ENV === "production" ? LOG.LEVEL.INFO : LOG.LEVEL.DEBUG }),
    new WinstonDailyLog({
      datePattern: "YYYYMMDD",
      dirname: path.resolve(__dirname, LOG.PATH),
      filename: `%DATE%_out.log`,
      level: PROJECT.NODE_ENV === "production" ? LOG.LEVEL.INFO : LOG.LEVEL.DEBUG,
      maxFiles: LOG.MAX_COUNT,
      maxSize: LOG.MAX_SIZE,
      zippedArchive: PROJECT.NODE_ENV !== "development",
    }),
  ],
});

export default logger;

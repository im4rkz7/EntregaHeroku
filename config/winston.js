import winston from "winston";

const buildLogger = () => {
  const prodLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
  // console.log(1);
  return prodLogger;
};

export const logger = buildLogger();

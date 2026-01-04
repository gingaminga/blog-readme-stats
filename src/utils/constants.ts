export const PROJECT = {
  NAME: process.env.PROJECT_NAME || "SAMPLE",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 3001), // 서버 포트
};

export const LOG = {
  LEVEL: {
    DEBUG: "debug",
    ERROR: "error",
    HTTP: "http",
    INFO: "info",
    SILLY: "silly",
    VERBOSE: "verbose",
    WARN: "warn",
  },
  MAX_COUNT: Number(process.env.LOG_MAX_COUNT || 10),
  MAX_SIZE: Number(process.env.LOG_MAX_SIZE || "10m"),
  PATH: process.env.LOG_PATH || "../../logs",
};

export const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  INVALID_VALUE: 422,
  NOT_FOUND: 404,
  OK: 200,
  UNAUTHORIZED: 401,
};

export const SSL = {
  CERT: {
    CA_PATH_AND_FILE: process.env.SSL_CA_PATH_AND_FILE || "",
    CERT_PATH_AND_FILE: process.env.SSL_CERT_PATH_AND_FILE || "",
    KEY_PATH_AND_FILE: process.env.SSL_KEY_PATH_AND_FILE || "",
  },
  PFX: {
    PASSWORD: process.env.SSL_PFX_PASSWORD || "",
    PFX_PATH_AND_FILE: process.env.SSL_PFX_PATH_AND_FILE || "",
  },
  TYPE: process.env.SSL_TYPE || "",
  USED: process.env.HTTPS === "true",
};

export const CORS_CONFIG = {
  credentials: true,
  origin: "*",
};

export const RESPONSE_STATUS = {
  FAILURE: "failure",
  SUCCESS: "success",
};

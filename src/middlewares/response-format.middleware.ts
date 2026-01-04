import logger from "@config/logger.config";
import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import { getResponseFormat } from "@utils/format";
import { NextFunction, Request, Response } from "express";

/**
 * @description 커스텀 응답 함수를 정의하는 미들웨어
 */
export default (req: Request, res: Response, next: NextFunction) => {
  res.result = (data) => {
    let code = HTTP_STATUS_CODE.OK;

    switch (req.method) {
      case "POST":
      case "PUT": {
        code = HTTP_STATUS_CODE.CREATED;
        break;
      }
      default: {
        break;
      }
    }

    res.status(code).json(getResponseFormat(true, data));
  };

  res.error = (code, errorMessage, data) => {
    let responseMessage = ERROR_MESSAGE.INTERNAL_SERVER_ERROR;

    switch (code) {
      case HTTP_STATUS_CODE.BAD_REQUEST: {
        responseMessage = ERROR_MESSAGE.BAD_REQUEST;
        break;
      }
      case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
        responseMessage = ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
        break;
      }
      case HTTP_STATUS_CODE.INVALID_VALUE: {
        responseMessage = ERROR_MESSAGE.INVALID_VALUE;
        break;
      }
      case HTTP_STATUS_CODE.NOT_FOUND: {
        responseMessage = ERROR_MESSAGE.NOT_FOUND;
        break;
      }
      case HTTP_STATUS_CODE.UNAUTHORIZED: {
        responseMessage = ERROR_MESSAGE.UNAUTHORIZED;
        break;
      }
      default: {
        break;
      }
    }

    const { stack } = new CError(errorMessage, code);
    logger.error(stack);

    const response = {
      ...data,
      message: responseMessage,
    };

    res.status(code).json(getResponseFormat(false, response));
  };

  next();
};

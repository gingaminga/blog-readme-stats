import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import { NextFunction, Request, Response } from "express";
import { isError } from "joi";

/**
 * @description error handler 미들웨어
 */
export default (error: unknown, _req: Request, res: Response, _: NextFunction) => {
  if (isError(error)) {
    // validation 에러 처리
    const errorMessage = `${ERROR_MESSAGE.INVALID_VALUE} ${error.message}`;
    res.error(HTTP_STATUS_CODE.INVALID_VALUE, errorMessage);

    return;
  }

  const { code, data, message } = new CError(error);

  const errorMessage = `Catched error with ${code} code.. ${message}`;
  res.error(code, errorMessage, data);
};

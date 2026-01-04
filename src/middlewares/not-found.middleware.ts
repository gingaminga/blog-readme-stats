import { HTTP_STATUS_CODE } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { Request, Response } from "express";

/**
 * @description 404 미들웨어
 */
export default (_req: Request, res: Response) => {
  res.error(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGE.NOT_FOUND);
};

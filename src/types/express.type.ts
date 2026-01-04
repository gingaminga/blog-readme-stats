import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * @description RequestHandler + DTO 커스텀
 */
export type RequestDTOHandler<T = unknown> = (
  req: Request,
  res: {
    locals: {
      requestDTO: T;
    } & Response["locals"];
  } & Response,
  next: NextFunction,
) => ReturnType<RequestHandler>;

/**
 * @description Response + DTO 커스텀
 */
export type ResponseDTO<T = unknown> = {
  locals: { requestDTO: T } & Record<string, any>;
} & Response<any, Record<string, any>>;

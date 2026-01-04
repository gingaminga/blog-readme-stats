import errorHandlerMiddleware from "@middlewares/error-handler.middleware";
import { HTTP_STATUS_CODE } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { Request, Response } from "express";
import Joi from "joi";

describe(`Error handler middleware test :)`, () => {
  const req = {} as Request;
  const res = {
    error: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  it(`should be ${HTTP_STATUS_CODE.INVALID_VALUE} error.`, () => {
    // given
    const error = new Error("Validate error!");
    const errorMessage = `${ERROR_MESSAGE.INVALID_VALUE} ${error.message}`;
    jest.spyOn(Joi, "isError").mockReturnValue(true);

    // when
    errorHandlerMiddleware(error, req, res, next);

    // then
    expect(res.error).toHaveBeenCalled();
    expect(res.error).toHaveBeenCalledWith(HTTP_STATUS_CODE.INVALID_VALUE, errorMessage);
  });

  it(`should be ${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} error.`, () => {
    // given
    const error = new Error("Internal server error!");
    const errorMessage = `Catched error with ${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} code.. ${error.message}`;
    jest.spyOn(Joi, "isError").mockReturnValue(false);

    // when
    errorHandlerMiddleware(error, req, res, next);

    // then
    expect(res.error).toHaveBeenCalled();
    expect(res.error).toHaveBeenCalledWith(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, errorMessage, undefined);
  });
});

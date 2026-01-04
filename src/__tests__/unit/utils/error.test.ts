import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";

const errorMessage = "Test error message..";

describe(`CError class test :)`, () => {
  it("should create a CError instance setting error message.", () => {
    const error = new CError(errorMessage);

    expect(error.message).toBe(errorMessage);
    expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should create a CError instance from a different error object.", () => {
    const originalError = new Error(errorMessage);
    const error = new CError(originalError);

    expect(error.message).toBe(originalError.message);
    expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should create a CError instance from a different cerror object.", () => {
    const originError = new CError(errorMessage);
    const error = new CError(originError);

    expect(error.message).toBe(originError.message);
    expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should create a CError instance setting http status code.", () => {
    const notFoundCode = HTTP_STATUS_CODE.NOT_FOUND;
    const error = new CError(errorMessage, notFoundCode);

    expect(error.message).toBe(errorMessage);
    expect(error.code).toBe(notFoundCode);
  });

  it("should create a CError instance from unknwon error.", () => {
    const unknownObject = { what: "Unknown error.." };
    const error = new CError(unknownObject);

    expect(error.message).toBe(ERROR_MESSAGE.UNKNOWN_ERROR);
    expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should create a CError instance from custom info.", () => {
    const data = {
      code: "ERROR01",
    };
    const error = new CError(errorMessage, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data);

    expect(error.message).toBe(errorMessage);
    expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    expect(error.data).toBe(data);
  });
});

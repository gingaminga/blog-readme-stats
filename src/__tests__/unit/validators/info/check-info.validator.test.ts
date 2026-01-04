import CheckInfoParamDTO from "@dto/info/check-info.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { checkInfoSchema, checkInfoValidator } from "@validators/info/check-info.validator";
import { Request } from "express";

describe(`Check info validator test :)`, () => {
  const req = {
    query: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<CheckInfoParamDTO>;
  const next = jest.fn();
  const memory = true;
  const name = true;
  const uptime = true;

  beforeEach(() => {
    res.locals.requestDTO = new CheckInfoParamDTO({});
  });

  it(`should be invalidate.`, async () => {
    // given
    const error = new Error("Invalidate params");
    jest.spyOn(checkInfoSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await checkInfoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    const params = { memory, name, uptime };
    const dto = new CheckInfoParamDTO(params);
    jest.spyOn(checkInfoSchema, "validateAsync").mockResolvedValue(dto);

    // when
    await checkInfoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

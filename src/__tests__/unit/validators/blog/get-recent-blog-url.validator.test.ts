import GetRecentBlogUrlParamDTO from "@dto/blog/get-recent-blog-url.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { getRecentBlogUrlSchema, getRecentBlogUrlValidator } from "@validators/blog/get-recent-blog-url.validator";
import { Request } from "express";

describe("Get recent blog url validator test :)", () => {
  const req = {
    query: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<GetRecentBlogUrlParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    res.locals.requestDTO = new GetRecentBlogUrlParamDTO({ url: "" });
    jest.clearAllMocks();
  });

  it("should be invalidate when URL is missing", async () => {
    // given
    const error = new Error("URL is required");
    jest.spyOn(getRecentBlogUrlSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getRecentBlogUrlValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should be invalidate when URL is not a valid URI", async () => {
    // given
    const error = new Error("URL must be a valid uri");
    jest.spyOn(getRecentBlogUrlSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getRecentBlogUrlValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should be validate with valid URL", async () => {
    // given
    const params = { url: "https://example.com/feed" };
    const dto = new GetRecentBlogUrlParamDTO(params);
    jest.spyOn(getRecentBlogUrlSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogUrlValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

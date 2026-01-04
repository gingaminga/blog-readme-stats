import GetRecentBlogCardParamDTO from "@dto/blog/get-recent-blog-card.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { Theme } from "@my-types/params/blog.param.type";
import { getRecentBlogCardSchema, getRecentBlogCardValidator } from "@validators/blog/get-recent-blog-card.validator";
import { Request } from "express";

describe("Get recent blog card validator test :)", () => {
  const req = {
    query: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<GetRecentBlogCardParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    res.locals.requestDTO = new GetRecentBlogCardParamDTO({ url: "" });
    jest.clearAllMocks();
  });

  it("should be invalidate when URL is missing", async () => {
    // given
    const error = new Error("URL is required");
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getRecentBlogCardValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should be invalidate when URL is not a valid URI", async () => {
    // given
    const error = new Error("URL must be a valid uri");
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getRecentBlogCardValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should be invalidate when theme is invalid", async () => {
    // given
    const error = new Error("theme must be one of [light, dark]");
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getRecentBlogCardValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it("should be validate with only URL", async () => {
    // given
    const params = { url: "https://example.com/feed" };
    const dto = new GetRecentBlogCardParamDTO(params);
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogCardValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(res.locals.requestDTO.theme).toBeUndefined(); // 브라우저 테마 자동 감지
    expect(next).toHaveBeenCalled();
  });

  it("should be validate with URL and light theme", async () => {
    // given
    const params = { theme: Theme.LIGHT, url: "https://example.com/feed" };
    const dto = new GetRecentBlogCardParamDTO(params);
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogCardValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(res.locals.requestDTO.theme).toBe(Theme.LIGHT);
    expect(next).toHaveBeenCalled();
  });

  it("should be validate with URL and dark theme", async () => {
    // given
    const params = { theme: Theme.DARK, url: "https://example.com/feed" };
    const dto = new GetRecentBlogCardParamDTO(params);
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogCardValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(res.locals.requestDTO.theme).toBe(Theme.DARK);
    expect(next).toHaveBeenCalled();
  });

  it("should be validate with GitHub Pages RSS URL", async () => {
    // given
    const params = { url: "https://gingaminga.github.io/feed" };
    const dto = new GetRecentBlogCardParamDTO(params);
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogCardValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });

  it("should be validate with Tistory RSS URL", async () => {
    // given
    const params = { url: "https://dev-gingaminga.tistory.com/rss" };
    const dto = new GetRecentBlogCardParamDTO(params);
    jest.spyOn(getRecentBlogCardSchema, "validateAsync").mockResolvedValue(params);

    // when
    await getRecentBlogCardValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

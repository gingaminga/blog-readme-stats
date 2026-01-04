import app from "@app";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/blog/redirect";

describe(`GET ${path} API test :)`, () => {
  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it("should return 422 when URL is missing", async () => {
      // given
      const params = {};

      // when
      const { status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
    });

    it("should return 422 when URL is invalid", async () => {
      // given
      const params = {
        url: "invalid-url",
      };

      // when
      const { status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
    });
  });

  describe(`${HTTP_STATUS_CODE.BAD_REQUEST} test :)`, () => {
    it("should return 400 when URL is not a valid RSS feed", async () => {
      // given
      const params = {
        url: "https://www.google.com", // HTML page, not RSS
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.BAD_REQUEST });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    }, 10_000);

    it("should return 400 when URL returns non-RSS content", async () => {
      // given
      const params = {
        url: "https://httpbin.org/html", // Returns HTML
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.BAD_REQUEST });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    }, 10_000);

    it("should return 400 when domain is unreachable", async () => {
      // given
      const params = {
        url: "https://this-domain-definitely-does-not-exist-12345.com/rss",
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.BAD_REQUEST });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    }, 10_000);
  });

  describe(`${HTTP_STATUS_CODE.MOVED_PERMANENTLY} test :)`, () => {
    it("should redirect to the latest blog post URL", async () => {
      // given
      const params = {
        url: "https://dev-gingaminga.tistory.com/rss",
      };

      // when
      const response = await request(app).get(path).query(params).redirects(0);

      // then
      expect(response.status).toBe(HTTP_STATUS_CODE.MOVED_PERMANENTLY);
      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toContain("http");
    }, 15_000);

    it("should redirect to GitHub Pages blog post", async () => {
      // given
      const params = {
        url: "https://gingaminga.github.io/feed",
      };

      // when
      const response = await request(app).get(path).query(params).redirects(0);

      // then
      expect(response.status).toBe(HTTP_STATUS_CODE.MOVED_PERMANENTLY);
      expect(response.headers.location).toBeDefined();
      expect(response.headers.location).toMatch(/^https?:\/\//);
    }, 15_000);
  });
});

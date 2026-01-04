import app from "@app";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/blog/card";

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

    it("should return 422 when theme is invalid", async () => {
      // given
      const params = {
        theme: "invalid-theme",
        url: "https://example.com/feed",
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

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    it("should return SVG with light theme by default", async () => {
      // given
      const params = {
        url: "https://dev-gingaminga.tistory.com/rss",
      };

      // when
      const response = await request(app).get(path).query(params);

      // then
      expect(response.status).toBe(HTTP_STATUS_CODE.OK);
      const content = response.text || response.body.toString();
      expect(content).toContain("#ffffff");
      expect(content).toContain("https://www.google.com/s2/favicons?domain=");
      expect(content).toContain("<image");
    }, 15_000);

    it("should return SVG with dark theme", async () => {
      // given
      const params = {
        theme: "dark",
        url: "https://dev-gingaminga.tistory.com/rss",
      };

      // when
      const response = await request(app).get(path).query(params);

      // then
      expect(response.status).toBe(HTTP_STATUS_CODE.OK);
      const content = response.text || response.body.toString();
      expect(content).toContain("#202830");
      expect(content).toContain("https://www.google.com/s2/favicons?domain=");
      expect(content).toContain("<image");
    }, 15_000);
  });
});

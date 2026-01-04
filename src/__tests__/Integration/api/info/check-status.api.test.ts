import app from "@app";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/info";

describe(`POST ${path} API test :)`, () => {
  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should memory parameter invalid error.`, async () => {
      // given
      const params = {
        memory: 0,
        name: true,
        uptime: false,
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should name parameter invalid error.`, async () => {
      // given
      const params = {
        memory: true,
        name: false,
        uptime: "",
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should uptime parameter invalid error.`, async () => {
      // given
      const params = {
        memory: true,
        name: false,
        uptime: "",
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    it(`should respond with an empty object.`, async () => {
      // given
      const params = {};

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual({});
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should respond with the maximum`, async () => {
      // given
      const params = {
        memory: true,
        name: true,
        uptime: true,
      };

      // when
      const { body, status } = await request(app).get(path).query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual({
        freeMemory: expect.any(Number),
        hostName: expect.any(String),
        totalMemory: expect.any(Number),
        uptime: expect.any(Number),
      });
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});

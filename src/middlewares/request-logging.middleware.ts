import logger from "@config/logger.config";
import colors from "ansi-colors";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import onFinished from "on-finished";

/**
 * @description 파라미터에 대한 정보 가져오기
 * @param query query params
 * @param body body params
 * @param param param params
 * @returns 파리미터 로그
 */
const getParamsLog = (query?: object, body?: object, param?: object) => {
  let paramLog = "";

  if (!_.isEmpty(query)) {
    paramLog += `\n Query params : ${JSON.stringify(query)}`;
  }

  if (!_.isEmpty(body)) {
    paramLog += `\n Body params : ${JSON.stringify(body)}`;
  }

  if (!_.isEmpty(param)) {
    paramLog += `\n Param params : ${JSON.stringify(param)}`;
  }

  return paramLog;
};

/**
 * @description 요청 시작 시간 로그 남기기
 * @param url 요청 url
 * @param method HTTP 메소드
 * @param query query params
 * @param body body params
 * @param param param params
 */
const requestStartTimeLog = (url: string, method: string, query?: object, body?: object, param?: object) => {
  let startLog = `Started [${method}] ${url}`;

  const paramsLog = getParamsLog(query, body, param);
  startLog += paramsLog;

  logger.info(colors.magenta(startLog));
};

/**
 * @description 요청 종료 시간 로그 남기기
 * @param url 요청 url
 * @param method HTTP 메소드
 * @param takenTime 소요 시간
 */
const requestFinishTimeLog = (url: string, method: string, takenTime: number) => {
  const endLog = colors.magenta(`Finished [${method}] ${url} (${takenTime}ms)`);
  logger.info(endLog);
};

/**
 * @description 요청 정보를 로그로 남기는 미들웨어
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const { body, method, originalUrl, params, protocol, query } = req;
  const host = req.get("host");

  const url = `${protocol}://${host}${originalUrl}`;
  const startTime = Date.now();

  requestStartTimeLog(url, method, query, body, params);

  onFinished(res, () => {
    const finishTime = Date.now();
    const takenTime = finishTime - startTime; // 소요시간

    requestFinishTimeLog(url, method, takenTime);
  });

  next();
};

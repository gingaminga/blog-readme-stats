import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import { isIPAddress, isLocalhostHostname } from "@utils/url";
import Joi from "joi";

/**
 * @description Joi 커스텀 검증을 위한 URL 검증 함수
 * - http/https 스킴만 허용
 * - 모든 IP 주소 차단
 * - localhost 차단
 */
const joiSafeUrlValidator = (value: string) => {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new CError("Invalid URL format", HTTP_STATUS_CODE.BAD_REQUEST);
  }

  // 1. 허용된 스킴 검사
  const allowedSchemes = ["http:", "https:"];
  if (!allowedSchemes.includes(url.protocol)) {
    throw new CError("Only http and https protocols are allowed", HTTP_STATUS_CODE.BAD_REQUEST);
  }

  const hostname = url.hostname;

  // 2. localhost 차단
  if (isLocalhostHostname(hostname)) {
    throw new CError("Localhost URLs are not allowed", HTTP_STATUS_CODE.BAD_REQUEST);
  }

  // 3. IP 주소 형식 차단
  if (isIPAddress(hostname)) {
    throw new CError("IP addresses are not allowed", HTTP_STATUS_CODE.BAD_REQUEST);
  }

  return value;
};

export const urlScheme = Joi.string().uri().custom(joiSafeUrlValidator, "SSRF-safe URL validation").messages({
  "string.ssrfUnsafe": "URL is not allowed for security reasons (localhost, IP address, or invalid protocol)",
});

import { isIPAddress, isLocalhostHostname } from "@utils/url";
import Joi from "joi";

/**
 * @description Joi 커스텀 검증을 위한 URL 검증 함수
 * - http/https 스킴만 허용
 * - 모든 IP 주소 차단
 * - localhost 차단
 */
const joiSafeUrlValidator = (value: string, helpers: Joi.CustomHelpers<string>) => {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return helpers.error("string.uri");
  }

  // 1. 허용된 스킴 검사
  const allowedSchemes = ["http:", "https:"];
  if (!allowedSchemes.includes(url.protocol)) {
    return helpers.error("string.ssrfUnsafe");
  }

  const hostname = url.hostname;

  // 2. localhost 차단
  if (isLocalhostHostname(hostname)) {
    return helpers.error("string.ssrfUnsafe");
  }

  // 3. IP 주소 형식 차단
  if (isIPAddress(hostname)) {
    return helpers.error("string.ssrfUnsafe");
  }

  return value;
};

export const urlScheme = Joi.string().uri().custom(joiSafeUrlValidator, "SSRF-safe URL validation").messages({
  "string.ssrfUnsafe": "URL is not allowed for security reasons (localhost, IP address, or invalid protocol)",
});

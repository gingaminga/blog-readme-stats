import { RESPONSE_STATUS } from "@utils/constants";

/**
 * @description 응답 포맷
 * @param status 성공 실패 여부
 * @param data 전달할 데이터
 * @returns 전달할 JSON 객체
 */
export const getResponseFormat = (status: boolean, data: any) => ({
  data,
  status: status ? RESPONSE_STATUS.SUCCESS : RESPONSE_STATUS.FAILURE,
});

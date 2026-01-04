import { infoService } from "@config/container.config";
import CheckInfoParamDTO from "@dto/info/check-info.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 서버 정보를 확인하는 컨트롤러
 */
export const checkServerInfoController: RequestDTOHandler<CheckInfoParamDTO> = (_req, res) => {
  const paramDTO = res.locals.requestDTO;

  const response = infoService.info(paramDTO);

  res.result(response);
};

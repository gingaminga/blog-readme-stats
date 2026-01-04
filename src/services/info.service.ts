import CheckInfoParamDTO from "@dto/info/check-info.param.dto";
import CheckInfoResponseDTO from "@dto/info/check-info.response.dto";
import { injectable } from "inversify";
import os from "node:os";

export interface IInfoService {
  info(params: CheckInfoParamDTO): CheckInfoResponseDTO;
}

@injectable()
export class InfoService implements IInfoService {
  hostName = os.hostname();

  info(params: CheckInfoParamDTO) {
    const { memory, name, uptime } = params;

    let freeMemory: number | undefined;
    let totalMemory: number | undefined;
    let hostName: string | undefined;
    let time: number | undefined;

    if (memory) {
      freeMemory = os.freemem();
      totalMemory = os.totalmem();
    }

    if (name) {
      hostName = this.hostName;
    }

    if (uptime) {
      time = os.uptime();
    }

    return new CheckInfoResponseDTO(hostName, totalMemory, freeMemory, time);
  }
}

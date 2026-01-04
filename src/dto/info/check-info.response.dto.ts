class CheckInfoResponseDTO {
  freeMemory?: number;

  hostName?: string;

  totalMemory?: number;

  uptime?: number;

  constructor(hostName?: string, totalMemory?: number, freeMemory?: number, uptime?: number) {
    this.freeMemory = freeMemory;
    this.hostName = hostName;
    this.totalMemory = totalMemory;
    this.uptime = uptime;
  }
}

export default CheckInfoResponseDTO;

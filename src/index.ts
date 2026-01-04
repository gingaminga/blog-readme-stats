import "@config/preset.config";

import app from "@app";
import logger from "@config/logger.config";
import { PROJECT } from "@utils/constants";
import getServer from "@utils/server";

const { PORT } = PROJECT;

const server = getServer(app);

server.listen(PORT, () => {
  logger.info(`Start service on ${PORT} port!`);
});

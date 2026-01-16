import "@config/preset.config";

import app from "@app";
import logger from "@config/logger.config";
import { PROJECT } from "@utils/constants";
import getServer from "@utils/server";

const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
  const { PORT } = PROJECT;

  const server = getServer(app);
  server.listen(PORT, () => {
    logger.info(`Start service on ${PORT} port!`);
    console.log("zzzzz");
  });
}

export { default } from "@app";

import logger from "@config/logger.config";
import { SSL } from "@utils/constants";
import CError from "@utils/error";
import { Express } from "express";
import fs from "node:fs";
import http, { Server } from "node:http";
import https, { ServerOptions } from "node:https";

/**
 * @description 서버 객체 가져오기
 * @param app express app
 * @returns server 객체
 */
const getServer = (app?: Express) => {
  const { CERT, PFX, TYPE, USED } = SSL;

  let server: Server | null = null;

  if (USED) {
    const config: ServerOptions = {
      cert: "",
      key: "",
      passphrase: "",
      pfx: "",
    };

    if (TYPE === "crt") {
      try {
        // CA 파일은 존재하지 않을 수도 있기 때문에 따로 예외 처리
        config.ca = fs.readFileSync(`${CERT.CA_PATH_AND_FILE}`);
      } catch {
        config.ca = "";
      }

      config.cert = fs.readFileSync(`${CERT.CERT_PATH_AND_FILE}`);
      config.key = fs.readFileSync(`${CERT.KEY_PATH_AND_FILE}`);
    } else if (TYPE === "pfx") {
      config.passphrase = PFX.PASSWORD;
      config.pfx = fs.readFileSync(`${PFX.PFX_PATH_AND_FILE}`);
    } else {
      // 서비스 동작을 하지 못하도록 강제 throw
      throw new CError("Please setting SSL_TYPE in .env");
    }

    logger.info("HTTPS protocol :)");
    server = https.createServer(config, app);
  } else {
    logger.info("HTTP protocol :)");
    server = http.createServer(app);
  }

  return server;
};

export default getServer;

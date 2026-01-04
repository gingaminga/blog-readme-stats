import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

let filename = ".env.development";

if (process.env.NODE_ENV === "test") {
  filename = ".env.test";
} else if (process.env.NODE_ENV === "production") {
  filename = ".env.production";
}

let fullPath = path.join(__dirname, "../../", filename);

if (!fs.existsSync(fullPath)) {
  filename = ".env";
  fullPath = path.join(__dirname, "../../", filename);
}

dotenv.config({
  path: fullPath,
});

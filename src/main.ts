import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors, { CorsOptions } from "cors";

import { DatabaseFactory } from "./adaptors/database/databaseFactory.js";
import { UserPort } from "./ports/http/userPort.js";
import { UsersCore } from "./core/usersCore/usersCore.js";

(async function () {
  const app = express();
  // manual initializaitons

  initializeManualMiddlewares({
    origin: process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()),
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await moduleLoading();

  app.get("/", function (_, res) {
    const answer = "Lock'n'load, sir! 🤖";
    res.status(200).send(answer);
    console.log(answer);
  });

  const server = app.listen(process.env.PORT);
  server.on("listening", () => {
    console.info(`🪖 Captan! Waiting orders on port ${process.env.PORT} 🫡`);
  });

  /** Local Functions **/

  function initializeManualMiddlewares(corsOptions: CorsOptions) {
    console.log("corsOptions", corsOptions);
    app.use(cors(corsOptions));
    app.use(express.json());
  }

  async function moduleLoading() {
    const database = await DatabaseFactory.creator();
    await database.connect({
      address: ".",
      databaseName: "db",
    });

    // user usecase
    const userscore = new UsersCore(database);
    const userModule = new UserPort(userscore, database);
    userModule.init();
    userModule.start([app]);
  }
})();

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors, { CorsOptions } from "cors";

import { UserPort } from "./ports/http/userPort.js";
import { HttpInterface } from "./ports/http/httpInterface.js";
import { HTTPVerbs } from "./objects/libraries/httpVerbs.js";

// manual initializaitons
const app = express();

initializeManualMiddlewares({
  origin: process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()),
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

httpPortAutoLoader([new UserPort()]);

app.get("/", function (_, res) {
  const answer = "Lock'n'load, sir! 🤖";
  res.status(200).send(answer);
  console.info(answer);
});

const server = app.listen(process.env.PORT);
server.on("listening", () => {
  console.info(`🪖 Captan! Waiting orders on port ${process.env.PORT} 🫡`);
});

/** Local Functions **/

function initializeManualMiddlewares(corsOptions: CorsOptions) {
  console.log("corsOptions", corsOptions);
  app.use(cors(corsOptions));
}

function httpPortAutoLoader(httpModules: HttpInterface[]) {
  console.info("loading modules...");
  for (let httpModule of httpModules) {
    const resource = httpModule.config;

    // laoding middlewares
    console.info(`adding middlewares on "${resource.getResource()}"...`);
    for (let middleware of resource.getMiddlewares()) {
      app.use(resource.getResource(), middleware);
    }

    // laoding GETs
    for (let get of resource.getRoutes(HTTPVerbs.GET)) {
      console.info("get", get);
      app.get(get.path, get.call);
    }

    // laoding POSTs
    for (let post of resource.getRoutes(HTTPVerbs.POST)) {
      console.info("post", post);
      app.post(post.path, post.call);
    }

    // laoding PUTs
    for (let put of resource.getRoutes(HTTPVerbs.PUT)) {
      console.info("put", put);
      app.put(put.path, put.call);
    }

    // laoding PATCHs
    for (let patch of resource.getRoutes(HTTPVerbs.PATCH)) {
      console.info("patch", patch);
      app.patch(patch.path, patch.call);
    }

    // laoding DELETEs
    for (let del of resource.getRoutes(HTTPVerbs.DELETE)) {
      console.info("delete", del);
      app.delete(del.path, del.call);
    }
  }
}

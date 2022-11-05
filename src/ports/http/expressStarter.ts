import { Express } from "express";

import { HTTPVerbs } from "../../objects/libraries/http/httpVerbs.js";
import { HttpInterface } from "./httpInterface.js";

export class ExpressStarter {
  public static init(app: Express, httpModule: HttpInterface, verbose = true) {
    ExpressStarter.logInfo(verbose, "loading modules...");
    const resource = httpModule.config;

    // laoding middlewares
    ExpressStarter.logInfo(
      verbose,
      `adding middlewares on "${resource.getResource()}"...`
    );
    for (let middleware of resource.getMiddlewares()) {
      app.use(resource.getResource(), middleware);
    }

    // laoding GETs
    for (let get of resource.getRoutes(HTTPVerbs.GET)) {
      ExpressStarter.logInfo(verbose, "get", get);
      app.get(get.path, get.call);
    }

    // laoding POSTs
    for (let post of resource.getRoutes(HTTPVerbs.POST)) {
      ExpressStarter.logInfo(verbose, "post", post);
      app.post(post.path, post.call);
    }

    // laoding PUTs
    for (let put of resource.getRoutes(HTTPVerbs.PUT)) {
      ExpressStarter.logInfo(verbose, "put", put);
      app.put(put.path, put.call);
    }

    // laoding PATCHs
    for (let patch of resource.getRoutes(HTTPVerbs.PATCH)) {
      ExpressStarter.logInfo(verbose, "patch", patch);
      app.patch(patch.path, patch.call);
    }

    // laoding DELETEs
    for (let del of resource.getRoutes(HTTPVerbs.DELETE)) {
      ExpressStarter.logInfo(verbose, "delete", del);
      app.delete(del.path, del.call);
    }
  }

  private static logInfo(verbose: boolean, ...args: any[]) {
    if (!verbose) {
      return;
    }

    console.info(...args);
  }
}

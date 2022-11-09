import { Express } from "express";
import { checkSchema } from "express-validator";
import { validateSchema } from "../../libraries/http/schemaValidatorMiddleware.js";

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
      ExpressStarter.logInfo(verbose, "get", `"${get.path}"`, get.call);
      if (get.validation) {
        app.get(
          get.path,
          checkSchema(get.validation.schema, get.validation.defaultLocations),
          validateSchema,
          get.call
        );
      } else {
        app.get(get.path, get.call);
      }
    }

    // laoding POSTs
    for (let post of resource.getRoutes(HTTPVerbs.POST)) {
      ExpressStarter.logInfo(verbose, "post", `"${post.path}"`, post.call);
      if (post.validation) {
        app.post(
          post.path,
          checkSchema(post.validation.schema, post.validation.defaultLocations),
          validateSchema,
          post.call
        );
      } else {
        app.post(post.path, post.call);
      }
    }

    // laoding PUTs
    for (let put of resource.getRoutes(HTTPVerbs.PUT)) {
      ExpressStarter.logInfo(verbose, "put", `"${put.path}"`, put.call);
      if (put.validation) {
        app.put(
          put.path,
          checkSchema(put.validation.schema, put.validation.defaultLocations),
          validateSchema,
          put.call
        );
      } else {
        app.put(put.path, put.call);
      }
    }

    // laoding PATCHs
    for (let patch of resource.getRoutes(HTTPVerbs.PATCH)) {
      ExpressStarter.logInfo(verbose, "patch", `"${patch.path}"`, patch.call);
      if (patch.validation) {
        app.patch(
          patch.path,
          checkSchema(
            patch.validation.schema,
            patch.validation.defaultLocations
          ),
          validateSchema,
          patch.call
        );
      } else {
        app.patch(patch.path, patch.call);
      }
    }

    // laoding DELETEs
    for (let del of resource.getRoutes(HTTPVerbs.DELETE)) {
      ExpressStarter.logInfo(verbose, "delete", `"${del.path}"`, del.call);
      if (del.validation) {
        app.delete(
          del.path,
          checkSchema(del.validation.schema, del.validation.defaultLocations),
          validateSchema,
          del.call
        );
      } else {
        app.delete(del.path, del.call);
      }
    }
  }

  private static logInfo(verbose: boolean, ...args: any[]) {
    if (!verbose) {
      return;
    }

    console.info(...args);
  }
}

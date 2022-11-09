import {
  MiddlewareFunc,
  RoutesConfig,
} from "../../objects/libraries/http/apiConfigure.js";
import { HTTPVerbs } from "../../objects/libraries/http/httpVerbs.js";
import { valuesIterator } from "../utils/enumUtilities.js";

export class ApiResourceConfigure {
  /**
   * String to be added before the path of all routes of this module
   */
  private resource = "";

  /**
   * The routes for each HTTP Method and it's string paths registered in this
   * particular resource
   */
  private routes: { [verb: string]: RoutesConfig[] } = {};

  /**
   * The middlewares registrated for this resource in order of priority
   */
  private middlewares: MiddlewareFunc[] = [];

  constructor(resource: string = "") {
    // setting resource garating '/' at the end
    this.resource =
      resource[0] === "/" ? resource : `/${resource}`;

    // setting up HTTP Methods list of routes
    for (let method of valuesIterator(HTTPVerbs)) {
      this.routes[method] = [];
    }
  }

  /**
   * Get the resource path string
   */
  public getResource(): string {
    return this.resource;
  }

  /**
   * Get the entire lsit of middlewares registrated for this resource
   * @returns The list of middlewares in order of priority
   */
  public getMiddlewares(): MiddlewareFunc[] {
    return [...this.middlewares];
  }

  /**
   * Adds a new middleware to THE END of the list of registrated middlewares for
   * this resource
   * @param middleware middleware to be added
   */
  public addMiddleware(middleware: MiddlewareFunc) {
    this.middlewares.push(middleware);
  }

  /**
   * Adds a configuration for a new route route with the given HTTP Method and
   * path
   * @param methodEnum Which Httb verb this route should have
   * @param route what is the route to be crated and it's callback function?
   */
  public addRoute(methodEnum: HTTPVerbs, route: RoutesConfig): void {
    const method = HTTPVerbs[methodEnum];

    this.routes[method].push({ ...route });
  }

  /**
   * Gets the list of paths available for a particular HTTP Method in thos API
   * Configuration
   * @param methodEnum Which Httb verb this route should have
   */
  public getRoutes(methodEnum: HTTPVerbs): RoutesConfig[] {
    const method = HTTPVerbs[methodEnum];
    const copiedRoutes = this.routes[method].map((route) => {
      return {
        ...route,
        path: `${this.resource}${route.path}`,
      };
    });

    return copiedRoutes;
  }
}

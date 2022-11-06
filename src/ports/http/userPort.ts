import { Express, Request, Response } from "express";

import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { UsersCoreInterface } from "../../core/usersCore/usersCoreInterface.js";
import { ApiResourceConfigure } from "../../libraries/http/apiConfigure.js";
import { HTTPVerbs } from "../../objects/libraries/http/httpVerbs.js";
import { PortAbstract } from "../portAbstract.js";
import { ExpressStarter } from "./expressStarter.js";
import { HttpInterface } from "./httpInterface.js";

export class UserPort
  extends PortAbstract<UsersCoreInterface>
  implements HttpInterface
{
  public config: ApiResourceConfigure;

  constructor(core: UsersCoreInterface, database: DatabaseInterface) {
    super(core, database);

    this.config = new ApiResourceConfigure("users");
    this.confiInit();
  }

  protected async initMe() {
    return true;
  }

  public async start([app]: [Express]) {
    this.config.addRoute(HTTPVerbs.POST, {
      path: "",
      call: this.createUser,
    });

    ExpressStarter.init(app, this);
  }

  /**
   * Create a user for the system and saves them in the backend
   * @param req express 'rep' from route
   * @param res express 'res' from route
   */
  public createUser(_: Request, res: Response) {
    console.log("createUser");
    res.status(501).send("NOT IMPLEMENTED");
  }

  /**
   * Initialize the configure of the api for this resource
   */
  private confiInit() {
    // code
  }
}

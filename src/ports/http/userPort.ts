import { Express } from "express";

import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { CoreAbstract } from "../../core/coreAbstract.js";
import { ApiResourceConfigure } from "../../libraries/http/apiConfigure.js";
import { PortAbstract } from "../portAbstract.js";
import { ExpressStarter } from "./expressStarter.js";
import { HttpInterface } from "./httpInterface.js";

export class UserPort extends PortAbstract implements HttpInterface {
  public config: ApiResourceConfigure;

  constructor(core: CoreAbstract, database: DatabaseInterface) {
    super(core, database);

    this.config = new ApiResourceConfigure("users");
    this.confiInit();
  }

  protected async initMe() {
    return true;
  }

  public async start([app]: [Express]) {
    ExpressStarter.init(app, this);
  }

  /**
   * Initialize the configure of the api for this resource
   */
  private confiInit() {
    // code
  }
}

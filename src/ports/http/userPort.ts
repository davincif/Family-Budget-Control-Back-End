import { Express, Request, Response } from "express";

import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { UsersCoreInterface } from "../../core/usersCore/usersCoreInterface.js";
import { CoreErrosEnum } from "../../libraries/errorHandling/coreErrosEnum.js";
import { ErrorHandlingCore } from "../../libraries/errorHandling/errorHandlingCore.js";
import { ApiResourceConfigure } from "../../libraries/http/apiConfigure.js";
import { HTTPVerbs } from "../../objects/libraries/http/httpVerbs.js";
import { FullUserHttp } from "../../objects/out/http/fullUserHttp.js";
import { UserPartialTrans } from "../../objects/transitional/userTrans.js";
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
      validation: {
        schema: {
          name: {
            exists: {
              errorMessage: "user name is missing",
            },
            notEmpty: {
              errorMessage: "user name is empty",
            },
            isString: {
              errorMessage: "user name must be a string",
            },
            trim: true,
          },
          birth: {
            isISO8601: {
              errorMessage: "birth must be a valid ISO8601 date",
            },
            exists: {
              errorMessage: "birth date is missing",
            },
            trim: true,
          },
        },
        defaultLocations: ["body"],
      },
      call: (req, res) => this.createUser(req, res),
    });

    ExpressStarter.init(app, this);
  }

  /**
   * Create a user for the system and saves them in the backend
   * @param req express 'rep' from route
   * @param res express 'res' from route
   */
  public async createUser(req: Request, res: Response) {
    console.log("createUser");
    // Data consistency garateeing
    // code

    // craete transfer object translation
    const partialUser: UserPartialTrans = {
      name: req.body.user,
      birth: req.body.birth,
    };

    // delegating to core logic
    let newUser;
    try {
      newUser = await this.core.craeteNew(partialUser);
    } catch (error: unknown) {
      let err: ErrorHandlingCore = error as any;
      let httpStatus: number;

      // swtich and treat error if needed
      switch (err.getErrorCode()) {
        case CoreErrosEnum.INVALID_ARGUMENT:
          httpStatus = 200;
          break;
        default:
          httpStatus = 500;
          break;
      }

      return res.status(httpStatus).send(err.serialize());
    }

    // "transfer to http" object translation
    let userToAnswer: FullUserHttp = {
      id: newUser.id,
      name: newUser.name,
      birth: newUser.birth,
      creation: newUser.creation,
      lastEdition: newUser.lastEdition,
      active: newUser.active,
    };

    res.status(201).send(userToAnswer);
  }

  /**
   * Initialize the configure of the api for this resource
   */
  private confiInit() {
    // code
  }
}

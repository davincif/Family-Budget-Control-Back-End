import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { DateUtils } from "../../libraries/utils/dateUtils.js";
import { UserPartialCore } from "../../objects/core/userCore.js";
import { UserPartialTrans } from "../../objects/transitional/userTrans.js";
import { CoreAbstract } from "../coreAbstract.js";
import { CoreErrosEnum } from "../../libraries/errorHandling/coreErrosEnum.js";
import { UsersCoreInterface } from "./usersCoreInterface.js";
import { ErrorHandlingCore } from "../../libraries/errorHandling/errorHandlingCore.js";

export class UsersCore extends CoreAbstract implements UsersCoreInterface {
  private database: DatabaseInterface;

  constructor(database: DatabaseInterface) {
    super();

    this.database = database;
  }

  public async craeteNew(user: UserPartialTrans) {
    // Data consistency garateeing
    this.hasNonNullProperty(user, "name", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing name property on user",
      identifier: "C1M1E1",
    });
    this.hasNonNullProperty(user, "birth", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing birth property on user",
      identifier: "C1M1E2",
    });

    // "transfer to core" object translation
    let partialUser: UserPartialCore = {
      name: user.name,
      birth: DateUtils.dateStringToDate(user.birth),
    };

    // core logic
    // check name validity
    if (!DateUtils.isValidDate(partialUser.birth!)) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("user date isn't valid")
        .setMsg("C1M1E1");
    }
    if (DateUtils.isInTheFuture(partialUser.birth!)) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("user was born in the future .-.")
        .setMsg("C1M1E2");
    }

    // "core to transfer" object translation
    let userPartialTransfer: UserPartialTrans = {
      name: user.name,
      birth: user.birth,
    };

    // out login
    let savedUser = await this.database.saveUser(userPartialTransfer);

    // always return transfer object
    return savedUser;
  }
}

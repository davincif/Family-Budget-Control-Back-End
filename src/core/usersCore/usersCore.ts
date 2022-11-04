import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { DateUtils } from "../../libraries/utils/dateUtils.js";
import { UserPartialCore } from "../../objects/core/userCore.js";
import { UserPartialTrans } from "../../objects/transitional/userTrans.js";
import { CoreAbstract } from "./coreAbstract.js";
import { UsersCoreInterface } from "./usersCoreInterface.js";

export class UsersCore extends CoreAbstract implements UsersCoreInterface {
  // TODO: REMEMBER TO REMOVE THIS IGNORE AT THE OPORTUNE TIME
  // @ts-ignore
  private database: DatabaseInterface;

  constructor(database: DatabaseInterface) {
    super();

    this.database = database;
  }

  public async craeteNew(user: UserPartialTrans) {
    // Data consistency garateeing
    this.hasNonNullProperty(user, "name", {
      msg: "missing name property on user",
      identifier: "C1M1E1",
    });
    this.hasNonNullProperty(user, "birth", {
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
      throw this.makeCoreError("user date isn't valid", "C1M1E1");
    }
    if (DateUtils.isInTheFuture(partialUser.birth!)) {
      throw this.makeCoreError("user was born in the future .-.", "C1M1E2");
    }

    // "core to transfer" object translation
    let userPartialTransfer: UserPartialTrans = {
      name: user.name,
      birth: user.birth,
    };

    // out login
    let savedUser = this.database.saveUser(userPartialTransfer);

    // always return transfer object
    return savedUser;
  }
}

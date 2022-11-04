import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { UserPartialCore } from "../../objects/core/userCore.js";
import { UserTrans } from "../../objects/transitional/userTrans.js";
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

  public async craeteNew(user: UserTrans) {
    // Data consistency garateeing
    this.hasProperty(user, "name", {
      msg: "missing name property on user",
      identifier: "C1M1E1",
    });
    this.hasProperty(user, "birth", {
      msg: "missing birth property on user",
      identifier: "C1M1E2",
    });

    // "transfer to core" object translation
    let partialUser: UserPartialCore = {
      name: user.name,
      birth: user.birth,
    };

    // core logic
    // check name validity
    if (partialUser.name!.length <= 0) {
      throw this.makeCoreError("user name is too short", "C1M1E2");
    }

    // "core to transfer" object translation

    // out login
    // this.database.saveUser();

    // always return transfer object
    return user;
  }
}

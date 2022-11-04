import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { UserTrans } from "../../objects/transitional/userTrans.js";
import { UsersCoreInterface } from "./usersCoreInterface.js";

export class UsersCore implements UsersCoreInterface {
  // TODO: REMEMBER TO REMOVE THIS IGNORE AT THE OPORTUNE TIME
  // @ts-ignore
  private database: DatabaseInterface;

  constructor(database: DatabaseInterface) {
    this.database = database;
  }

  public async craeteNew(user: UserTrans) {
    return user;
  }
}

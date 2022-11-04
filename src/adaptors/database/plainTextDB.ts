import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import { UserDbObj } from "../../objects/out/database/userDB.js";
import { UserTrans } from "../../objects/transitional/userTrans.js";
import { DatabaseInterface } from "./databaseInterface.js";

export class PlainTextDB implements DatabaseInterface {
  constructor() {}

  public async connect(config: ConnectionDB): Promise<void> {
    console.log("connect", config);
  }

  public async saveUser(user: UserTrans): Promise<UserDbObj> {
    const retUser: UserDbObj = {
      id: 0,
      creation: new Date(),
      lastEdition: new Date(),
      active: true,
      ...user,
    };

    return retUser;
  }
}

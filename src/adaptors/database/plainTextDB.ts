import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import { UserPartialTrans } from "../../objects/transitional/userTrans.js";
import { DatabaseInterface } from "./databaseInterface.js";

export class PlainTextDB implements DatabaseInterface {
  constructor() {}

  public async connect(config: ConnectionDB): Promise<void> {
    console.log("connect", config);
  }

  public async saveUser(user: UserPartialTrans) {
    console.log("PLAINTEXT user", user);
    // const userToSave: UserDbObj = {
    //   id: 0,
    //   creation: new Date(),
    //   lastEdition: new Date(),
    //   active: true,
    //   ...user,
    // };

    // let asd:UserTrans
    let savedUser: any;

    return savedUser;
  }
}

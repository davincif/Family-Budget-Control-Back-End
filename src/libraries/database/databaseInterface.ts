import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import { UserDbObj } from "../../objects/out/database/userDB.js";
import { UserTrans } from "../../objects/transitional/userTrans.js";

export interface DatabaseInterface {
  /**
   * Connect to the database
   * @param config The configuration object for the database connection
   */
  connect: (config: ConnectionDB) => Promise<void>;

  /**
   * Saves the given user on the database
   * @param user The user to be saved
   * @returns The saved user
   */
  saveUser: (user: UserTrans) => Promise<UserDbObj>;
}

import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import {
  UserPartialTrans,
  UserTrans,
} from "../../objects/transitional/userTrans.js";

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
  saveUser: (user: UserPartialTrans) => Promise<UserTrans>;

  /**
   * Saerches the user bu the given id
   * @param id The id of the user to be searched
   * @returns The foudn user or undefined if not found
   */
  getUserById: (id: number) => Promise<UserTrans|undefined>;
}

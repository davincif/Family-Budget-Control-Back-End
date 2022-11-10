import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import { AuthenticationTrans } from "../../objects/transitional/authenticationTrans.js";
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
   * Saerches the user by the given id
   * @param id The id of the user to be searched
   * @returns The found user or undefined if none was found
   */
  getUserById: (id: number) => Promise<UserTrans | undefined>;

  /**
   * Saerches the user by the given email
   * @param email The email of the user to be searched
   * @returns The found user or undefined if none was found
   */
  getUserByEmail: (email: string) => Promise<UserTrans | undefined>;

  /**
   * Saves the given autentication object and relate it with the given user
   * @param id The id of the user to be authenticated
   * @param auth Authentication Object
   * @returns the saved authentication Object
   */
  saveAuthentication: (
    id: number,
    auth: AuthenticationTrans
  ) => Promise<AuthenticationTrans>;
}

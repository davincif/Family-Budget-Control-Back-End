import { AuthenticateUserReq } from "../../objects/transitional/authenticateUserReq.js";
import { AuthenticationTrans } from "../../objects/transitional/authenticationTrans.js";
import {
  UserPartialTrans,
  UserTrans,
} from "../../objects/transitional/userTrans.js";
import { CoreAbstract } from "../coreAbstract.js";

export interface UsersCoreInterface extends CoreAbstract {
  /**
   * Creates a new user with the given information
   * @param user basic information of the user: {name,birth,email,password}
   * @returns The user created and saved on the DB
   */
  craeteNew: (user: UserPartialTrans) => Promise<UserTrans>;

  /**
   * Log the user in the system
   * @param user Authentication information about the user
   * @returns The Authentication object for the user, if success, undefiend otherwise.
   */
  login: (user: AuthenticateUserReq) => Promise<AuthenticationTrans>;
}

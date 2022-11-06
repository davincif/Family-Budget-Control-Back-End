import { UserPartialTrans, UserTrans } from "../../objects/transitional/userTrans.js";
import { CoreAbstract } from "../coreAbstract.js";

export interface UsersCoreInterface extends CoreAbstract {
  /**
   * Creates a new user with the given information
   * @param user basic information of the user to be created
   * @returns The user created and saved on the DB
   */
  craeteNew: (user: UserPartialTrans) => Promise<UserTrans>;
}

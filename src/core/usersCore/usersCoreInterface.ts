import { UserTrans } from "../../objects/transitional/userTrans.js";

export interface UsersCoreInterface {
  /**
   * Creates a new user with the given information
   * @param user basic information of the user to be created
   * @returns The user created and saved on the DB
   */
  craeteNew: (user: UserTrans) => Promise<UserTrans>;
}

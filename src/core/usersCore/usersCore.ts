import { SignJWT, JWTHeaderParameters } from "jose";

import { DatabaseInterface } from "../../adaptors/database/databaseInterface.js";
import { DateUtils } from "../../libraries/utils/dateUtils.js";
import { UserPartialCore } from "../../objects/core/userCore.js";
import { UserPartialTrans } from "../../objects/transitional/userTrans.js";
import { CoreAbstract } from "../coreAbstract.js";
import { CoreErrosEnum } from "../../libraries/errorHandling/coreErrosEnum.js";
import { UsersCoreInterface } from "./usersCoreInterface.js";
import { ErrorHandlingCore } from "../../libraries/errorHandling/errorHandlingCore.js";
import { AuthenticateUserReq } from "../../objects/transitional/authenticateUserReq.js";
import { AuthenticationTrans } from "../../objects/transitional/authenticationTrans.js";
import { AuthenticationCore } from "../../objects/core/authenticationCore.js";

export class UsersCore extends CoreAbstract implements UsersCoreInterface {
  private database: DatabaseInterface;

  private JWT_SALT: string = process.env.JWT_SALT || "";
  private JWT_HEADER: JWTHeaderParameters = {
    alg: process.env.JWT_ALG || "xablauSALT",
  };

  constructor(database: DatabaseInterface) {
    super();

    this.database = database;
  }

  public async craeteNew(user: UserPartialTrans) {
    // Data consistency garateeing
    this.hasNonNullProperty(user, "name", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing name property on user",
      identifier: "C1M1E1",
    });
    this.hasNonNullProperty(user, "birth", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing birth property on user",
      identifier: "C1M1E2",
    });
    this.hasNonNullProperty(user, "email", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing email property on user",
      identifier: "C1M1E3",
    });
    this.hasNonNullProperty(user, "password", {
      errorcode: CoreErrosEnum.BAD_ARGUMENT,
      msg: "missing password property on user",
      identifier: "C1M1E6",
    });

    // "transfer to core" object translation
    let partialUser: UserPartialCore = {
      name: user.name,
      email: user.email,
      birth: DateUtils.dateStringToDate(user.birth),
      password: user.password,
    };

    // core logic
    // check name validity
    if (!DateUtils.isValidDate(partialUser.birth!)) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("C1M1E4")
        .setMsg("user date isn't valid");
    }
    if (DateUtils.isInTheFuture(partialUser.birth!)) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("C1M1E5")
        .setMsg("the user was born in the future .-.");
    }
    // TODO: MSISSING TO IMPLEMENTE THE EMAIL VALIDATION!

    // "core to transfer" object translation
    let userPartialTransfer: UserPartialTrans = {
      name: user.name,
      email: user.email,
      birth: user.birth,
      password: user.password,
    };

    // out login
    let savedUser = await this.database.saveUser(userPartialTransfer);

    // always return transfer object
    return savedUser;
  }

  public async login(user: AuthenticateUserReq) {
    // "transfer to core" object translation
    let auth: AuthenticationCore = {
      email: user.email,
      password: user.password,
    };

    // core logic
    const foundUser = await this.database.getUserByEmail(auth.email);
    if (!foundUser) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("C1M2E1")
        .setMsg("user or password do not match");
    }
    if (foundUser.password !== auth.password) {
      throw new ErrorHandlingCore(CoreErrosEnum.INVALID_ARGUMENT)
        .setIdentifier("C1M2E2")
        .setMsg("user or password do not match");
    }

    const playload = { name: foundUser.name };
    const header: JWTHeaderParameters = { ...this.JWT_HEADER };
    const key = new TextEncoder().encode(this.JWT_SALT);
    const jwt = await new SignJWT(playload)
      .setProtectedHeader(header)
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(key);

    // "core to transfer" object translation
    const answer: AuthenticationTrans = { jwt };

    return answer;
  }
}

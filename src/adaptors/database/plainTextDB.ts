import { existsSync, readFileSync, writeFileSync } from "fs";

import { ConnectionDB } from "../../objects/out/database/connectionDB.js";
import { UserDbObj } from "../../objects/out/database/userDB.js";
import {
  UserPartialTrans,
  UserTrans,
} from "../../objects/transitional/userTrans.js";
import { DatabaseInterface } from "./databaseInterface.js";
import { ErrorHandlingDB } from "../../libraries/errorHandling/errorHandlingDB.js";
import { DatabasesErrosEnum } from "../../libraries/errorHandling/databasesErrosEnum.js";
import { AuthenticationTrans } from "../../objects/transitional/authenticationTrans.js";
import { AuthenticationDB } from "../../objects/out/database/authenticationDB.js";

export class PlainTextDB implements DatabaseInterface {
  /**
   * The database file path. eg.: ./xablau/file.json
   */
  private dbFilePath: string = "";

  /**
   * Database file in memory
   */
  private memDB!: {
    users: UserDbObj[];
    logged: { [id: number]: AuthenticationDB };
  };

  constructor() {}

  public async connect(config: ConnectionDB): Promise<void> {
    this.dbFilePath = `${config.address}/${config.databaseName}.json`;
    const fileExists = existsSync(this.dbFilePath);

    if (fileExists) {
      const readFile = readFileSync(this.dbFilePath, {
        encoding: "utf8",
        flag: "r",
      });
      this.memDB = JSON.parse(readFile);
    } else {
      // init db
      this.memDB = {
        users: [],
        logged: {},
      };

      this.saveDb();
    }
  }

  public async saveUser(user: UserPartialTrans) {
    this.garanteeConnected();

    // "transitional to database" objects translation
    let userToSave: UserDbObj = {
      id: this.memDB.users[this.memDB.users.length - 1]?.id || 0,
      name: user.name,
      email: user.email,
      password: user.password || "",
      birth: user.birth,
      creation: new Date().toISOString(),
      active: true,
    };

    // database logic: create and save on the database
    const existentUser = await this.getUserByEmail(userToSave.email);
    if (existentUser) {
      throw new ErrorHandlingDB(DatabasesErrosEnum.USER_NOT_FOUND)
        .setIdentifier("PT-M2E1")
        .setMsg(`the email '${userToSave.email}' is already taken`);
    }

    this.memDB.users.push(userToSave);
    this.saveDb();

    // "database to transitional" objects translation
    let userSaved: UserTrans = {
      id: userToSave.id,
      name: userToSave.name,
      email: userToSave.email,
      password: userToSave.password,
      birth: userToSave.birth,
      creation: userToSave.creation,
      active: userToSave.active,
    };

    return userSaved;
  }

  public async getUserById(id: number) {
    this.garanteeConnected();

    // database logic: searching
    let found = this.memDB.users.find((user) => user.id === id);

    if (!found) {
      return;
    }

    // "database to transitional" objects translation
    let foundUser: UserTrans = {
      id: found.id,
      email: found.email,
      name: found.name,
      password: found.password,
      birth: found.birth,
      creation: found.creation,
      active: found.active,
    };

    return foundUser;
  }

  public async saveAuthentication(id: number, auth: AuthenticationTrans) {
    this.garanteeConnected();

    // database logic: create and save on the database
    const existentUser = await this.getUserById(id);
    if (!existentUser) {
      throw new ErrorHandlingDB(DatabasesErrosEnum.USER_NOT_FOUND)
        .setIdentifier("PT-M5E1")
        .setMsg(`there's no user with id '${id}' at the database`);
    }

    // "transitional to database" object translation
    let authDb: AuthenticationDB = { jwt: auth.jwt };

    this.memDB.logged[id] = authDb;
    this.saveDb();

    return auth;
  }

  public async getUserByEmail(email: string) {
    this.garanteeConnected();

    // database logic: searching
    let found = this.memDB.users.find((user) => user.email === email);

    if (!found) {
      return;
    }

    // "database to transitional" objects translation
    let foundUser: UserTrans = {
      id: found.id,
      email: found.email,
      name: found.name,
      password: found.password,
      birth: found.birth,
      creation: found.creation,
      active: found.active,
    };

    return foundUser;
  }

  /**
   * Save the current memory database state in file
   */
  private saveDb() {
    writeFileSync(this.dbFilePath, JSON.stringify(this.memDB));
  }

  /**
   * Garantees that the database was properly connected, if not, throw an error
   */
  private garanteeConnected() {
    if (this.memDB) {
      return;
    }

    throw new ErrorHandlingDB(DatabasesErrosEnum.CONNECTION_FAILED)
      .setIdentifier("PT-M1E1")
      .setMsg("The json database was never connected/created");
  }
}

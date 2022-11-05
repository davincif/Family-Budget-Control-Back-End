import dotenv from "dotenv";
dotenv.config();

import { DatabaseInterface } from "./databaseInterface.js";
import { DatabasesEnum } from "./databasesEnum.js";

export class DatabaseFactory {
  /**
   * Get an instance of the requested database with the due implementatinos
   * @param db The enum of the desired that base. Leave empty for standard .env one
   * @returns an instance of the requested database
   */
  public static async creator(db?: DatabasesEnum): Promise<DatabaseInterface> {
    if (db === undefined || db === null) {
      db = DatabasesEnum[process.env.DATABASE as keyof typeof DatabasesEnum];
    }

    let instance: DatabaseInterface;

    switch (db) {
      case DatabasesEnum.PLAIN_TEXT:
        let plaintext = await import("./plainTextDB.js");
        instance = new plaintext.PlainTextDB();
        break;

      default:
        throw new Error(`NO DATABASE IMPLEMENTATON FOR ${DatabasesEnum[db]}`);
    }

    return instance;
  }
}

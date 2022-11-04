import { DatabaseInterface } from "./databaseInterface.js";
import { DatabasesEnum } from "./databasesEnum.js";

export  class DatabaseFactory {
  public static async creator(db: number): Promise<DatabaseInterface> {
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

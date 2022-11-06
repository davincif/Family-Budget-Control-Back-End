import { DatabaseInterface } from "../adaptors/database/databaseInterface.js";

export abstract class PortAbstract<T> {
  protected core: T;
  protected database?: DatabaseInterface;

  /**
   * If the port was alresy sucessfully initialized or not
   */
  private inited = false;

  constructor(core: T, database: DatabaseInterface) {
    this.core = core;
    this.database = database;
  }

  /**
   * Associate each port call with a core user case and whatever other job that
   * must be done
   * @returns weather if the port was initialized successfully or not
   */
  protected abstract initMe(): Promise<boolean>;

  /**
   *
   * @returns weather if the port was initialized successfully or not
   */
  public async init() {
    if (this.inited) {
      return this.inited;
    }

    let success = await this.initMe();
    if (success) {
      this.markAsInited();
    }

    return this.inited;
  }

  public isInited(): boolean {
    return this.inited;
  }

  protected markAsInited() {
    this.inited = true;
  }

  /**
   * Actively starts the port process for listening, or wating, or whatever is it
   * the port needs to do
   */
  public abstract start(args: any[]): Promise<void>;
}

import { DatabasesErrosEnum } from "./databasesErrosEnum.js";
import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingDB extends ErrorHandlingAbstract<never> {
  constructor(errorCode: DatabasesErrosEnum) {
    super(errorCode as any);

    this.setOrigin(ErrorHandlingTypesEnum.DATABASE);
  }

  protected serializeError() {
    return;
  }
}

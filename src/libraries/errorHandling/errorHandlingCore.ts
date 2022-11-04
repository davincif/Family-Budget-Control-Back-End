import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingCore extends ErrorHandlingAbstract<never> {
  constructor() {
    super();

    this.setOrigin(ErrorHandlingTypesEnum.CORE);
  }

  protected serializeError() {
    return;
  }
}

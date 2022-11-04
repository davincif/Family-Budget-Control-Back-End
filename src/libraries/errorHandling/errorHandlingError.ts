import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingError extends ErrorHandlingAbstract<never> {
  constructor() {
    super();

    this.setOrigin(ErrorHandlingTypesEnum.ERROR_HANDLING);
  }

  protected serializeError() {
    return;
  }
}

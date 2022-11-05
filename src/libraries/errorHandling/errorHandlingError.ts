import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingError extends ErrorHandlingAbstract<never> {
  constructor(errorCode: any) {
    super(errorCode);

    this.setOrigin(ErrorHandlingTypesEnum.ERROR_HANDLING);
  }

  protected serializeError() {
    return;
  }
}

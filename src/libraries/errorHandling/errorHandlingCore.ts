import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingCore extends ErrorHandlingAbstract<never> {
  constructor(errorCode: any) {
    super(errorCode);

    this.setOrigin(ErrorHandlingTypesEnum.CORE);
  }

  protected serializeError() {
    return;
  }
}

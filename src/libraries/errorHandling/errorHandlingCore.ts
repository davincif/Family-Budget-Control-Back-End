import { CoreErrosEnum } from "./coreErrosEnum.js";
import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingCore extends ErrorHandlingAbstract<
  CoreErrosEnum,
  void
> {
  constructor(errorCode: CoreErrosEnum) {
    super(errorCode);

    this.setOrigin(ErrorHandlingTypesEnum.CORE);
  }

  protected serializeError(): unknown {
    return;
  }
}

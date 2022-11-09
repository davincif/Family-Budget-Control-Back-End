import { ValidationError } from "express-validator";
import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";
import { HttpErrosEnum } from "./HttpErrosEnum.js";

export class ErrorHandlingHttp extends ErrorHandlingAbstract<HttpErrosEnum, ValidationError[]> {
  constructor(errorCode: HttpErrosEnum) {
    super(errorCode);

    this.setOrigin(ErrorHandlingTypesEnum.EXPRESS);
  }

  protected serializeError(): ValidationError[] | undefined {
    return this.error
  }
}

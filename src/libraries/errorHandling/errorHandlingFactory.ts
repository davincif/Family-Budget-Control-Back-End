import { ErrorHandlingAbstract } from "./errorHandlingAbstract.js";
import { ErrorHandlingCore } from "./errorHandlingCore.js";
import { ErrorHandlingError } from "./errorHandlingError.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

export class ErrorHandlingFactory {
  /**
   * Instanciates an error object of the given type. Just the way you need ;)
   * @param errorType a ErrorHandlingTypesEnum type of error
   * @returns an instance of the correct type of error
   */
  public static creator(errorType: number): ErrorHandlingAbstract<unknown> {
    let instance: ErrorHandlingAbstract<unknown>;

    switch (errorType) {
      case ErrorHandlingTypesEnum.CORE:
        instance = new ErrorHandlingCore();
        break;

      case ErrorHandlingTypesEnum.ERROR_HANDLING:
        instance = new ErrorHandlingError();
        break;

      default:
        throw new ErrorHandlingError()
          .setIdentifier("EH1M1E1")
          .setOrigin(ErrorHandlingTypesEnum.ERROR_HANDLING)
          .setMsg("ERROR TYPE NOT RECOGNIZED!");
    }

    return instance;
  }
}

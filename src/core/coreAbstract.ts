import { ErrorHandlingCore } from "../libraries/errorHandling/errorHandlingCore.js";
import { CoreErrosEnum } from "../libraries/errorHandling/coreErrosEnum.js";

export abstract class CoreAbstract {
  /**
   * Check if the given property exists in the given object and throw an error
   * if it doesn't
   * @param obj which object to thest
   * @param propertyName which property to test in the object
   * @param err The error msg and identifier to trhow in case of error eg.: 0, ''
   * @returns undefined if success or a core error object in case of error
   */
  protected hasProperty(
    obj: any,
    propertyName: string,
    err: { errorcode: CoreErrosEnum; msg: string; identifier: string }
  ): ErrorHandlingCore | undefined {
    if (obj[propertyName] !== undefined && obj[propertyName] !== null) {
      return;
    }

    return new ErrorHandlingCore(err.errorcode)
      .setIdentifier(err.identifier)
      .setMsg(err.msg);
  }

  /**
   * Check if the given property exists and it does not evaluates as undefined
   * in the given object. And throws an error if the check fail
   * @param obj which object to thest
   * @param propertyName which property to test in the object
   * @param err The error msg and identifier to trhow in case of error eg.: 0, ''
   * @returns undefined if success or a core error object in case of error
   */
  protected hasNonNullProperty(
    obj: any,
    propertyName: string,
    err: { errorcode: CoreErrosEnum; msg: string; identifier: string }
  ): ErrorHandlingCore | undefined {
    if (!obj[propertyName]) {
      return;
    }

    return new ErrorHandlingCore(err.errorcode)
      .setIdentifier(err.identifier)
      .setMsg(err.msg);
  }

  // /**
  //  * Builds a core error object with the requested information
  //  * @param errorcode the unique code that describe this error for other layers
  //  * @param msg the msg to be addded to the error object
  //  * @param identifier the identifier of the error object to be created
  //  * @returns A core error object in case of error
  //  */
  // protected makeCoreError(
  //   errorcode: CoreErrosEnum,
  //   msg: string,
  //   identifier: string
  // ) {
  //   return new ErrorHandlingCore(errorcode)
  //     .setIdentifier(identifier)
  //     .setMsg(msg);
  // }
}

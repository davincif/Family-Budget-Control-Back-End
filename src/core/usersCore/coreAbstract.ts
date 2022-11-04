import { ErrorHandlingCore } from "../../libraries/errorHandling/errorHandlingCore.js";

export abstract class CoreAbstract {
  /**
   * Check if the given property exists in the given object and throw an error
   * if it doesn't
   * @param obj which object to thest
   * @param propertyName which property to test in the object
   * @param err The error msg and identifier to trhow in case of error
   * @returns undefined if success or a core error object in case of error
   */
  protected hasProperty(
    obj: any,
    propertyName: string,
    err: { msg: string; identifier: string }
  ): ErrorHandlingCore | undefined {
    if (obj[propertyName] !== undefined && obj[propertyName] !== null) {
      return;
    }

    return this.makeCoreError(err.msg, err.identifier);
  }

  /**
   * Builds a core error object with the requested information
   * @param msg the msg to be addded to the error object
   * @param identifier the identifier of the error object to be created
   * @returns A core error object in case of error
   */
  protected makeCoreError(msg: string, identifier: string) {
    return new ErrorHandlingCore().setIdentifier(identifier).setMsg(msg);
  }
}

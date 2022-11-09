import { ErrorHandlingSerialized } from "./errorHandlingSerialized.js";
import { ErrorHandlingTypesEnum } from "./errorHandlingTypesEnum.js";

/**
 * This class describes the standard behaviour of a Error Object in the system.
 *
 * NOTE that: once set, the properties of this class is imutable!
 */
export abstract class ErrorHandlingAbstract<ERROR_ENUM, ERROR_OBJ> {
  /**
   * A errorCode (for internal use only, this field IS NOT serialized). Helps in
   * the error treatment between layers.
   *
   * PS.: It's sopposed to be an enum.
   */
  protected errorCode: ERROR_ENUM;

  /**
   * A identifier to the error: preferencially an unique one!
   */
  protected identifier: string = "";
  private wasIdentifierSet = false;

  /**
   * Where does this error comes from?
   */
  protected origin: ErrorHandlingTypesEnum = 0;
  private wasOriginSet = false;

  /**
   * A personalized error msg
   */
  protected msg?: string;
  private wasMsgSet = false;

  /**
   * Some other possible error object that may be generated
   */
  protected error?: ERROR_OBJ;
  private wasErrorSet = false;

  constructor(errorCode: any) {
    this.errorCode = errorCode;
  }

  protected abstract serializeError(): unknown | undefined;

  /**
   * Get the errorCode
   */
  public getErrorCode() {
    return this.errorCode;
  }

  /**
   * Get the ─ preferencially unique ─ identifier of the error
   */
  public getIdentifier() {
    return this.identifier;
  }

  /**
   * Get from where does this error comes?
   */
  public getOrigin() {
    return this.origin;
  }

  /**
   * Get the personalized error msg, if any
   */
  public getMsg() {
    return this.msg;
  }

  /**
   * Get the extra error object generated, if any
   * CAUTION! the obj returned by this function is not always encapsulated
   */
  public getError() {
    return this.error;
  }

  /**
   * The extra error of the object serialized
   */
  public getErrorSerialized(): unknown {
    return this.serializeError();
  }

  /**
   * Set the identifier of the error
   * @param identifier The identifier string
   * @returns the object modificated if success or undefined otherwise
   * @throws if try to mudate an already mutated identifier
   */
  public setIdentifier(identifier: string) {
    if (this.wasIdentifierSet) {
      throw "IMUTABLE ERROR CHANGE!";
    }

    this.identifier = identifier;
    this.wasIdentifierSet = true;

    return this;
  }

  /**
   * Set the origin, in the code, of the error
   * @param origin The origin of the error
   * @returns the object modificated if success or undefined otherwise
   * @throws if try to mudate an already mutated origin
   */
  public setOrigin(origin: ErrorHandlingTypesEnum) {
    if (this.wasOriginSet) {
      throw "IMUTABLE ERROR CHANGE!";
    }

    this.origin = origin;
    this.wasOriginSet = true;

    return this;
  }

  /**
   * Set the personalized msg of the error
   * @param msg The msg string of the error
   * @returns the object modificated if success or undefined otherwise
   * @throws if try to mudate an already mutated msg
   */
  public setMsg(msg: string) {
    if (this.wasMsgSet) {
      throw "IMUTABLE ERROR CHANGE!";
    }

    this.msg = msg;
    this.wasMsgSet = true;

    return this;
  }

  /**
   * Set an extra error object in the error
   * @param error The extra error object of the error
   * @returns the object modificated if success or undefined otherwise
   * @throws if try to mudate an already mutated error
   */
  public setError(error: ERROR_OBJ) {
    if (this.wasErrorSet) {
      throw "IMUTABLE ERROR CHANGE!";
    }

    this.error = error;
    this.wasErrorSet = true;

    return this;
  }

  /**
   * Serializes the entire error Object.
   *
   * Useful to pass is throw a web request, for exemple.
   */
  public serialize(): ErrorHandlingSerialized {
    return {
      identifier: this.getIdentifier(),
      origin: this.getOrigin(),
      msg: this.getMsg() || "",
      error: this.getErrorSerialized() || undefined,
    };
  }
}

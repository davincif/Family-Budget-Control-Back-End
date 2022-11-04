import { ApiResourceConfigure } from "../../libraries/http/apiConfigure.js";
import { HttpInterface } from "./httpInterface.js";

export class UserPort implements HttpInterface {
  public config: ApiResourceConfigure;

  constructor() {
    this.config = new ApiResourceConfigure("users");
    this.confiInit();
  }

  /**
   * Initialize the configure of the api for this resource
   */
  private confiInit() {
    // code
  }
}

import { validationResult } from "express-validator";

import { MiddlewareFunc } from "../../objects/libraries/http/apiConfigure.js";
import { ErrorHandlingHttp } from "../errorHandling/errorHandlingHttp.js";
import { HttpErrosEnum } from "../errorHandling/HttpErrosEnum.js";


export const validateSchema: MiddlewareFunc = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new ErrorHandlingHttp(HttpErrosEnum.INVALID_INPUT)
      .setIdentifier("MVE1")
      .setError(errors.array());

    return res.status(400).json(err.serialize());
  }
  next();
};

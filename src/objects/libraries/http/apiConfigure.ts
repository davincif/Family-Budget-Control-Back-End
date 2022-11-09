import { NextFunction, Request, RequestHandler, Response } from "express";
import { Location, Schema } from "express-validator";

export type MiddlewareFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface RoutesConfig {
  path: string;
  validation?: { schema: Schema; defaultLocations?: Location[] };
  call: RequestHandler;
}

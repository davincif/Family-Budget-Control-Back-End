import { NextFunction, Request, RequestHandler, Response } from "express";

export type MiddlewareFunc = (
  rqe: Request,
  res: Response,
  next: NextFunction
) => void;

export interface RoutesConfig {
  path: string;
  call: RequestHandler;
}

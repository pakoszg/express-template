import { NextFunction, RequestHandler, Request, Response } from "express";

export const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

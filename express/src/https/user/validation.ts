import { isLeft } from "fp-ts/lib/Either";
import { NextFunction, Request, Response } from "express";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { HTTPError } from "../../error";

export const decodeRequest = <K extends t.HasProps>(
  codec: K,
  value: Request
): t.TypeOf<K> => {
  const result = t.exact(codec).decode(value);

  if (isLeft(result)) {
    const errors = PathReporter.report(result).join();
    throw new HTTPError("validation_error", errors);
  }

  return result.right;
};

interface ParsedRequest<T> extends Request {
  body: T;
}

interface ParsedRequestHandler<T> {
  (
    request: ParsedRequest<T>,
    response: Response,
    next: NextFunction
  ): Promise<Response>;
}

export const validateRequest =
  <T extends t.HasProps>(
    codec: T,
    handler: ParsedRequestHandler<t.TypeOf<T>>
  ) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    const decodedBody = decodeRequest(codec, request.body);
    request.body = decodedBody;

    return handler(request, response, next);
  };

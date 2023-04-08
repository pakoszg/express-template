import { isLeft } from "fp-ts/lib/Either";
import { Request } from "express";
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

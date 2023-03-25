import { isLeft } from "fp-ts/lib/Either";
import { Request } from "express";
import * as t from "io-ts";

export const decodeRequest = <K extends t.HasProps>(
  codec: K,
  value: Request
): t.TypeOf<K> => {
  const result = t.exact(codec).decode(value);

  if (isLeft(result)) {
    throw new Error("Create user validation failed.");
  }

  return result.right;
};

import fetch from "node-fetch";
import { Response as NodeFetchResponse } from "node-fetch";
import jwt from "jsonwebtoken";

import { postgrestUrl, postgrestJwtSecret } from "../config";

export const POSTGREST_JSON_HEADERS = [
  "application/json",

  // https://postgrest.org/en/stable/api.html?highlight=vnd.pgrst.object%2Bjson#singular-or-plural
  "application/vnd.pgrst.object+json",
] as const;

export const formatPayload = async <T>(
  response: Response,
  { resource }: { resource?: string } = {}
): Promise<T> => {
  if (response.status >= 400) {
    const responseJson = await response.json();
    throw new Error({
      ...responseJson,
      httpStatusCode: response.status,
      message: `${responseJson?.message} (resource: ${resource})`,
    });
  }

  const contentType = response.headers.get("content-type");

  let responsePayload;

  const isJsonResponse = POSTGREST_JSON_HEADERS.some((header) =>
    contentType?.startsWith(header)
  );
  if (isJsonResponse) {
    responsePayload = await response.json();
  } else {
    responsePayload = await response.text();
  }

  return responsePayload;
};

type Postgrest = {
  method: "get" | "post" | "create" | "delete";
  body?: string | Record<string, any>;
  headers?: Record<string, string>;
};

const postgrest = async ({
  method,
  body,
  headers,
}: Postgrest): Promise<Promise<unknown>> => {
  const signedJwt = jwt.sign(
    { role: "postgrest_authenticator" },
    postgrestJwtSecret
  );

  let response: NodeFetchResponse;

  try {
    response = await fetch(postgrestUrl, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${signedJwt}`,
        ...headers,
      },
    });
  } catch {
    throw new Error();
  }

  if (response.status >= 400) {
    return response.json();
    throw new Error();
  } else {
    return response.json();
  }
};

const create = async ({ resource, payload }) =>
  await postgrest({ method: "post", body: payload });

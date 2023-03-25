import fetch from "node-fetch";
import { Response as NodeFetchResponse } from "node-fetch";
import jwt from "jsonwebtoken";

import { postgrestUrl, postgrestJwtSecret } from "../config";

export const POSTGREST_JSON_HEADERS = [
  "application/json",

  // https://postgrest.org/en/stable/api.html?highlight=vnd.pgrst.object%2Bjson#singular-or-plural
  "application/vnd.pgrst.object+json",
] as const;

type Resource = "users";

type Postgrest = {
  method: "get" | "post" | "create" | "delete";
  resource: Resource;
  body?: string | Record<string, any>;
  headers?: Record<string, string>;
};

const postgrest = async ({
  resource,
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
    response = await fetch(`${postgrestUrl}/${resource}`, {
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
    throw new Error(await response.text());
  } else {
    return response.text();
  }
};

type Create = {
  resource: Resource;
  payload: Record<string, string | number | boolean>;
};

export const create = async ({ resource, payload }: Create) =>
  await postgrest({ method: "post", resource, body: payload });

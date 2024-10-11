import fetch from 'node-fetch';
import { Response as NodeFetchResponse } from 'node-fetch';
import jwt from 'jsonwebtoken';

import { postgrestUrl, postgrestJwtSecret } from '../config';
import { HTTPError } from '../error';
import { query } from 'express';

export const POSTGREST_JSON_HEADERS = [
  'application/json',

  // https://postgrest.org/en/stable/api.html?highlight=vnd.pgrst.object%2Bjson#singular-or-plural
  'application/vnd.pgrst.object+json',
] as const;

type Resource = 'users';

type Postgrest = {
  method?: 'get' | 'post' | 'create' | 'delete';
  resource: Resource;
  payload?: string | Record<string, any>;
  headers?: Record<string, string>;
  query?: Record<string, string>;
};

const postgrest = async ({
  resource,
  method,
  payload,
  headers,
  query,
}: Postgrest): Promise<Promise<unknown>> => {
  const signedJwt = jwt.sign(
    { role: 'postgrest_authenticator' },
    postgrestJwtSecret
  );

  let response: NodeFetchResponse;

  try {
    response = await fetch(
      `${postgrestUrl}/${resource}?${new URLSearchParams(query).toString()}`,
      {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${signedJwt}`,
          ...headers,
        },
      }
    );
  } catch {
    throw new HTTPError('bad_request');
  }

  if (response.status >= 300) {
    throw new HTTPError('bad_request', await response.text());
  } else {
    return response.json();
  }
};

export const create = async ({ resource, payload }: Postgrest) =>
  await postgrest({ method: 'post', resource, payload });

export const getMany = async ({ resource, query, payload }: Postgrest) =>
  await postgrest({ method: 'get', resource, query, payload });

import * as t from 'io-ts';
import { decodeRequest, validateRequest } from './validation';
import { Request, Response } from 'express';
import { create, getMany } from '../../postgrest/index.f';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = id ? { id: `eq.${id}` } : undefined;

  const response = await getMany({
    resource: 'users',
    query,
  });

  return res.status(200).json({
    status: 'success',
    message: `Got user(s).`,
    data: response,
  });
};

export default getUser;

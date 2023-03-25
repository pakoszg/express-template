import * as t from "io-ts";
import { decodeRequest } from "./validation";
import { Request, Response } from "express";
import { create } from "../../postgrest/index.f";

const CreateUserRequest = t.type({
  id: t.string,
  created_at: t.string,
  username: t.string,
  password: t.string,
  email: t.string,
});

const createUser = async (req: Request, res: Response) => {
  const decodedBody = decodeRequest(CreateUserRequest, req.body);

  const { username, id } = decodedBody;

  await create({
    resource: "users",
    payload: decodedBody,
  });

  return res.status(200).json({
    status: "success",
    message: `New user (id:${id}) with name:${username} created`,
    data: {
      decodedBody,
    },
  });
};

export default createUser;

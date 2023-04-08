import * as t from "io-ts";
import { decodeRequest, validateRequest } from "./validation";
import { Request, Response } from "express";
import { create } from "../../postgrest/index.f";

const CreateUserRequest = t.type({
  id: t.string,
  created_at: t.string,
  username: t.string,
  password: t.string,
  email: t.string,
});

const createUser = validateRequest(
  CreateUserRequest,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { username, id } = req.body;

    const response = await create({
      resource: "users",
      payload: req.body,
    });

    console.log({ response });

    return res.status(200).json({
      status: "success",
      message: `New user (id:${id}) with name:${username} created`,
      data: {
        body: req.body,
      },
    });
  }
);

export default createUser;

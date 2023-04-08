import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";
import createUser from "../https/user/createUser.f";
import { asyncHandler } from "..";

const router = express.Router();

router.post("/create", asyncHandler(createUser));

export default router;

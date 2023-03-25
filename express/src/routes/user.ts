import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";
import createUser from "../https/user/createUser.f";

const router = express.Router();

const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// define the home page route
router.post("/create", asyncHandler(createUser));

export default router;

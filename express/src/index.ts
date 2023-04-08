import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import user from "./routes/user";
import errorMiddleware, { HttpStatusCode, IHTTPError } from "./error";

const app = express();
const port = 8000;

export const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.use(express.json()); // for application/json
app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.use("/user", user);
app.use(errorMiddleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

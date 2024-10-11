import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import user from './routes/user';
import errorMiddleware, { HttpStatusCode, IHTTPError } from './error';

const app = express();
const port = 8000;

app.use(express.json()); // for application/json
app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.use('/user(s)', user);
app.use(errorMiddleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

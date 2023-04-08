import express from "express";
import user from "./routes/user";
import errorMiddleware from "./error";

const app = express();
const port = 8000;

app.use(express.json()); // for application/json
app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.use("/user", user);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

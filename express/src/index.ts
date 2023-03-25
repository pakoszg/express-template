import express from "express";
import user from "./routes/user";
const app = express();
const port = 8000;

app.use(express.json()); // for application/json
app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.use("/user", user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

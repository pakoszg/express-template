import express from "express";
import createUser from "../https/user/createUser.f";
import { asyncHandler } from "../handlers";

const router = express.Router();

router.post("/create", asyncHandler(createUser));

export default router;

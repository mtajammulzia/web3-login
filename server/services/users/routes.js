import express from "express";

import * as controller from "./controller.js";

export const userRouter = express.Router();

userRouter.route("/:publicAddress").get(controller.fetch);

userRouter.route("/:publicAddress").post(controller.create);

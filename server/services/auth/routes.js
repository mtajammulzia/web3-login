import express from "express";

import * as controller from "./controller.js";

export const authRouter = express.Router();

authRouter.route("/").post(controller.authenticate);

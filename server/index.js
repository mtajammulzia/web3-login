import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { PORT, DB_URL } from "./utls/constants.js";
import { authRouter } from "./services/auth/routes.js";
import { userRouter } from "./services/users/routes.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL).then(console.log("Connected to DB"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

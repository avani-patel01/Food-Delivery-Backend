import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/index.js";
import { DB_URL } from "./config/index.js";

const app = express();

mongoose.connect(DB_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/", router);

app.listen(process.env.PORT || 8000, () => {
  console.clear();
  console.log(`port ${process.env.PORT || 8000} running.....`);
});

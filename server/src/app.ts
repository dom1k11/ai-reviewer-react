import express from "express";
import cors from "cors";
import { CORS_ORIGIN, CORS_METHODS, CORS_HEADERS } from "./cors_config";
import reviewRoute from "./routes/review";
import authRoute from "./routes/authentication";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHODS,
    allowedHeaders: CORS_HEADERS,
  })
);

app.use(express.json());

app.use("/review", reviewRoute);
app.use("/auth", authRoute);

console.log(CORS_ORIGIN);

export default app;

import express, { type NextFunction } from "express";
import routes from "./routes";
import { timeLogger } from "./middlewares/timeLogger.middleware";

const app = express();

app.use(express.json());
app.use(timeLogger);

app.use("/api", routes);

export default app;

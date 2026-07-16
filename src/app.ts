import express from "express";
import { timeLogger } from "./middlewares/timeLogger.middleware";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(timeLogger);

app.use("/api", routes);

export default app;

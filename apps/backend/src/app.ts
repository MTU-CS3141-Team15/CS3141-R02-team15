import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

void app.get("/", (req, res) => {
  res.send({ status: "success" });
});

export default app;

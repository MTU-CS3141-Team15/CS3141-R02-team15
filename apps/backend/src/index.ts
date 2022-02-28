import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "compression";

dotenv.config();

const PORT = process.env.PORT || 8081;

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

void app.get("/", (req, res) => {
  res.send({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

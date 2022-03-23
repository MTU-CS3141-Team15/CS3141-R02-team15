import dotenv from "dotenv";

import app from "./app";
import { registerRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

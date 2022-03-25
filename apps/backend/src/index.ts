import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

import { config } from "./src/config/config.js";
import app from "./src/app.js";

const serverPort = config.port;
app.listen(serverPort, () => {
  console.log(`Server is listening on port ${serverPort}`);
});

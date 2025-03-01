import { config } from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/dbConn.js";
import logger from "./src/config/logger.js";

const startServer = async () => {
    try {
        await connectDB();

        const serverPort = config.port || 5000;

        app.listen(serverPort, () => {
            logger.info("Server listening on port", { port: serverPort });
        });
    } catch (error) {
        console.log(`Server not able to run!!!`);
        logger.error("Server not able to run!!!", { error });
    }
};

startServer();

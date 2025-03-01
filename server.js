import { config } from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/dbConn.js";

const startServer = async () => {
    try {
        await connectDB();

        const serverPort = config.port || 5000;

        app.listen(serverPort, () => {
            console.log(`Server is listening on port ${serverPort}`);
        });
    } catch (error) {
        console.log(`Server not able to run!!!`);
    }
};

startServer();

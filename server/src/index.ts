import express from "express";
import {connectToDB} from "./config";
import { ENV } from "./config";
import routes from "./routes";

const app = express();

app.use('/api/v1', routes);

connectToDB();

app.listen(ENV.PORT, () => {
    console.log("🟢 Server is running on port 4000");
});
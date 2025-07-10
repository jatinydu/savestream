import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {connectToDB} from "./config";
import { ENV } from "./config";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use('/api/v1', routes);

connectToDB();

app.listen(ENV.PORT, () => {
    console.log("🟢 Server is running on port 4000");
});
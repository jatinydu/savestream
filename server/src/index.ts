import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {connectToDB} from "./config";
import { ENV } from "./config";
import routes from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: ENV.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use('/api/v1', routes);

connectToDB();

app.listen(ENV.PORT, () => {
    console.log("🟢 Server is running on port 4000");
});
import express from "express";
import {connectToDB} from "./config";
const app = express();

connectToDB();

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
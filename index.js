import "dotenv/config";

import urlRoute from "./routes/url.route.js";
import connectToDB from "./configs/db.js";

import express from "express";
const PORT = process.env.PORT || 8001;

connectToDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Hello from short-url." });
});

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
import "dotenv/config";

import urlRoute from "./routes/url.route.js";
import userRoute from "./routes/user.route.js";
import connectToDB from "./configs/db.js";

import express from "express";
import { authenticate } from "./middlewares/auth.js";
const PORT = process.env.PORT || 8001;

connectToDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Hello from short-url." });
});

app.use("/url", authenticate, urlRoute);
app.use("/auth", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
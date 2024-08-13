import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import { signUp, logIn } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", asyncMiddleware(signUp));
router.post("/login", asyncMiddleware(logIn));

export default router;
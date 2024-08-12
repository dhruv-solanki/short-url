import express from "express";
import asyncMiddleware from "../middlewares/async";
import { signUp, logIn } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", asyncMiddleware(signUp));
router.post("/login", asyncMiddleware(logIn));

export default router;
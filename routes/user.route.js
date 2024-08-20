import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import { signUp, logIn, uploadProfileImage, getUserProfileImage } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", asyncMiddleware(signUp));
router.post("/login", asyncMiddleware(logIn));
router.post("/upload-profile-image", [
    authenticate, 
    upload.single("profileImage")
], asyncMiddleware(uploadProfileImage));
router.get("/get-profile-image", authenticate, asyncMiddleware(getUserProfileImage));

export default router;
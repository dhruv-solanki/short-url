import express from "express";
import { 
    generateNewShortURL, 
    redirectToOriginalURL,
    getAnalyticsOfURL,
} from "../controllers/url.controller.js";
import asyncMiddleware from "../middlewares/async.js";

const router = express.Router();

router.get("/:shortId", asyncMiddleware(redirectToOriginalURL));
router.post("/", asyncMiddleware(generateNewShortURL));
router.get("/analytics/:shortId", asyncMiddleware(getAnalyticsOfURL));

export default router;
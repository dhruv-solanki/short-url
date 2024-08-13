import express from "express";
import { 
    generateNewShortURL, 
    redirectToOriginalURL,
    getAnalyticsOfURL,
    getAllURLs,
} from "../controllers/url.controller.js";
import asyncMiddleware from "../middlewares/async.js";

const router = express.Router();

router.get("/", asyncMiddleware(getAllURLs));
router.post("/", asyncMiddleware(generateNewShortURL));
router.get("/:shortId", asyncMiddleware(redirectToOriginalURL));
router.get("/analytics/:shortId", asyncMiddleware(getAnalyticsOfURL));

export default router;
import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export async function redirectToOriginalURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    if(!entry) return res.status(400).json({ error: "Unable to find original URL" });

    res.redirect(entry.originalURL);
}

export async function generateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        originalURL: body.url,
        visitHistory: [],
    });

    return res.json({ shortId: shortId });
}

export async function getAnalyticsOfURL(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if(!result) return res.status(400).json({ error: "Unable to find URL" });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
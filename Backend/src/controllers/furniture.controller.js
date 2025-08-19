import axios from "axios";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const KEY = process.env.FREEPIK_API_KEY;

let cache = {
    timestamp: 0,
    data: [],
};
const CACHE_TTL = 1000 * 60 * 30; // 30 min

/**
 * Fetch furniture items from Freepik API
 * Transform into a minimal shape for frontend toolbox
 */
export const getFurniture = asyncHandler(async (_req, res) => {
    // Serve cached if fresh
    if (Date.now() - cache.timestamp < CACHE_TTL && cache.data.length > 0) {
        return res.json(new ApiResponse(200, cache.data, "Furniture fetched from cache"));
    }

    if (!KEY) throw new ApiError(500, "Freepik API key not configured");

    try {
        // Example request: search furniture vectors
        const url = `https://api.freepik.com/v1/resources`;
        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${KEY}` },
            params: {
                term: "furniture",
                filters: "type:vector", // adjust as needed
                limit: 30,
            },
        });

        const items = Array.isArray(data?.data)
            ? data.data.map((item) => ({
                id: item.id,
                name: item.title || "Furniture",
                thumbnail: item.thumbnail_url || item.preview_url || "",
                src: item.preview_url || item.thumbnail_url || "",
            }))
            : [];

        cache = { timestamp: Date.now(), data: items };

        return res.json(new ApiResponse(200, items, "Furniture fetched successfully"));
    } catch (err) {
        console.error("Freepik API error:", err?.response?.data || err.message);
        throw new ApiError(502, "Failed to fetch furniture items");
    }
});

import { generateRoomDesign } from "../utils/aiService.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const aiRedesign = asyncHandler(async (req, res) => {
    const { imageUrl, prompt } = req.body

    if (!imageUrl || !prompt) {
        throw new ApiError(400, "Image URL and prompt are required")
    }

    const aiImageUrl = await generateRoomDesign(imageUrl, prompt)

    return res.json(
        new ApiResponse(200, { aiImageUrl }, "AI room redesign generated")
    )
})

export { aiRedesign }
import { Design } from "../models/Design.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const saveDesign = asyncHandler(async (req, res) => {
    let imageUrl = null

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.path)
        if (result?.secure_url) {
            imageUrl = result.secure_url
        }
    }

    const design = await Design.create({
        user: req.user._id,
        title: req.body.title || "Untitled",
        imageUrl,
        furnitureData: req.body.furnitureData ? JSON.parse(req.body.furnitureData) : {}
    })

    return res
        .status(201)
        .json(new ApiResponse(201, design, "Design saved successfully"))
})

const getUserDesigns = asyncHandler(async (req, res) => {
    const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 })
    return res.json(
        new ApiResponse(200, designs, "User designs retrieved successfully")
    )
})

export {
    saveDesign,
    getUserDesigns
}

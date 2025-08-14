import { Design } from "../models/Design.models.js"
import { cloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const saveDesign = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "No image file uploaded")
    }

    const result = await cloudinary.uploader.upload(req.file.path)

    const design = await Design.create({
        user: req.user,
        title: req.body.title,
        imageUrl: result.secure_url,
        furnitureData: req.body.furnitureData || {}
    })

    return res
        .status(201)
        .json(new ApiResponse(201, design, "Design saved successfully"))
})

const getUserDesigns = asyncHandler(async (req, res) => {
    const designs = await Design.find({ user: req.user })
    return res.json(
        new ApiResponse(200, designs, "User designs retrieved successfully")
    )
})

export {
    saveDesign,
    getUserDesigns
}
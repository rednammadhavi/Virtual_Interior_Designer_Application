import mongoose from "mongoose"

const designSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        furnitureData: {
            type: Object,
            default: {}
        }
    },
    { timestamps: true }
)

export const Design = mongoose.model("Design", designSchema)

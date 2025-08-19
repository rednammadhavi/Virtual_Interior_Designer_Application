import { ApiError } from "../utils/apiError.js"

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Something went wrong",
            errors: err.errors || []
        })
    }

    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    console.error(err)
    return res.status(statusCode).json({
        success: false,
        message
    })
}

import jwt from "jsonwebtoken"
import { User } from "../models/User.models.js"
import { ApiError } from "../utils/apiError.js"

const verifyJwt = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        const token = header?.split(" ")[1] || req.cookies?.accessToken

        if (!token) {
            throw new ApiError(401, "Not authorized")
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded?._id) {
            throw new ApiError(401, "Invalid token payload")
        }

        const user = await User.findById(decoded._id).select("-password -refreshToken")
        if (!user) throw new ApiError(401, "User not found")

        req.user = user
        next()
    } catch (err) {
        const message = err.name === "TokenExpiredError" ? "Token expired" : (err.message || "Authentication failed")
        return res.status(401).json({ message })
    }
}

export { verifyJwt }

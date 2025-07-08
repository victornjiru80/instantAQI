import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'


const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
        req.user = user
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }
        res.status(500).json({ message: error.message })
    }
}

export default userAuth;
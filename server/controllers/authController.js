import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        // check if user already exists
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ name, email, password: hashedPassword });

        await newUser.save();
        // generate token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // send token in response
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ message: 'User created successfully', user: newUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        // check if user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        // send token in response
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'Login successful', userId: user._id })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const isAuth = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        res.status(200).json({ message: 'User is authenticated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const bcrypt = require('bcrypt');
const User = require('../schema/User');
const RefreshToken = require('../schema/RefreshToken');
const { generateAccessToken, generateRefreshToken, getTokenExpiry, verifyRefreshToken } = require('../utils');

// Register a new user
const register = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is empty',
            });
        }

        const { firstName, lastName, email, role = 'User', password = 'Password123' } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: firstName, lastName, email',
            });
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                success: false,
                message: 'User Already Exist. Please Login',
            });
        }

        // Hash password before saving it to the database
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

// Login with an existing user
const login = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is empty',
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: email, password',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Compare the given password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id.toString(), user.email, user.role);
        const refreshToken = generateRefreshToken(user._id.toString());

        // Save refresh token to database
        const tokenExpiry = getTokenExpiry(process.env.REFRESH_TOKEN_EXPIRY || '1d');
        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + tokenExpiry),
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user.toJSON(),
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

// Refresh Access Token with an existing user
const refresh_token = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required',
            });
        }

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required',
            });
        }

        // Verify refresh token signature
        const decoded = verifyRefreshToken(refreshToken, res);

        // Check if token exists and is not revoked in database
        const storedToken = await RefreshToken.findOne({
            userId: decoded.userId,
            token: refreshToken,
            revokedAt: null
        });

        if (!storedToken) {
            return res.status(403).json({
                success: false,
                message: 'Refresh token is invalid or has been revoked',
            });
        } else if (storedToken.expiresAt < new Date()) { // Check if token has expired
            return res.status(401).json({
                success: false,
                message: 'Refresh token has expired',
            });
        }
        
        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found or inactive',
            });
        }

        // Revoke old refresh token
        storedToken.revokedAt = new Date();
        await storedToken.save();

        // Generate new tokens
        const newAccessToken = generateAccessToken(user._id.toString(), user.email, user.role);
        const newRefreshToken = generateRefreshToken(user._id.toString());

        // Save new refresh token
        const tokenExpiry = getTokenExpiry(process.env.REFRESH_TOKEN_EXPIRY || '1d');
        await RefreshToken.create({
            userId: user._id,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + tokenExpiry)
        });

        res.status(200).json({
            success: true,
            message: 'Refresh token generated successfully',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, refresh_token };

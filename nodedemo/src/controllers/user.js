const bcrypt = require('bcrypt');

const User = require('../schema/User');
const RefreshToken = require('../schema/RefreshToken');

// Get user by ID
const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

// create user information
const createUser = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is empty',
            });
        }

        const { firstName, lastName, email, role, password = 'Password123' } = req.body;
        if (!firstName || !lastName || !email || !role) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: firstName, lastName, email, role',
            });
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                success: false,
                message: 'Email Already Exist. Please try using another email',
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
            message: 'User created successfully',
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

// Update user information
const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const allowedFields = ['firstName', 'lastName', 'role'];
        const updates = {};

        Object.keys(updateData).forEach((key) => {
            if (allowedFields.includes(key)) {
                updates[key] = updateData[key];
            }
        });

        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Delete all refresh tokens for the user
        await RefreshToken.deleteMany({ userId });

        // Delete the user
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw res.status(404).json({
                success: true,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};

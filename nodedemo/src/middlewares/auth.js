const User = require('../schema/User');
const { verifyAccessToken } = require('../utils');

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const token = authorization.substring(7); // Remove 'Bearer ' prefix

        const decoded = verifyAccessToken(token, res);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authenticate };

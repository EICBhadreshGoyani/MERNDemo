const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, email, role) => {
  const payload = {
    userId,
    email,
    role,
    type: 'access'
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1m',
    algorithm: 'HS256'
  });

  return token;
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: 'refresh'
  };

  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '1d',
    algorithm: 'HS256'
  });

  return token;
};

const getTokenExpiry = (expiryString) => {
  const multiplier = {
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 24 * 60 * 60 * 1000 // days
  };

  const match = expiryString.match(/^(\d+)([mhd])$/);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2];

  return value * multiplier[unit];
};

const verifyAccessToken = (token, res) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      algorithms: ['HS256']
    });

    if (decoded.type !== 'access') {
      throw res.status(401).json({
        success: false,
        message: 'Invalid token type',
      });
    }

    return decoded;
  } catch (error) {
    throw res.status(401).json({
      success: false,
      message: 'Invalid access token',
    });
  }
};


const verifyRefreshToken = (token, res) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {
      algorithms: ['HS256']
    });

    if (decoded.type !== 'refresh') {
      throw res.status(401).json({
        success: false,
        message: 'Invalid token type',
      });
    }

    return decoded;
  } catch (error) {
    throw res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
    });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getTokenExpiry,
  verifyAccessToken,
  verifyRefreshToken,
};

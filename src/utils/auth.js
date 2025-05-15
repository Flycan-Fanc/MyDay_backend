const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * 生成token
 * @param userId
 * @returns {*}
 */
const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

/**
 * 验证token
 * @param token
 * @returns {*}
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
/**
 * 用户认证保护中间件
 * @author：flycan-fanc
 */

const { verifyToken } = require('../utils/auth');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = await User.getUserById(decoded.userId);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

exports.protectPicture = async (req, res, next) => {
    const token = req.query.token; // 从URL获取token
    if(!token) res.status(403).json({ message: 'Not authorized' });
    try {
        const decoded = verifyToken(token);
        req.user = await User.getUserById(decoded.userId);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}
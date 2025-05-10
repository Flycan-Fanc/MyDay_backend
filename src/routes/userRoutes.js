/**
 * @description 用户路由
 * @author: flycan-fanc
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    verifyToken,
    register,
    login,
    getUserInfo,
    getUserAvatar,
    updateUserInfo,
    updatePassword,
    deleteUser,
} = require('../controllers/userController');

// 公开路由
router.post('/register', register);
router.post('/login', login);

// 需要认证的路由
router.post('/auth', protect, verifyToken)
router.get('/userInfo', protect, getUserInfo);
router.get('/avatar', protect, getUserAvatar);
router.post('/userInfo', protect, updateUserInfo);
router.post('/password', protect, updatePassword);
router.delete('/:userId', protect, deleteUser);

module.exports = router;
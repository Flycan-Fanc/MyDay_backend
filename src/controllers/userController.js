/**
 * 用户接口
 * @author: flycan-fanc
 */

const userService = require('../services/userService');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');
const { AppError } = require('../utils/errors');

/**
 * 用于验证token成功时返回用户信息
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.verifyToken = async (req, res, next) => {
    try {
        res.status(201).json({ user: req.user }); // 返回用户信息
    } catch (err) {
        next(err);
    }

}

/**
 * 用户注册
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        const token = generateToken(user.userId);
        console.log('userId: ', user.userId);
        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
};

/**
 * 用户登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.login = async (req, res, next) => {
    try {
        const { userAccount, password } = req.body;
        if (!userAccount || !password) {
            throw new AppError('账号和密码必填', 400); // 参数校验
        }

        const result = await userService.login(userAccount, password);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};


/**
 * 获取用户信息
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUserInfo = async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
};


exports.getUserAvatar = async (req, res) => {
    //Todo:获取用户头像
}

/**
 * 更新用户信息(不包含密码)
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateUserInfo = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.body);
        res.json(user);
    } catch(err) {
        next(err)
    }
}

/**
 * 修改用户密码
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await userService.updatePassword(req.body);
        res.json(user);
    } catch(err) {
        next(err)
    }
}

/**
 * 注销用户
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.userId);
        res.json(user);
    } catch (err) {
        next(err)
    }
}


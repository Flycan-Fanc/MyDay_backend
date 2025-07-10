/**
 * 用户业务逻辑
 * @type {{}}
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');
const { NotFoundError, AuthError } = require('../utils/errors');

/**
 * 用户注册
 * @param userData
 * @returns {Promise<{userAccount:string, userId: string, email:string}>}
 */
exports.register = async (userData) => {
    // 检查账户是否存在
    const existingAccount = await User.getUserByUserAccount(userData.userAccount);
    // 检查邮箱是否已存在
    const existingEmail = await User.getUserByEmail(userData.email);
    if (existingAccount) {
        throw new Error('账户已存在');
    }
    if (existingEmail) {
        throw new Error('邮箱已存在');
    }

    // 创建用户
    return await User.createUser(userData);
};

/**
 * 用户登录
 * @param userAccount
 * @param password
 * @returns {Promise<{user: {avatarId, createTime, userAccount: *, userName, userRole, userId: *, email: *, userProfile, isVip}, token: *}>}
 */
exports.login = async (userAccount, password) => {
    // 检查用户是否存在
    const user = await User.getUserByUserAccount(userAccount);
    if (!user) throw new NotFoundError('用户不存在');

    const isDelete = await User.isDeleteByUserAccount(userAccount)
    if(isDelete === 1) throw new AuthError('用户已注销');

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AuthError('密码错误');

    // 生成 Token
    const token = generateToken(user.userId);
    console.log('avatarId', user.avatarId)
    return { user: {
                userId: user.userId, userAccount:user.userAccount, email: user.email, userName: user.userName,
                avatarId: user.avatarId, userProfile: user.userProfile, userRole: user.userRole , isVip: user.isVip,
                createTime: user.createTime
            }, token };
};

/**
 * 更新用户信息（不包括密码）
 * @param userData
 * @returns {Promise<*>}
 */
exports.updateUser = async (userData) => {
    // 检查用户是否存在
    console.log('userData',userData)
    const user = await User.getUserById(userData.userId);
    if (!user) throw new Error('用户不存在');

    const isDelete = await User.isDeleteByUserAccount(userData.userAccount)
    if(isDelete === 1) throw new Error('用户已注销');

    // 验证密码
    // const isMatch = await bcrypt.compare(userData.password, user.password);
    // if (!isMatch) throw new Error('密码错误');

    return await User.updateUser(userData.userId, userData.userAccount, userData.email, userData.userName, userData.avatarId, userData.userProfile);
}

/**
 * 更新用户密码
 * @param userId
 * @param oldPassword
 * @param newPassword
 * @returns {Promise<*>}
 */
exports.updatePassword = async ({userId, oldPassword, newPassword}) => {
    // 检查用户是否存在
    const user = await User.getUserById(userId);
    if (!user) throw new Error('用户不存在');

    const isDelete = await User.isDeleteById(userId)
    if(isDelete === 1) throw new Error('用户已注销'); 

    // 验证密码
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error('原密码错误');

    return await User.updateUserPassword(userId, newPassword);
}

/**
 * 根据id注销用户
 * @param userId
 * @returns {Promise<{userId}|*>}
 */
exports.deleteUser = async (userId) => {
    // 检查用户是否存在
    const user = await User.getUserById(userId);
    if (!user) throw new Error('用户不存在');

    const isDelete = await User.isDeleteById(userId)
    if(isDelete === 1) throw new Error('用户已注销');

    return await User.deleteUser(userId);
}


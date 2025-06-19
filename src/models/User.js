/**
 * 用户模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
require('dotenv').config();

class User {
    /**
     * 创建用户
     * @param userAccount
     * @param email
     * @param password
     * @returns {Promise<{userAccount, userId: string, email}>}
     */
    static async createUser({ userAccount, email, password }){
        const encodedPassword = await bcrypt.hash(password, 10);
        const userId = nanoid();
        const [result] = await pool.execute(
            'INSERT INTO user (userId, userAccount, email, password) VALUES (?, ?, ?, ?)',
            [userId, userAccount, email, encodedPassword]
        );
        return { userId, userAccount, email};
    }

    /**
     * 根据id查找用户
     * @param userId
     * @returns {Promise<*>}
     */
    static async getUserById(userId){
        const [result] = await pool.execute(
            'SELECT * FROM user WHERE userId = ?',
            [userId]
        )
        return result[0];
    }

    /**
     * 根据账户查找用户
     * @param userAccount
     * @returns {Promise<*>}
     */
    static async getUserByUserAccount(userAccount){
        const [result] = await pool.execute(
            'SELECT * FROM user WHERE userAccount = ?',
            [userAccount]
        )
        return result[0];
    }

    /**
     * 根据邮箱查找用户
     * @param email
     * @returns {Promise<*>}
     */
    static async getUserByEmail(email){
        const [result] = await pool.execute(
            'SELECT * FROM user WHERE email = ?',
            [email]
        )
        return result[0];
    }

    /**
     * 根据用户id检查用户是否删除
     * @param userId
     * @returns {Promise<*>}
     */
    static async isDeleteById(userId){
        const [result] = await pool.execute(
            'SELECT isDelete FROM user WHERE userId = ?',
            [userId]
        )
        return result[0];
    }

    /**
     * 根据账户检查用户是否删除
     * @param userAccount
     * @returns {Promise<*>}
     */
    static async isDeleteByUserAccount(userAccount){
        const [result] = await pool.execute(
            'SELECT isDelete FROM user WHERE userAccount = ?',
            [userAccount]
        )
        return result[0];
    }

    /**
     * 修改用户信息(不过包含密码)
     * @param userId
     * @param userAccount
     * @param email
     * @param userName
     * @param avatarId
     * @param userProfile
     * @returns {Promise<*>}
     */
    static async updateUser(userId, userAccount, email, userName, avatarId=null, userProfile){
        if(avatarId === ''){
            avatarId = null;
        }
        const [result] = await pool.execute(
            'UPDATE user SET userAccount = ?, email = ?, userName = ?, avatarId = ?, userProfile = ? WHERE userId = ?',
            [userAccount, email, userName, avatarId, userProfile, userId]
        )
        return result[0];
    }

    /**
     * 修改用户密码
     * @param userId
     * @param password
     * @returns {Promise<*>}
     */
    static async updateUserPassword(userId, password){
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT) || 10);
        const encodedPassword = await bcrypt.hash(password, salt);
        const [result] = await pool.execute(
            'UPDATE user SET password = ? WHERE userId = ?',
            [encodedPassword, userId]
        )
        return result[0];
    }

    /**
     * 根据id删除用户（标记删除）
     * @param userId
     * @returns {Promise<{userId}>}
     */
    static async deleteUser(userId){
        const [result] = await pool.execute(
            'UPDATE user SET isDelete = 1 WHERE userId = ?',
            [userId]
        )
        return {userId};
    }
}

module.exports = User;
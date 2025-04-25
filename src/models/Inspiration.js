/**
 * 灵感模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class Inspiration {
    /**
     * 创建灵感
     * @param userId
     * @param insTitle
     * @param insContent
     * @param insDate
     * @returns {Promise<{insId: string, insDate, insContent, userId, insTitle}>}
     */
    static async createIns({userId, insTitle, insContent, insDate}){
        const insId = nanoid();
        const [ins] = await pool.execute(
            'INSERT INTO inspiration (insId, userId, insTitle, insContent, insDate) VALUES (?, ?, ?, ?, ?)',
            [insId, userId, insTitle, insContent, insDate]
        )
        return {insId, userId, insTitle, insContent, insDate}
    }

    /**
     * 根据灵感id获取灵感
     * @param insId
     * @returns {Promise<*>}
     */
    static async getInsById(insId){
        const [ins] = await pool.execute(
            'SELECT * FROM inspiration WHERE insId = ?',
            [insId]
        )
        return ins[0]
    }

    /**
     * 根据用户id获取灵感列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getInsListByUserId(userId){
        const [insList] = await pool.execute(
            'SELECT insId, userId, insTitle, insContent, insDate  FROM inspiration WHERE userId = ?',
            [userId]
        )
        return insList
    }

    /**
     * 修改灵感
     * @param insId
     * @param insTitle
     * @param insContent
     * @param insDate
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updateIns({insId, insTitle, insContent, insDate}){
        const [ins] = await pool.execute(
            'UPDATE inspiration SET insTitle = ?, insContent = ?, insDate = ? WHERE insId = ?',
            [insTitle, insContent, insDate, insId]
        )
        return ins
    }

    /**
     * 删除灵感
     * @param insId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deleteIns(insId){
        const [ins] = await pool.execute(
            'DELETE FROM inspiration WHERE insId = ?',
            [insId]
        )
        return ins
    }
}

module.exports = Inspiration;
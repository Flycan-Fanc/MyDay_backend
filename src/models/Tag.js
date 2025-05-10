/**
 * 标签模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class Tag {
    /**
     * 增加标签
     * @param {userId, tagName, color}
     * @param tagName
     * @param color
     * @returns {Promise<{color, tagId: string, tagName, userId}>}
     */
    static async createTag({userId, tagName, color}){
        const tagId = nanoid();
        const [tag] = await pool.execute(
            'INSERT INTO tag (tagId, userId, tagName, color) VALUES (?, ?, ?, ?)',
            [tagId, userId, tagName, color]
        )
        return {tagId, userId, tagName, color}
    }

    /**
     * 根据标签id获取标签
     * @param tagId
     * @returns {Promise<*>}
     */
    static async getTagById(tagId){
        const [tag] = await pool.execute(
            'SELECT * FROM tag WHERE tagId = ?',
            [tagId]
        )
        return tag[0]
    }

    /**
     * 根据用户id获取标签列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getTagListByUserId(userId){
        const [tags] = await pool.execute(
            'SELECT * FROM tag WHERE userId = ?',
            [userId]
        )
        return tags
    }

    /**
     * 修改标签
     * @param tagId
     * @param tagName
     * @param color
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updateTag({tagId, tagName, color}){
        const [tag] = await pool.execute(
            'UPDATE tag SET tagName = ?, color = ? WHERE tagId = ?',
            [tagName, color, tagId]
        )
        return tag
    }

    /**
     * 删除标签
     * @param tagId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deleteTag(tagId){
        const [tag] = await pool.execute(
            'DELETE FROM tag WHERE tagId = ?',
            [tagId]
        )
        return tag
    }
}

module.exports = Tag;
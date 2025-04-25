/**
 * 灵感-标签关联模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class InsTag {
    /**
     * 添加 灵感-标签 关联项
     * @param insId
     * @param tagId
     * @returns {Promise<{insId, tagId, id: string}>}
     */
    static async createInsTag({insId, tagId}) {
        const id = nanoid();
        const [result] = await pool.execute(
            'INSERT INTO instag (id, insId, tagId) VALUES (?, ?, ?)',
            [id, insId, tagId]
        );
        return {id, insId, tagId};
    }

    /**
     * 根据 灵感id获取 灵感标签关联项 列表
     * @param insId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getInsTagByInsId(insId){
        const [result] = await pool.execute(
            'SELECT * FROM instag WHERE insId = ?',
            [insId]
        )
        return result;
    }

    /**
     * 根据标签id删除 灵感标签关联项
     * @param insId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deleteInsTag(tagId) {
        const [result] = await pool.execute(
            'DELETE FROM instag WHERE tagId = ?',
            [tagId]
        )
        return result;
    }

    /**
     * 根据灵感id删除 灵感标签关联项
     * @param insId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deleteInsTagByInsId(insId) {
        const [result] = await pool.execute(
            'DELETE FROM instag WHERE insId = ?',
            [insId]
        )
        return result;
    }
}

module.exports = InsTag;
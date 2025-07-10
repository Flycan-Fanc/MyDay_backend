/**
 * 计划-标签关联模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class PlanTag {
    /**
     * 添加 计划-标签 关联项
     * @param planId
     * @param tagId
     * @returns {Promise<{tagId, planId, id: string}>}
     */
    static async createPlanTag({planId, tagId}) {
        const id = nanoid();
        const [result] = await pool.execute(
            'INSERT INTO plantag (id, planId, tagId) VALUES (?, ?, ?)',
            [id, planId, tagId]
        );
        return {id, planId, tagId};
    }

    /**
     * 更新 计划-标签 关联项
     * @param id
     * @param planId
     * @param tagId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updatePlanTag({id, planId, tagId}){
        const [result] = await pool.execute(
            'UPDATE plantag SET planId = ?, tagId = ? WHERE id = ?',
            [id, planId, tagId]
        );
        return result;
    }

    /**
     * 根据 计划id获取 计划标签关联项 列表
     * @param planId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getPlanTagByPlanId(planId){
        const [result] = await pool.execute(
            'SELECT * FROM plantag WHERE planId = ?',
            [planId]
        )
        return result;
    }

    /**
     * 根据标签id删除 计划标签关联项
     * @param tagId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deletePlanTag(tagId) {
        const [result] = await pool.execute(
            'DELETE FROM plantag WHERE tagId = ?',
            [tagId]
        )
        return result;
    }

    /**
     * 根据计划id删除 计划标签关联项
     * @param planId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deletePlanTagByPlanId(planId) {
        const [result] = await pool.execute(
            'DELETE FROM plantag WHERE planId = ?',
            [planId]
        )
        return result;
    }
}

module.exports = PlanTag;
/**
 * 计划模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class Plan {
    /**
     * 创建计划
     * @param userId
     * @param planContent
     * @param isDone
     * @param isTop
     * @param startTime
     * @param endTime
     * @returns {Promise<{isTop, planContent, planId: string, startTime, endTime, userId, isDone}>}
     */
    static async createPlan({planId, userId, planContent, isDone, isTop, startTime = null, endTime = null}){
        endTime = endTime === '' ? null : endTime;
        const [plan] = await pool.execute(
            'INSERT INTO plan (planId, userId, planContent, isDone, isTop, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [planId, userId, planContent, isDone, isTop, startTime, endTime]
        )
        return {planId, userId, planContent, isDone, isTop, startTime, endTime}
    }

    /**
     * 根据计划id获取计划
     * @param planId
     * @returns {Promise<*>}
     */
    static async getPlanById(planId){
        const [plan] = await pool.execute(
            'SELECT * FROM plan WHERE planId = ?',
            [planId]
        )
        return plan[0]
    }

    /**
     * 根据用户id获取计划列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getPlanListByUserId(userId){
        const [plans] = await pool.execute(
            'SELECT planId, userId, planContent, isDone, isTop, startTime, endTime  FROM plan WHERE userId = ?',
            [userId]
        )
        return plans
    }

    /**
     * 修改计划
     * @param planId
     * @param planContent
     * @param isDone
     * @param isTop
     * @param startTime
     * @param endTime
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updatePlan({planId, planContent, isDone, isTop, startTime = null , endTime = null }){
        endTime = endTime === '' ? null : endTime;
        const [plan] = await pool.execute(
            'UPDATE plan SET planContent = ?, isDone = ?, isTop = ?, startTime = ?, endTime = ? WHERE planId = ?',
            [planContent, isDone, isTop, startTime, endTime, planId]
        )
        return plan
    }

    /**
     * 删除计划
     * @param planId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deletePlan(planId){
        const [plan] = await pool.execute(
            'DELETE FROM plan WHERE planId = ?',
            [planId]
        )
        return plan
    }
}

module.exports = Plan;
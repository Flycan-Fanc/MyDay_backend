/**
 * 日记模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class Diary {
    /**
     * 创建日记
     * @param userId
     * @param diaryTitle
     * @param diaryContent
     * @param diaryDate
     * @returns {Promise<{diaryTitle, diaryDate, diaryId: string, diaryContent, userId}>}
     */
    static async createDiary({diaryId, userId, diaryTitle, diaryContent, diaryDate}){
        const [diary] = await pool.execute(
            'INSERT INTO diary (diaryId, userId, diaryTitle, diaryContent, diaryDate) VALUES (?, ?, ?, ?, ?)',
            [diaryId, userId, diaryTitle, diaryContent, diaryDate]
        )
        return {diaryId, userId, diaryTitle, diaryContent, diaryDate}
    }

    /**
     * 根据日记id获取日记
     * @param diaryId
     * @returns {Promise<*>}
     */
    static async getDiaryById(diaryId){
        const [diary] = await pool.execute(
            'SELECT * FROM diary WHERE diaryId = ?',
            [diaryId]
        )
        return diary[0]
    }

    /**
     * 根据用户id获取日记列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getDiaryListByUserId(userId){
        const [diaries] = await pool.execute(
            'SELECT diaryId, userId, diaryTitle, diaryContent, diaryDate  FROM diary WHERE userId = ?',
            [userId]
        )
        return diaries
    }

    /**
     * 修改日记
     * @param diaryId
     * @param diaryTitle
     * @param diaryContent
     * @param diaryDate
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updateDiary({diaryId, diaryTitle, diaryContent, diaryDate}){
        const [diary] = await pool.execute(
            'UPDATE diary SET diaryTitle = ?, diaryContent = ?, diaryDate = ? WHERE diaryId = ?',
            [diaryTitle, diaryContent, diaryDate, diaryId]
        )
        return diary
    }

    /**
     * 删除日记
     * @param diaryId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deleteDiary(diaryId){
        const [diary] = await pool.execute(
            'DELETE FROM diary WHERE diaryId = ?',
            [diaryId]
        )
        return diary
    }
}

module.exports = Diary;
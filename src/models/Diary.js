/**
 * 日记模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const bcrypt = require('bcrypt');
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
    static async createDiary({userId, diaryTitle, diaryContent, diaryDate}){
        const diaryId = nanoid();
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
        const [diaries] = await pool.execute(
            'SELECT * FROM diary WHERE diaryId = ?',
            [diaryId]
        )
        return diaries[0]
    }

    /**
     * 根据用户id获取日记列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getDiaryByUserId(userId){
        const [diaries] = await pool.execute(
            'SELECT diaryId, userId, diartTitle, diaryContent, diaryDate  FROM diary WHERE userId = ?',
            [userId]
        )
        return diaries
    }
}

module.exports = Diary;
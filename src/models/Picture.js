/**
 * 图片模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class Picture {
    /**
     * 创建图片
     * @param userId
     * @param diaryId
     * @param insId
     * @param pictureName
     * @param pictureData
     * @param isAvatar
     * @param isCover
     * @param fileScale
     * @returns {Promise<{insId, pictureId: string, fileScale, diaryId, pictureData, pictureName, isAvatar, userId, isCover}>}
     */
    static async createPicture({userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale}){
        console.log({userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale})
        const pictureId = nanoid();
        try{
            const [picture] = await pool.execute(
                'INSERT INTO picture (pictureId, userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [pictureId, userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale]
            )
        } catch(err){
            console.log(err)
        }

        console.log(333)
        return {pictureId, userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale}
    }

    /**
     * 根据图片id获取图片
     * @param pictureId
     * @returns {Promise<*>}
     */
    static async getPictureById(pictureId){
        const [picture] = await pool.execute(
            'SELECT * FROM picture WHERE pictureId = ?',
            [pictureId]
        )
        return picture[0]
    }

    /**
     * 根据用户id获取图片列表
     * @param userId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async getPictureListByUserId(userId){
        const [pictures] = await pool.execute(
            'SELECT pictureId, userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale  FROM picture WHERE userId = ?',
            [userId]
        )
        return pictures
    }

    /**
     * 修改图片
     * @param pictureId
     * @param userId
     * @param diaryId
     * @param insId
     * @param pictureName
     * @param pictureData
     * @param isAvatar
     * @param isCover
     * @param fileScale
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async updatePicture({pictureId, userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale}){
        const [picture] = await pool.execute(
            'UPDATE picture SET userId=?, diaryId=?, insId=?, pictureName=?, pictureData=?, isAvatar=?, isCover=?, fileScale=? WHERE pictureId = ?',
            [userId, diaryId, insId, pictureName, pictureData, isAvatar, isCover, fileScale,pictureId]
        )
        return picture
    }

    /**
     * 删除日记
     * @param diaryId
     * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[], ResultSetHeader]>}
     */
    static async deletePicture(pictureId){
        const [picture] = await pool.execute(
            'DELETE FROM picture WHERE pictureId = ?',
            [pictureId]
        )
        return picture
    }
}

module.exports = Picture;
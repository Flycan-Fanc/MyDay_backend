/**
 * 日记服务
 * @type {{}}
 */

const Diary = require('../models/diary');
const User = require('../models/user');

/**
 * 创建日记
 * @param diaryData
 * @returns {Promise<{diaryTitle, diaryDate, diaryId: string, diaryContent, userId}|*>}
 */
exports.createDiary = async (diaryData) => {
    const existingUser = await User.getUserById(diaryData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(diaryData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await Diary.createDiary(diaryData);
}

/**
 * 根据日记id获取日记
 * @param diaryId
 * @returns {Promise<*>}
 */
exports.getDiaryById = async (diaryId) => {
    const diary =  await Diary.getDiaryById(diaryId);
    if(!diary) {
        throw new Error('日记不存在');
    }
    return diary;
}

/**
 * 根据用户id获取日记列表
 * @param userId
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.getDiaryListByUserId = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await Diary.getDiaryListByUserId(userId);
}

/**
 * 修改日记
 * @param diaryData
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.updateDiary = async (diaryData) => {
    const existingDiary = await Diary.getDiaryById(diaryData.diaryId);
    if(!existingDiary) {
        throw new Error('日记不存在');
    }

    return await Diary.updateDiary(diaryData);
}

/**
 * 删除日记
 * @param diaryId
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.deleteDiary = async (diaryId) => {
    const  existingDiary = await Diary.getDiaryById(diaryId);
    if(!existingDiary) {
        throw new Error('日记不存在');
    }

    return await Diary.deleteDiary(diaryId);
}

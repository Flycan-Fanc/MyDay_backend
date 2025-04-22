/**
 * 日记接口
 * @author: flycan-fanc
 */

const Diary = require('../models/diary');
const diaryService = require('../services/diaryService');

/**
 * 创建日记
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createDiary = async (req, res, next) => {
    try {
        const diary = await diaryService.createDiary(req.body);
        res.status(201).json(diary);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取单个日记
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getDiary = async (req, res, next) => {
    try {
        const dairy = await diaryService.getDiaryById(req.params.id);
        res.status(200).json(dairy);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取日记列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getDiaryList = async (req, res, next) => {
    try {
        const dairyList = await diaryService.getDiaryListByUserId(req.params.userId)
        res.status(200).json(dairyList);
    } catch(err) {
        next(err)
    }
}

/**
 * 修改日记
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateDiary = async (req, res, next) => {
    try {
        const diary = await diaryService.updateDiary(req.body)
        res.status(200).json(diary);
    } catch(err) {
        next(err)
    }
}

/**
 * 删除日记
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteDiary = async (req, res, next) => {
    try {
        const diary = await diaryService.deleteDiary(req.params.diaryId)
        res.status(200).json(diary);
    } catch(err) {
        next(err)
    }
}

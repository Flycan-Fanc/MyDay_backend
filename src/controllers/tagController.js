/**
 * 标签接口
 * @author: flycan-fanc
 */

const tagService = require('../services/tagService');

/**
 * 创建标签
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createTag = async (req, res, next) => {
    try {
        const tag = await tagService.createTag(req.body);
        res.status(201).json(tag);
    } catch(err) {
        next(err)
    }
}

/**
 * 根据标签id获取单个标签
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getTag = async (req, res, next) => {
    try {
        const tag = await tagService.getTagById(req.params.tagId);
        res.status(200).json(tag);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取用户标签列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getTagList = async (req, res, next) => {
    try {
        const tagList = await tagService.getTagListByUserId(req.params.userId)
        res.status(200).json(tagList);
    } catch(err) {
        next(err)
    }
}

/**
 * 修改标签
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateTag = async (req, res, next) => {
    try {
        const tag = await tagService.updateTag(req.body)
        res.status(200).json(tag);
    } catch(err) {
        next(err)
    }
}

/**
 * 删除标签
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteTag = async (req, res, next) => {
    try {
        const tag = await tagService.deleteTag(req.params.tagId)
        res.status(200).json(tag);
    } catch(err) {
        next(err)
    }
}
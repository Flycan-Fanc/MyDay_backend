/**
 * 灵感接口
 * @author: flycan-fanc
 */

const insService = require('../services/insService')

/**
 * 创建灵感
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createIns = async (req, res, next) => {
    try {
        const ins = await insService.createIns(req.body);
        res.status(201).json(ins);
    } catch(err) {
        next(err)
    }
}

/**
 * 根据灵感id获取 单个灵感
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getIns = async (req, res, next) => {
    try {
        const ins = await insService.getInsById(req.params.insId);
        res.status(200).json(ins);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取 用户灵感列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getInsList = async (req, res, next) => {
    try {
        const insList = await insService.getInsListByUserId(req.params.userId)
        res.status(200).json(insList);
    } catch(err) {
        next(err)
    }
}

/**
 * 修改灵感
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateIns = async (req, res, next) => {
    try {
        const ins = await insService.updateIns(req.body)
        res.status(200).json(ins);
    } catch(err) {
        next(err)
    }
}

/**
 * 删除灵感
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteIns = async (req, res, next) => {
    try {
        const ins = await insService.deleteIns(req.params.insId)
        res.status(200).json(ins);
    } catch(err) {
        next(err)
    }
}
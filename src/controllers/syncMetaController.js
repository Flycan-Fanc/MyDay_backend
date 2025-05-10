/**
 * 用户同步元 接口
 * @author: flycan-fanc
 */

const syncMetaService = require('../services/syncMetaService');

/**
 * 添加 用户同步元数据
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.addSyncMeta = async (req, res, next) => {
    try {
        const syncMeta = await syncMetaService.addSyncMeta(req.body)
        res.status(201).json(syncMeta);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取 用户同步元数据
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getSyncMeta = async (req, res, next) => {
    try {
        const syncMeta = await syncMetaService.getSyncMeta(req.params.userId)
        res.status(200).json(syncMeta);
    } catch(err) {
        next(err)
    }
}

/**
 * 更新 用户同步元数据
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateSyncMeta = async (req, res, next) => {
    try {
        const syncMeta = await syncMetaService.updateSyncMeta(req.body)
        res.status(200).json(syncMeta);
    } catch(err) {
        next(err)
    }
}

/**
 * 删除 用户同步元数据
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteSyncMeta = async (req, res, next) => {
    try {
        const syncMeta = await syncMetaService.deleteSyncMeta(req.params.userId)
        res.status(200).json(syncMeta);
    } catch(err) {
        next(err)
    }
}




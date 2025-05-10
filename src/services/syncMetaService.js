/**
 * 用户同步元 业务逻辑
 * @type {{}}
 */

const syncMeta = require('../models/SyncMeta');
const User = require('../models/User');
const Tag = require("../models/Tag");

/**
 * 添加 用户同步元数据
 * @param syncMetaData
 * @returns {Promise<*>}
 */
exports.addSyncMeta = async (syncMetaData) => {
    const existingUser = await User.getUserById(syncMetaData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(syncMetaData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await syncMeta.addSyncMeta(syncMetaData);
}

/**
 * 根据用户id获取用户同步元数据
 * @param userId
 * @returns {Promise<*>}
 */
exports.getSyncMeta = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await syncMeta.getSyncMeta(userId);
}

/**
 * 更新 用户同步元数据
 * @param syncMetaData
 * @returns {Promise<*>}
 */
exports.updateSyncMeta = async (syncMetaData) => {
    const existingUser = await User.getUserById(syncMetaData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(syncMetaData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    const existingSyncMeta = await Tag.getTagById(syncMetaData.userId);
    if(!existingSyncMeta) {
        throw new Error('标签不存在');
    }

    return await syncMeta.updateSyncMeta(syncMetaData);
}

/**
 * 删除 用户同步元数据
 * @param userId
 * @returns {Promise<*>}
 */
exports.deleteSyncMeta = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await syncMeta.deleteSyncMeta(userId);
}

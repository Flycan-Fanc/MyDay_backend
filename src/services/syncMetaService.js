/**
 * 用户同步元 业务逻辑
 * @type {{}}
 */

const { generateHash } = require('../utils/hash');

const syncMeta = require('../models/SyncMeta');
const User = require('../models/User');

/**
 * 添加 用户同步元数据
 * @param userId
 * @returns {Promise<*>}
 */
exports.addSyncMeta = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    let dataHash = generateHash({userId, dataVersion: 1});

    return await syncMeta.addSyncMeta({userId, dataVersion: 1, dataHash});
}

/**
 * 根据用户id获取用户同步元数据
 * @param userId
 * @returns {Promise<*>}
 */
const getSyncMeta = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await syncMeta.getSyncMeta(userId);
}
exports.getSyncMeta = getSyncMeta;

/**
 * 更新 用户同步元数据
 * @param userId
 * @returns {Promise<*>}
 */
exports.updateSyncMeta = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    const existingSyncMeta = await syncMeta.getSyncMeta(userId)
    if(!existingSyncMeta) {
        throw new Error('该用户的同步元数据不存在');
    }

    let dataVersion = existingSyncMeta.dataVersion + 1;
    let dataHash = generateHash({userId, dataVersion});

    return await syncMeta.updateSyncMeta({userId, dataVersion, dataHash});
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

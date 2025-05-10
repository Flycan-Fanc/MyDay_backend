/**
 * 同步元数据 模型
 * @author: flycan-fanc
 */

const pool = require('../config/db');
const {nanoid} = require('nanoid');
require('dotenv').config();

class SyncMeta {
    /**
     * 添加用户同步元数据
     * @param { userId, dataVersion, dataHash }
     * @param dataVersion
     * @param dataHash
     * @returns {Promise<*>}
     */
    static async addSyncMeta({ userId, dataVersion, dataHash }) {
        const [syncMeta] = await pool.execute(
            'INSERT INTO `sync_meta` (`user_id`, `data_version`, `data_hash`) VALUES (?, ?, ?)',
            [userId, dataVersion, dataHash]
        )
        return syncMeta[0]
    }

    /**
     * 根据用户id获取用户同步元数据
     * @param userId
     * @returns {Promise<*>}
     */
    static async getSyncMeta(userId) {
        const [syncMeta] = await pool.execute(
            'SELECT * FROM `sync_meta` WHERE `user_id` = ?',
            [userId]
        )
        return syncMeta[0]
    }

    /**
     * 更新用户同步元数据
     * @param userId
     * @param dataVersion
     * @param dataHash
     * @returns {Promise<*>}
     */
    static async updateSyncMeta({ userId, dataVersion, dataHash }) {
        const [syncMeta] = await pool.execute(
            'UPDATE `sync_meta` SET `data_version` = ?, `data_hash` = ? WHERE `user_id` = ?',
            [dataVersion, dataHash, userId]
        )
        return syncMeta[0]
    }

    /**
     * 删除用户同步元数据
     * @param userId
     * @returns {Promise<*>}
     */
    static async deleteSyncMeta(userId) {
        const [syncMeta] = await pool.execute(
            'DELETE FROM `sync_meta` WHERE `user_id` = ?',
            [userId]
        )
        return syncMeta[0]
    }
}

module.exports = SyncMeta;
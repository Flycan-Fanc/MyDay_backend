/**
 * 标签业务逻辑
 * @type {{}}
 */

const Tag = require('../models/Tag');
const User = require('../models/User');

/**
 * 创建标签
 * @param tagData
 * @returns {Promise<{color, tagId: string, tagName, userId}|*>}
 */
exports.createTag = async (tagData) => {
    const existingUser = await User.getUserById(tagData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(tagData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await Tag.createTag(tagData);
}

/**
 * 根据标签id获取标签
 * @param tagId
 * @returns {Promise<*>}
 */
exports.getTagById = async (tagId) => {
    const tag =  await Tag.getTagById(tagId);
    if(!tag) {
        throw new Error('标签不存在');
    }
    return tag;
}

/**
 * 根据用户id获取标签列表
 * @param userId
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.getTagListByUserId = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    return await Tag.getTagListByUserId(userId);
}

/**
 * 修改标签
 * @param tagData
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.updateTag = async (tagData) => {
    const existingTag = await Tag.getTagById(tagData.tagId);
    if(!existingTag) {
        throw new Error('标签不存在');
    }

    return await Tag.updateTag(tagData);
}

/**
 * 删除标签
 * @param tagId
 * @returns {Promise<OkPacket|ResultSetHeader|ResultSetHeader[]|RowDataPacket[]|RowDataPacket[][]|OkPacket[]|[RowDataPacket[],ResultSetHeader]|*>}
 */
exports.deleteTag = async (tagId) => {
    const existingTag = await Tag.getTagById(tagId);
    if(!existingTag) {
        throw new Error('标签不存在');
    }

    return await Tag.deleteTag(tagId);
}
// services/pictureService.js
const Picture = require('../models/Picture');
const User = require("../models/User");
const Plan = require("../models/Plan");


/**
 * 创建图片记录
 * @param {Object} pictureData - 图片数据
 * @returns {Promise<Object>} 创建的图片记录
 */
exports.createPicture = async (pictureData) => {
    try {
        const existingUser = await User.getUserById(pictureData.userId);
        if(!existingUser) {
            throw new Error('用户不存在');
        }

        const isDelete = await User.isDeleteById(pictureData.userId);
        if(isDelete === 1) throw new Error('用户已注销');

        return await Picture.createPicture(pictureData);
    } catch (error) {
        throw new Error(`创建图片失败: ${error.message}`);
    }
}

/**
 * 根据ID获取图片
 * @param {string} pictureId - 图片ID
 * @returns {Promise<Object>} 图片数据
 */
exports.getPictureById = async (pictureId) => {
    try {
        const picture = await Picture.getPictureById(pictureId);
        if (!picture) {
            throw new Error('图片不存在');
        }
        return picture;
    } catch (error) {
        throw new Error(`获取图片失败: ${error.message}`);
    }
}

/**
 * 根据用户ID获取图片列表
 * @param {string} userId - 用户ID
 * @returns {Promise<Array>} 图片列表
 */
exports.getPictureListByUserId = async (userId) => {
    try {
        const existingUser = await User.getUserById(userId);
        if(!existingUser) {
            throw new Error('用户不存在');
        }

        const isDelete = await User.isDeleteById(userId);
        if(isDelete === 1) throw new Error('用户已注销');

        return await Picture.getPictureListByUserId(userId);
    } catch (error) {
        throw new Error(`获取用户图片列表失败: ${error.message}`);
    }
}

/**
 * 更新图片信息
 * @param {Object} updateData - 更新数据
 * @returns {Promise<Object>} 更新结果
 */
exports.updatePicture =  async (updateData) => {
    try {
        const { pictureId } = updateData;
        if (!pictureId) {
            throw new Error('缺少图片ID');
        }

        const existingPicture = await Plan.getPlanById(pictureId);
        if(!existingPicture) {
            throw new Error('图片不存在');
        }

        return await Picture.updatePicture(updateData);
    } catch (error) {
        throw new Error(`更新图片失败: ${error.message}`);
    }
}

/**
 * 删除图片
 * @param {string} pictureId - 图片ID
 * @returns {Promise<Object>} 删除结果
 */
exports.deletePicture = async (pictureId) => {
    try {
        const existingPicture = await Plan.getPlanById(pictureId);
        if(!existingPicture) {
            throw new Error('图片不存在');
        }
        return await Picture.deletePicture(pictureId);
    } catch (error) {
        throw new Error(`删除图片失败: ${error.message}`);
    }
}
/**
 * 灵感业务逻辑
 * @type {{}}
 */

const Inspiration = require('../models/Inspiration');
const InsTag = require('../models/InsTag');
const Tag = require('../models/Tag');
const User = require('../models/User');

/**
 * 创建灵感
 * @param insData
 * @returns {Promise<{insId: string, insDate, insContent, userId, insTitle}|*>}
 */
exports.createIns = async (insData) => {
    const existingUser = await User.getUserById(insData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(insData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    let result = await Inspiration.createIns(insData);

    // 将 标签-灵感的关联 存入 instag
    await Promise.all(insData.insTags.map(t =>
        InsTag.createInsTag({ insId: insData.insId, tagId: t.tagId }
        )));

    return result;
}

/**
 * 根据灵感id获取灵感
 * @param insId
 * @returns {Promise<{[p: string]: *}>}
 */
async function getInsById(insId)  {
    // 获取没有标签的ins
    const insRaw =  await Inspiration.getInsById(insId);
    if(!insRaw) {
        throw new Error('灵感不存在');
    }
    // 获取该ins的标签的id数组
    const tagId = await InsTag.getInsTagByInsId(insId)
    // 根据标签id数组获取标签
    let tags = await Promise.all(tagId.map(t => Tag.getTagById(t.tagId)));

    // 返回完整ins
    return {...insRaw, insTags: tags};
}
exports.getInsById = getInsById;

/**
 * 根据用户id获取灵感列表
 * @param userId
 * @returns {Promise<Awaited<unknown>[]>}
 */
exports.getInsListByUserId = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    // 获取没有标签的ins列表
    let insRaws =  await Inspiration.getInsListByUserId(userId)

    // 调用获取单个ins的api，获取完整ins数组
    return await Promise.all(insRaws.map(i => getInsById(i.insId)))
}

/**
 * 更新灵感
 * @param insData
 * @returns {Promise<*>}
 */
exports.updateIns = async (insData) => {
    const existingIns = await Inspiration.getInsById(insData.insId);
    if(!existingIns) {
        throw new Error('灵感不存在');
    }

    let result = await Inspiration.updateIns(insData);

    // 删除灵感已有标签
    await InsTag.deleteInsTagByInsId(insData.insId);

    // 重新将 标签-灵感的关联 存入 instag
    await Promise.all(insData.insTags.map(t =>
        InsTag.createInsTag({insId:insData.insId, tagId: t.tagId}
    )));

    // 更新灵感
    return result;
}

/**
 * 删除灵感
 * @param insId
 * @returns {Promise<*>}
 */
exports.deleteIns = async (insId) => {
    const existingIns = await Inspiration.getInsById(insId);
    if(!existingIns) {
        throw new Error('灵感不存在');
    }

    return await Inspiration.deleteIns(insId);
}
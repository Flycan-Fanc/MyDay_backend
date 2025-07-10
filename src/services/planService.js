/**
 * 计划业务逻辑
 * @type {{}}
 */

const Plan = require('../models/Plan');
const PlanTag = require('../models/PlanTag');
const Tag = require('../models/Tag');
const User = require('../models/User');

/**
 * 创建计划
 * @param planData
 * @returns {Promise<{isTop, planContent, planId: string, startTime, endTime, userId, isDone}|*>}
 */
exports.createPlan = async (planData) => {
    const existingUser = await User.getUserById(planData.userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(planData.userId);
    if(isDelete === 1) throw new Error('用户已注销');

    let result = {};
    let existingPlan = await Plan.getPlanById(planData.planId);
    if(existingPlan) {
        console.log('计划已存在,更新计划')
        result = await Plan.updatePlan(planData);
    } else{
        console.log('计划不存在,创建计划')
        result = await Plan.createPlan(planData);
    }

    // 先删掉 planTag，再逐一建立
    await PlanTag.deletePlanTagByPlanId(planData.planId)
    // 将 标签-计划的关联 存入 plantag，或者更新它
    await Promise.all(planData.planTags.map(p => {
        PlanTag.createPlanTag({ planId: planData.planId, tagId: p.tagId })
    }));

    return result;
}

/**
 * 根据计划id获取计划
 * @param planId
 * @returns {Promise<{[p: string]: *}>}
 */
async function getPlanById(planId)  {
    // 获取没有标签的plan
    const planRaw =  await Plan.getPlanById(planId);
    if(!planRaw) {
        throw new Error('计划不存在');
    }
    // 获取该plan的标签的id数组
    const tagId = await PlanTag.getPlanTagByPlanId(planId)
    // 根据标签id数组获取标签
    let tags = await Promise.all(tagId.map(t => Tag.getTagById(t.tagId)));

    // 返回完整plan
    return {...planRaw, planTags: tags};
}
exports.getPlanById = getPlanById;

/**
 * 根据用户id获取计划列表
 * @param userId
 * @returns {Promise<Awaited<unknown>[]>}
 */
exports.getPlanListByUserId = async (userId) => {
    const existingUser = await User.getUserById(userId);
    if(!existingUser) {
        throw new Error('用户不存在');
    }

    const isDelete = await User.isDeleteById(userId);
    if(isDelete === 1) throw new Error('用户已注销');

    // 获取没有标签的plan列表
    let planRaws =  await Plan.getPlanListByUserId(userId)

    // 调用获取单个plan的api，获取完整plan数组
    return await Promise.all(planRaws.map(p => getPlanById(p.planId)))
}

/**
 * 更新计划
 * @param planData
 * @returns {Promise<*>}
 */
exports.updatePlan = async (planData) => {
    const existingPlan = await Plan.getPlanById(planData.planId);
    if(!existingPlan) {
        throw new Error('计划不存在');
    }

    let result = await Plan.updatePlan(planData);

    // 删除计划已有标签
    await PlanTag.deletePlanTagByPlanId(planData.planId);

    // 重新将 标签-计划的关联 存入 plantag
    await Promise.all(planData.planTags.map(t =>
        PlanTag.createPlanTag({planId:planData.planId, tagId: t.tagId}
    )));

    // 更新计划
    return result;
}

/**
 * 删除计划
 * @param planId
 * @returns {Promise<*>}
 */
exports.deletePlan = async (planId) => {
    const existingPlan = await Plan.getPlanById(planId);
    if(!existingPlan) {
        throw new Error('计划不存在');
    }

    return await Plan.deletePlan(planId);
}
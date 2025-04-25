/**
 * 计划接口
 * @author: flycan-fanc
 */

const planService = require('../services/planService')

/**
 * 创建计划
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createPlan = async (req, res, next) => {
    try {
        const plan = await planService.createPlan(req.body);
        res.status(201).json(plan);
    } catch(err) {
        next(err)
    }
}

/**
 * 根据计划id获取 单个计划
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getPlan = async (req, res, next) => {
    try {
        const plan = await planService.getPlanById(req.params.planId);
        res.status(200).json(plan);
    } catch(err) {
        next(err)
    }
}

/**
 * 获取 用户计划列表
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getPlanList = async (req, res, next) => {
    try {
        const planList = await planService.getPlanListByUserId(req.params.userId)
        res.status(200).json(planList);
    } catch(err) {
        next(err)
    }
}

/**
 * 修改计划
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updatePlan = async (req, res, next) => {
    try {
        const plan = await planService.updatePlan(req.body)
        res.status(200).json(plan);
    } catch(err) {
        next(err)
    }
}

/**
 * 删除计划
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deletePlan = async (req, res, next) => {
    try {
        const plan = await planService.deletePlan(req.params.planId)
        res.status(200).json(plan);
    } catch(err) {
        next(err)
    }
}
/**
 * @description 计划路由
 * @author: flycan-fanc
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    createPlan,
    getPlan,
    getPlanList,
    updatePlan,
    deletePlan,
} = require('../controllers/planController');

// 所有操作都需要鉴权
router.post('/create', protect, createPlan);
router.get('/:planId', protect, getPlan);
router.get('/list/:userId', protect, getPlanList);
router.post('/update', protect, updatePlan);
router.delete('/:planId', protect, deletePlan);

module.exports = router;
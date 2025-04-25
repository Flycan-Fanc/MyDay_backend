/**
 * @description 灵感路由
 * @author: flycan-fanc
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    createIns,
    getIns,
    getInsList,
    updateIns,
    deleteIns,
} = require('../controllers/insController');

// 所有操作都需要鉴权
router.post('/create', protect, createIns);
router.get('/:insId', protect, getIns);
router.get('/list/:userId', protect, getInsList);
router.post('/update', protect, updateIns);
router.delete('/:insId', protect, deleteIns);

module.exports = router;
/**
 * @description 日记路由
 * @author: flycan-fanc
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    createDiary,
    getDiary,
    getDiaryList,
    updateDiary,
    deleteDiary
} = require('../controllers/diaryController');

// 所有操作都需要鉴权
router.post('/create', protect, createDiary);
router.get('/:diaryId', protect, getDiary);
router.get('/list/:userId', protect, getDiaryList);
router.post('/update', protect, updateDiary);
router.delete('/:diaryId', protect, deleteDiary);

module.exports = router
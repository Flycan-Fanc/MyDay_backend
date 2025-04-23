const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    createTag,
    getTag,
    getTagList,
    updateTag,
    deleteTag
} = require('../controllers/tagController');

// 所有操作都需要鉴权
router.post('/create', protect, createTag);
router.get('/:tagId', protect, getTag);
router.get('/list/:userId', protect, getTagList);
router.post('/update', protect, updateTag);
router.delete('/:tagId', protect, deleteTag);

module.exports = router
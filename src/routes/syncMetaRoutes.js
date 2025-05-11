/**
 * @description 同步元数据路由
 * @author: flycan-fanc
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    addSyncMeta,
    getSyncMeta,
    updateSyncMeta,
    deleteSyncMeta,
} = require('../controllers/syncMetaController');

router.post('/add/:userId', protect, addSyncMeta);
router.get('/:userId', protect, getSyncMeta);
router.post('/update/:userId', protect, updateSyncMeta);
router.delete('/:userId', protect, deleteSyncMeta);

module.exports = router
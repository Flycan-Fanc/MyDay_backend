// routes/pictureRoutes.js
const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/pictureController');
const uploadMiddleware = require('../utils/upload');
const { protect } = require('../middlewares/auth');

// 上传图片
router.post('/upload', protect, uploadMiddleware.array('file'),PictureController.uploadPicture);

// 获取图片
router.get('/:pictureId', protect, PictureController.getPicture);

// 获取用户图片列表
router.get('/list/:userId', protect, PictureController.getUserPictureList);

// 删除图片
router.delete('/:pictureId', protect, PictureController.deletePicture);

module.exports = router;
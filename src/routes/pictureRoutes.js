// routes/pictureRoutes.js
const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/pictureController');
const uploadMiddleware = require('../utils/upload');
const { protect, protectPicture } = require('../middlewares/auth');

// 上传图片
router.post('/upload', protect, uploadMiddleware.array('files'),PictureController.uploadPicture);
// router.post('/upload', protect, uploadMiddleware.array('files'),(req, res) => {
//     console.log('收到文件：', req.files); // 确认文件是否到达
//     console.log('params', JSON.stringify(req.body)); // 确认参数是否到达
//     console.log('params', JSON.stringify(req.params)); // 确认参数是否到达
//     res.json({ test: 'OK' }); // 直接返回简单响应
// });

// 获取图片
router.get('/:pictureId', protectPicture, PictureController.getPicture);

// 获取用户图片列表
router.get('/list/:userId', protect, PictureController.getUserPictureList);

// 删除图片
router.delete('/:pictureId', protect, PictureController.deletePicture);

module.exports = router;
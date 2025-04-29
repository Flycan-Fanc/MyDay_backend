// utils/upload.js
const multer = require('multer');

// 配置multer使用内存存储
const storage = multer.memoryStorage();

// 文件过滤
const fileFilter = (req, file, cb) => {
    // 只接受图片文件
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('只能上传图片文件'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 限制文件大小为10MB
    }
});

module.exports = upload;
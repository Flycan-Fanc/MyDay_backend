// controllers/pictureController.js
const PictureService = require('../services/pictureService');

/**
 * 上传图片
 */
exports.uploadPicture = async (req, res) => {
    try {
        const { userId, diaryId = null, insId = null, isAvatar = 0, isCover = 0, fileScale } = req.body;
        const files = req.files || [];

        if (!files.length) {
            return res.status(400).json({ error: '没有上传文件' });
        }

        const results = await Promise.all(files.map(file => {
            return PictureService.createPicture({
                userId,
                diaryId,
                insId,
                pictureName: file.originalname,
                pictureData: file.buffer, // 使用buffer存储图片数据
                isAvatar: isAvatar || false,
                isCover: isCover || false,
                fileScale: fileScale || 1.0,
            });
        }));

        // 添加图片url
        const picturesWithUrl = results.map(result => ({
            pictureId: result.pictureId,
            userId: result.userId,
            diaryId: result.diaryId,
            insId: result.insId,
            pictureName: result.pictureName,
            isAvatar: result.isAvatar,
            isCover: result.isCover,
            url: `${req.protocol}://${req.get('host')}/api/picture/${result.pictureId}`
        }));

        res.status(201).json({
            message: '图片上传成功',
            data: picturesWithUrl,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * 获取图片
 */
exports.getPicture = async (req, res) => {
    try {
        const { pictureId } = req.params;
        const picture = await PictureService.getPictureById(pictureId);

        // 设置正确的Content-Type
        res.set('Content-Type', 'image/jpeg'); // 根据实际情况调整
        res.send(picture.pictureData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * 获取用户图片列表
 */
exports.getUserPictureList = async (req, res) => {
    try {
        const { userId } = req.params;
        const pictures = await PictureService.getPictureListByUserId(userId);

        // 不返回图片数据本身，只返回元数据
        const pictureList = pictures.map(pic => ({
            pictureId: pic.pictureId,
            userId: pic.userId,
            diaryId: pic.diaryId,
            insId: pic.insId,
            pictureName: pic.pictureName,
            isAvatar: pic.isAvatar,
            isCover: pic.isCover,
        }));

        res.json({ data: pictureList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * 删除图片
 */
exports.deletePicture = async (req, res) => {
    try {
        const { pictureId } = req.params;
        await PictureService.deletePicture(pictureId);
        res.json({ message: '图片删除成功' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

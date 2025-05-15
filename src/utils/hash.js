const createHash = require('crypto').createHash;

/**
 * 生成数据哈希值
 * @param data
 */
const generateHash = (data) => {
    return createHash('sha256')
        .update(JSON.stringify(data))
        .digest('hex');
}

module.exports = { generateHash };
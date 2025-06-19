/**
 * 错误处理中间件
 */

exports.errHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
}
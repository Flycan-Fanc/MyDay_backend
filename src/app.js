require('dotenv').config();
const express = require('express');
const cors = require('cors'); //处理跨域请求中间件
const morgan = require('morgan'); //HTTP 请求日志记录器
const errHandler = require('./middlewares/errHandler');
const pool = require('./config/db'); // 初始化连接

// 打印未处理的错误
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

const app = express();

// 在所有中间件前添加
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 路由
app.use('/api/user', require('./routes/userRoutes'));

// 错误处理
app.use(errHandler.errHandler);

// 用于服务器连接性测试
app.get('/', (req, res) => {
    console.log('Test route hit'); // 确认请求到达服务器
    res.json({ status: 'Server is working' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器已启动，端口为：${PORT}`);
});
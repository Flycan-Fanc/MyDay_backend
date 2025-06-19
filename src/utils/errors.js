/**
 * 统一错误类型
 */

// 自定义业务错误基类
class AppError extends Error {
    constructor(message, statusCode, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType || 'OPERATIONAL_ERROR';
    }
}

// 具体错误类型
class NotFoundError extends AppError {
    constructor(message = '资源不存在') {
        super(message, 404, 'NOT_FOUND');
    }
}

class AuthError extends AppError {
    constructor(message = '认证失败') {
        super(message, 401, 'AUTHENTICATION_FAILED');
    }
}

module.exports = { AppError, NotFoundError, AuthError };
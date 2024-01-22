"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res) => {
    if (error) {
        console.log(error);
        res.json({
            error,
        });
    }
};
exports.errorMiddleware = errorMiddleware;

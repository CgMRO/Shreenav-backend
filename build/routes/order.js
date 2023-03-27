"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../controller/order");
const orderRoutes = (fastify, options, done) => {
    fastify.post("/order/create", order_1.createOrder);
    fastify.delete("/order/delete/:id", order_1.deleteOrder);
    fastify.get("/order/all", order_1.getAllOrder);
    fastify.get("/order/get/:id", order_1.getOrder);
    done();
};
exports.orderRoutes = orderRoutes;

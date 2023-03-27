import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
} from "../controller/order";

export const orderRoutes = (fastify: any, options: any, done: any) => {
  fastify.post("/order/create", createOrder);
  fastify.delete("/order/delete/:id", deleteOrder);
  fastify.get("/order/all", getAllOrder);
  fastify.get("/order/get/:id", getOrder);
  done();
};

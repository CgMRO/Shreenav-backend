import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from "../controller/item";

export const itemRoutes = (fastify: any, options: any, done: any) => {
  fastify.post("/item/create", createItem);
  fastify.get("/item/get/:id", getItem);
  fastify.get("/item/all", getAllItems);
  fastify.put("/item/edit/:id", editItem);
  fastify.delete("/item/delete/:id", deleteItem);
  done();
};

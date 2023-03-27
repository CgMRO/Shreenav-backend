"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoutes = void 0;
const item_1 = require("../controller/item");
const itemRoutes = (fastify, options, done) => {
    fastify.post("/item/create", item_1.createItem);
    fastify.get("/item/get/:id", item_1.getItem);
    fastify.get("/item/all", item_1.getAllItems);
    fastify.put("/item/edit/:id", item_1.editItem);
    fastify.delete("/item/delete/:id", item_1.deleteItem);
    done();
};
exports.itemRoutes = itemRoutes;

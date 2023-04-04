"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assemblyRoutes = void 0;
const assembly_1 = require("../controller/assembly");
const assemblyRoutes = (fastify, options, done) => {
    fastify.get("/assembly/all", assembly_1.getAllAssemblies);
    fastify.get("/assembly/get/:id", assembly_1.getAssembly);
    fastify.post("/assembly/create", assembly_1.createAssembly);
    fastify.delete("/assembly/delete/:id", assembly_1.deleteAssembly);
    fastify.put("/assembly/edit/:id", assembly_1.editAssembly);
    done();
};
exports.assemblyRoutes = assemblyRoutes;

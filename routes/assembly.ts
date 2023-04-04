import {
  createAssembly,
  deleteAssembly,
  editAssembly,
  getAllAssemblies,
  getAssembly,
} from "../controller/assembly";

export const assemblyRoutes = (fastify: any, options: any, done: any) => {
  fastify.get("/assembly/all", getAllAssemblies);
  fastify.get("/assembly/get/:id", getAssembly);
  fastify.post("/assembly/create", createAssembly);
  fastify.delete("/assembly/delete/:id", deleteAssembly);
  fastify.put("/assembly/edit/:id", editAssembly);
  done();
};

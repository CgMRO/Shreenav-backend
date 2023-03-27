import {
  createVendor,
  deleteVendor,
  editVendor,
  getAllVendors,
  getVendor,
} from "../controller/vendor";

export const vendorRoutes = (fastify: any, options: any, done: any) => {
  fastify.post("/vendor/create", createVendor);
  fastify.delete("/vendor/delete/:id", deleteVendor);
  fastify.get("/vendor/all", getAllVendors);
  fastify.get("/vendor/get/:id", getVendor);
  fastify.put("/vendor/edit/:id", editVendor);
  done();
};

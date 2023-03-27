import {
  createLocation,
  deleteLocation,
  editLocation,
  getAllLocations,
  getLocation,
} from "../controller/location";

export const locationRoutes = (fastify: any, options: any, done: any) => {
  fastify.post("/location/create", createLocation);
  fastify.delete("/location/delete/:id", deleteLocation);
  fastify.get("/location/all", getAllLocations);
  fastify.get("/location/get/:id", getLocation);
  fastify.put("/location/edit/:id", editLocation);
  done();
};

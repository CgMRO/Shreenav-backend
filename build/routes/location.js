"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoutes = void 0;
const location_1 = require("../controller/location");
const locationRoutes = (fastify, options, done) => {
    fastify.post("/location/create", location_1.createLocation);
    fastify.delete("/location/delete/:id", location_1.deleteLocation);
    fastify.get("/location/all", location_1.getAllLocations);
    fastify.get("/location/get/:id", location_1.getLocation);
    fastify.put("/location/edit/:id", location_1.editLocation);
    done();
};
exports.locationRoutes = locationRoutes;

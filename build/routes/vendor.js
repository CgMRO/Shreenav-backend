"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoutes = void 0;
const vendor_1 = require("../controller/vendor");
const vendorRoutes = (fastify, options, done) => {
    fastify.post("/vendor/create", vendor_1.createVendor);
    fastify.delete("/vendor/delete/:id", vendor_1.deleteVendor);
    fastify.get("/vendor/all", vendor_1.getAllVendors);
    fastify.get("/vendor/get/:id", vendor_1.getVendor);
    fastify.put("/vendor/edit/:id", vendor_1.editVendor);
    done();
};
exports.vendorRoutes = vendorRoutes;

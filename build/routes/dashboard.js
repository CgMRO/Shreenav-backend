"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const dashboard_1 = require("../controller/dashboard");
const dashboardRoutes = (fastify, options, done) => {
    fastify.get("/dashboard/getTotal", dashboard_1.getTotal);
    fastify.get("/dashboard/getByYears", dashboard_1.getByYears);
    fastify.get("/dashboard/getByMonths", dashboard_1.getByMonths);
    done();
};
exports.dashboardRoutes = dashboardRoutes;

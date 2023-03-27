import { getTotal, getByYears, getByMonths } from "../controller/dashboard";

export const dashboardRoutes = (fastify: any, options: any, done: any) => {
  fastify.get("/dashboard/getTotal", getTotal);
  fastify.get("/dashboard/getByYears", getByYears);
  fastify.get("/dashboard/getByMonths", getByMonths);
  done();
};

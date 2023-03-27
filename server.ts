// imports
import fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
// constants
const PORT = process.env.PORT || 4500;
const URI =
  "mongodb+srv://user:user@crm.glryt70.mongodb.net/?retryWrites=true&w=majority";
// routes
import {
  itemRoutes,
  locationRoutes,
  orderRoutes,
  dashboardRoutes,
  vendorRoutes,
} from "./routes";

const app = fastify({ logger: true, bodyLimit: 100 * 1024 * 1024 });
app.register(cors, {
  origin: "*",
});

// routes
app.get("/", (req, reply) => {
  return reply.code(200).send("server up and running");
});

app.register(itemRoutes);
app.register(locationRoutes);
app.register(orderRoutes);
app.register(vendorRoutes);
app.register(dashboardRoutes);

mongoose
  .connect(URI, {
    ignoreUndefined: true,
  })
  .then(async () => {
    console.log("connected to DB successfully");
    try {
      const res = await app.listen({ port: PORT });
      return console.log(`server is running at ${res}`);
    } catch (err) {
      console.log(
        `server couldnt run on ${PORT} due to ${JSON.stringify(err)}`
      );
      process.exit(1);
    }
  })
  .catch((err) =>
    console.log(`err while connecting due to ${JSON.stringify(err)}`)
  );

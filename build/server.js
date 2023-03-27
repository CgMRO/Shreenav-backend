"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const fastify_1 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("@fastify/cors"));
// constants
const PORT = 4500;
const URI = "mongodb+srv://user:user@crm.glryt70.mongodb.net/?retryWrites=true&w=majority";
// routes
const routes_1 = require("./routes");
const app = (0, fastify_1.default)({ logger: true, bodyLimit: 100 * 1024 * 1024 });
app.register(cors_1.default, {
    origin: "*",
});
// routes
app.get("/", (req, reply) => {
    return reply.code(200).send("server up and running");
});
app.register(routes_1.itemRoutes);
app.register(routes_1.locationRoutes);
app.register(routes_1.orderRoutes);
app.register(routes_1.vendorRoutes);
app.register(routes_1.dashboardRoutes);
mongoose_1.default
    .connect(URI, {
    ignoreUndefined: true,
})
    .then(async () => {
    console.log("connected to DB successfully");
    try {
        const res = await app.listen({ port: PORT });
        return console.log(`server is running at ${res}`);
    }
    catch (err) {
        console.log(`server couldnt run on ${PORT} due to ${JSON.stringify(err)}`);
        process.exit(1);
    }
})
    .catch((err) => console.log(`err while connecting due to ${JSON.stringify(err)}`));

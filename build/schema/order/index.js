"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vendor: {
        ref: "Vendor",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    assembly: {
        ref: "Assembly",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    issuedBy: {
        type: String,
        required: true,
    },
    item: {
        ref: "Item",
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, { timestamps: true });
const OrderSchema = (0, mongoose_1.model)("Order", orderSchema);
exports.OrderSchema = OrderSchema;

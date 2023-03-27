"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsSchema = void 0;
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    SAPCode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    minQuantity: {
        type: Number,
        required: true,
    },
    vendor: {
        ref: "vendor",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    location: {
        ref: "Location",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const ItemsSchema = (0, mongoose_1.model)("Item", itemSchema);
exports.ItemsSchema = ItemsSchema;

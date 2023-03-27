"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorSchema = void 0;
const mongoose_1 = require("mongoose");
const vendorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const VendorSchema = (0, mongoose_1.model)("Vendor", vendorSchema);
exports.VendorSchema = VendorSchema;

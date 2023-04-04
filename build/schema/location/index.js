"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSchema = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const LocationSchema = (0, mongoose_1.model)("Location", locationSchema);
exports.LocationSchema = LocationSchema;

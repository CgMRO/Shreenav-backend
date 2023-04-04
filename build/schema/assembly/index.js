"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblyScehema = void 0;
const mongoose_1 = require("mongoose");
const assemblySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const AssemblyScehema = (0, mongoose_1.model)("Assembly", assemblySchema);
exports.AssemblyScehema = AssemblyScehema;

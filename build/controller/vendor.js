"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editVendor = exports.getAllVendors = exports.deleteVendor = exports.getVendor = exports.createVendor = void 0;
const Error_1 = require("./../utils/Error");
const schema_1 = require("../schema");
const createVendor = async (req, res) => {
    try {
        const newVendor = new schema_1.VendorSchema(req.body);
        const saveVendor = await newVendor.save();
        if (saveVendor) {
            res.code(201).send({
                isError: true,
                message: "Vendor created successfully",
                data: saveVendor,
            });
        }
        else {
            res.code(400).send({
                isError: true,
                message: `Failed to create vendor`,
                data: null,
            });
        }
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.createVendor = createVendor;
const getVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.VendorSchema.findById(id);
        if (item) {
            res.code(200).send({
                isError: false,
                message: "Vendor fetched successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "No vendor found",
                data: null,
            });
        }
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.getVendor = getVendor;
const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.VendorSchema.findById(id);
        if (item) {
            item.deleteOne();
            res.code(200).send({
                isError: false,
                message: "Vendor deleted successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "Failed to find vendor with such id",
                data: null,
            });
        }
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.deleteVendor = deleteVendor;
const getAllVendors = async (req, res) => {
    try {
        const items = await schema_1.VendorSchema.find();
        if (items.length === 0) {
            res.code(204).send({
                isError: true,
                message: "No vendors found",
                data: [],
            });
        }
        else {
            res.code(200).send({
                isError: false,
                message: "Items fetched successfully",
                data: items,
            });
        }
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.getAllVendors = getAllVendors;
const editVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.VendorSchema.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (item) {
            res.code(200).send({
                isError: false,
                message: "vendor updated successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "vendor with id not found",
                data: null,
            });
        }
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.editVendor = editVendor;

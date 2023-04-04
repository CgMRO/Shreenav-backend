"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAssembly = exports.deleteAssembly = exports.createAssembly = exports.getAssembly = exports.getAllAssemblies = void 0;
const Error_1 = require("./../utils/Error");
const schema_1 = require("../schema");
const getAllAssemblies = async (req, res) => {
    try {
        const items = await schema_1.AssemblyScehema.find();
        if (items.length === 0) {
            res.code(200).send({
                isError: true,
                message: "No Assemblies found",
                data: [],
            });
        }
        else {
            res.code(200).send({
                isError: false,
                message: "Assemblies fetched successfully",
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
exports.getAllAssemblies = getAllAssemblies;
const getAssembly = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.AssemblyScehema.findById(id);
        if (item) {
            res.code(200).send({
                isError: false,
                message: "Assembly fetched successfully",
                data: item,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "No Assembly found",
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
exports.getAssembly = getAssembly;
const createAssembly = async (req, res) => {
    try {
        const { name } = req.body;
        const findIfNameExists = await schema_1.AssemblyScehema.findOne({ name });
        if (findIfNameExists) {
            res.code(200).send({
                isError: true,
                message: "Assembly exists.Please create other assembly",
            });
        }
        else {
            const newItem = new schema_1.AssemblyScehema(req.body);
            const saveNewItem = await newItem.save();
            if (saveNewItem) {
                res.code(201).send({
                    isError: true,
                    message: "Assembly created successfully",
                    data: saveNewItem,
                });
            }
            else {
                res.code(400).send({
                    isError: true,
                    message: `Failed to create assembly`,
                    data: null,
                });
            }
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
exports.createAssembly = createAssembly;
const deleteAssembly = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.AssemblyScehema.findById(id);
        if (item) {
            item.deleteOne();
            res.code(200).send({
                isError: false,
                message: "Assembly deleted successfully",
                data: item,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "Failed to find Assembly with such id",
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
exports.deleteAssembly = deleteAssembly;
const editAssembly = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.AssemblyScehema.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (item) {
            res.code(200).send({
                isError: false,
                message: "Assembly updated successfully",
                data: item,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "Assembly with id not found",
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
exports.editAssembly = editAssembly;

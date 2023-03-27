"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editItem = exports.deleteItem = exports.createItem = exports.getItem = exports.getAllItems = void 0;
const Error_1 = require("./../utils/Error");
const schema_1 = require("../schema");
const getAllItems = async (req, res) => {
    const { category } = req.query;
    try {
        const items = await schema_1.ItemsSchema.find({
            category: (category === "" || category === "All") && undefined,
        });
        if (items.length === 0) {
            res.code(204).send({
                isError: true,
                message: "No Items found",
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
exports.getAllItems = getAllItems;
const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.ItemsSchema.findById(id);
        if (item) {
            res.code(200).send({
                isError: false,
                message: "Item fetched successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "No item found",
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
exports.getItem = getItem;
const createItem = async (req, res) => {
    try {
        const newItem = new schema_1.ItemsSchema(req.body);
        const saveNewItem = await newItem.save();
        if (saveNewItem) {
            res.code(201).send({
                isError: true,
                message: "Item created successfully",
                data: saveNewItem,
            });
        }
        else {
            res.code(400).send({
                isError: true,
                message: `Failed to create item`,
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
exports.createItem = createItem;
const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.ItemsSchema.findById(id);
        if (item) {
            item.deleteOne();
            res.code(200).send({
                isError: false,
                message: "Item deleted successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "Failed to find item with such id",
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
exports.deleteItem = deleteItem;
const editItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.ItemsSchema.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (item) {
            res.code(200).send({
                isError: false,
                message: "item updated successfully",
                data: item,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "item with id not found",
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
exports.editItem = editItem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getAllOrder = exports.getOrder = exports.createOrder = void 0;
const Error_1 = require("./../utils/Error");
const schema_1 = require("../schema");
const createOrder = async (req, res) => {
    try {
        const body = req.body;
        const item = body.item;
        const findItem = await schema_1.ItemsSchema.findByIdAndUpdate(item, { $inc: { quantity: -body.quantity } }, { new: true });
        if (findItem) {
            const newOrder = new schema_1.OrderSchema(body);
            const saveOrder = await newOrder.save();
            if (saveOrder) {
                res.code(201).send({
                    isError: true,
                    message: "Order created successfully",
                    data: saveOrder,
                });
            }
            else {
                res.code(400).send({
                    isError: true,
                    message: `Failed to create Order`,
                    data: null,
                });
            }
        }
        else {
            res.code(400).send({
                isError: true,
                message: `Failed to find item`,
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
exports.createOrder = createOrder;
const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await schema_1.OrderSchema.findById(id);
        if (order) {
            res.code(200).send({
                isError: false,
                message: "Order fetched successfully",
                data: order,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "No Order found",
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
exports.getOrder = getOrder;
const getAllOrder = async (req, res) => {
    try {
        const orders = await schema_1.OrderSchema.find();
        if (orders.length === 0) {
            res.code(204).send({
                isError: true,
                message: "No orders found",
                data: [],
            });
        }
        else {
            res.code(200).send({
                isError: false,
                message: "orders fetched successfully",
                data: orders,
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
exports.getAllOrder = getAllOrder;
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await schema_1.OrderSchema.findById(id);
        if (order) {
            order.deleteOne();
            res.code(200).send({
                isError: false,
                message: "order deleted successfully",
                data: order,
            });
        }
        else {
            res.code(204).send({
                isError: true,
                message: "Failed to find order with such id",
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
exports.deleteOrder = deleteOrder;

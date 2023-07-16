"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByMonths = exports.getByYears = exports.getTotal = void 0;
const schema_1 = require("../schema");
const FormatMonths_1 = require("../utils/FormatMonths");
const Error_1 = require("./../utils/Error");
const getTotal = async (req, res) => {
    try {
        const totalItems = await schema_1.ItemsSchema.count();
        const totalOrders = await schema_1.OrderSchema.count();
        const totalLocations = await schema_1.LocationSchema.count();
        const totalMinQty = await schema_1.ItemsSchema.find({
            $expr: {
                $lte: [{ $toInt: "$quantity" }, { $toInt: "$minQuantity" }],
            },
        }).count();
        const totalVendors = await schema_1.VendorSchema.count();
        const totalCostSample = await schema_1.OrderSchema.aggregate([
            {
                $group: {
                    _id: null,
                    cost: {
                        $sum: "$cost",
                    },
                },
            },
        ]);
        res.code(200).send({
            isError: true,
            message: "Analytics fetched successfully",
            data: {
                totalItems,
                totalOrders,
                totalLocations,
                totalVendors,
                totalCost: totalCostSample[0].cost,
                totalMinQty,
            },
        });
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.getTotal = getTotal;
const getByYears = async (req, res) => {
    try {
        const totalNewOrders = await schema_1.OrderSchema.aggregate([
            {
                $group: {
                    _id: {
                        createdAt: { $year: { $toDate: "$createdAt" } },
                    },
                    data: {
                        $sum: 1,
                    },
                },
            },
        ]);
        const totalNewItems = await schema_1.ItemsSchema.aggregate([
            {
                $group: {
                    _id: {
                        createdAt: { $year: { $toDate: "$createdAt" } },
                    },
                    data: {
                        $sum: 1,
                    },
                },
            },
        ]);
        res.code(200).send({
            isError: true,
            message: "Analytics fetched successfully",
            data: {
                totalNewOrders,
                totalNewItems,
            },
        });
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.getByYears = getByYears;
const getByMonths = async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-01-01`);
        const nextYear = new Date(`${year}-12-31`);
        const order = await schema_1.OrderSchema.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: thisYear,
                        $lt: nextYear,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    data: { $sum: 1 },
                },
            },
        ]);
        const items = await schema_1.ItemsSchema.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: thisYear,
                        $lt: nextYear,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    data: { $sum: 1 },
                },
            },
        ]);
        res.code(200).send({
            isError: true,
            message: "Analytics fetched successfully",
            data: {
                order: (0, FormatMonths_1.formatDataByMonths)(order),
                items: (0, FormatMonths_1.formatDataByMonths)(items),
            },
        });
    }
    catch (error) {
        res.code(500).send({
            isError: true,
            message: (0, Error_1.getErrorMessage)(error),
            data: null,
        });
    }
};
exports.getByMonths = getByMonths;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = exports.createLocation = exports.deleteLocation = exports.editLocation = exports.getAllLocations = void 0;
const UploadImage_1 = require("./../utils/UploadImage");
const Error_1 = require("./../utils/Error");
const schema_1 = require("../schema");
const editLocation = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await (0, UploadImage_1.uploadImage)(req.body.location);
        const item = await schema_1.LocationSchema.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { image }), {
            new: true,
        });
        if (item) {
            res.code(200).send({
                isError: false,
                message: "location updated successfully",
                data: item,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "location with id not found",
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
exports.editLocation = editLocation;
const deleteLocation = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await schema_1.LocationSchema.findById(id);
        if (item) {
            item.deleteOne();
            res.code(200).send({
                isError: false,
                message: "Location deleted successfully",
                data: item,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "Failed to find location with such id",
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
exports.deleteLocation = deleteLocation;
const getLocation = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await schema_1.LocationSchema.findById(id);
        if (location) {
            res.code(200).send({
                isError: false,
                message: "location fetched successfully",
                data: location,
            });
        }
        else {
            res.code(200).send({
                isError: true,
                message: "No location found",
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
exports.getLocation = getLocation;
const getAllLocations = async (req, res) => {
    try {
        const locations = await schema_1.LocationSchema.find();
        if (locations.length === 0) {
            res.code(200).send({
                isError: true,
                message: "No locations found",
                data: [],
            });
        }
        else {
            res.code(200).send({
                isError: false,
                message: "locations fetched successfully",
                data: locations,
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
exports.getAllLocations = getAllLocations;
const createLocation = async (req, res) => {
    try {
        const image = await (0, UploadImage_1.uploadImage)(req.body.image);
        const newLocation = new schema_1.LocationSchema(Object.assign(Object.assign({}, req.body), { image }));
        const saveLocation = await newLocation.save();
        if (saveLocation) {
            res.code(201).send({
                isError: true,
                message: "Location created successfully",
                data: saveLocation,
            });
        }
        else {
            res.code(400).send({
                isError: true,
                message: `Failed to create Location`,
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
exports.createLocation = createLocation;

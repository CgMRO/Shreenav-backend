import { getErrorMessage } from "./../utils/Error";
import { VendorSchema } from "../schema";

const createVendor = async (req: any, res: any) => {
  try {
    const newVendor = new VendorSchema(req.body);
    const saveVendor = await newVendor.save();
    if (saveVendor) {
      res.code(201).send({
        isError: true,
        message: "Vendor created successfully",
        data: saveVendor,
      });
    } else {
      res.code(400).send({
        isError: true,
        message: `Failed to create vendor`,
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getVendor = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await VendorSchema.findById(id);
    if (item) {
      res.code(200).send({
        isError: false,
        message: "Vendor fetched successfully",
        data: item,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "No vendor found",
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const deleteVendor = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await VendorSchema.findById(id);
    if (item) {
      item.deleteOne();
      res.code(200).send({
        isError: false,
        message: "Vendor deleted successfully",
        data: item,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "Failed to find vendor with such id",
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getAllVendors = async (req: any, res: any) => {
  try {
    const items = await VendorSchema.find();
    if (items.length === 0) {
      res.code(204).send({
        isError: true,
        message: "No vendors found",
        data: [],
      });
    } else {
      res.code(200).send({
        isError: false,
        message: "Items fetched successfully",
        data: items,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const editVendor = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await VendorSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (item) {
      res.code(200).send({
        isError: false,
        message: "vendor updated successfully",
        data: item,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "vendor with id not found",
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

export { createVendor, getVendor, deleteVendor, getAllVendors, editVendor };

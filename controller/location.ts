import { uploadImage } from "./../utils/UploadImage";
import { getErrorMessage } from "./../utils/Error";
import { LocationSchema } from "../schema";

const editLocation = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const image = await uploadImage(req.body.location);
    const item = await LocationSchema.findByIdAndUpdate(
      id,
      { ...req.body, image },
      {
        new: true,
      }
    );
    if (item) {
      res.code(200).send({
        isError: false,
        message: "location updated successfully",
        data: item,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "location with id not found",
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

const deleteLocation = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await LocationSchema.findById(id);
    if (item) {
      item.deleteOne();
      res.code(200).send({
        isError: false,
        message: "Location deleted successfully",
        data: item,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "Failed to find location with such id",
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

const getLocation = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const location = await LocationSchema.findById(id);
    if (location) {
      res.code(200).send({
        isError: false,
        message: "location fetched successfully",
        data: location,
      });
    } else {
      res.code(204).send({
        isError: true,
        message: "No location found",
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

const getAllLocations = async (req: any, res: any) => {
  try {
    const locations = await LocationSchema.find();
    if (locations.length === 0) {
      res.code(204).send({
        isError: true,
        message: "No locations found",
        data: [],
      });
    } else {
      res.code(200).send({
        isError: false,
        message: "locations fetched successfully",
        data: locations,
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

const createLocation = async (req: any, res: any) => {
  try {
    const image = await uploadImage(req.body.location);
    const newLocation = new LocationSchema({ ...req.body, image });
    const saveLocation = await newLocation.save();
    if (saveLocation) {
      res.code(201).send({
        isError: true,
        message: "Location created successfully",
        data: saveLocation,
      });
    } else {
      res.code(400).send({
        isError: true,
        message: `Failed to create Location`,
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

export {
  getAllLocations,
  editLocation,
  deleteLocation,
  createLocation,
  getLocation,
};
